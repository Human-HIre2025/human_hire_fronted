// scripts/generate-llms-txt.js
// Runs at build time: fetches all published blog posts from the API,
// then writes an updated llms.txt to public/ (which Vite copies into dist/).
// Usage: called automatically via "npm run build" (see package.json).

import fetch from 'node:http2';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../public/llms.txt');
const API_URL = 'https://human-hire-corp-updated.onrender.com/api/carousel/type/event';

const BASE_CONTENT = `# HumanHireCorp

> HumanHireCorp is a global recruitment and HR solutions company headquartered in London, UK, with offices in Delhi and Jaipur (India) and San Francisco, USA. We connect businesses worldwide with exceptional talent across IT, BPO, Engineering, and Customer Support industries. We deliver strategic hiring, HR consulting, and workforce outsourcing solutions that empower organisations to scale globally with confidence.

## Core Services

- [Talent Acquisition](https://humanhirecorp.com/services): End-to-end recruitment support to help businesses hire the right talent faster across global markets.
- [Employer Branding](https://humanhirecorp.com/services): Strategic employer branding solutions to help businesses attract top-tier candidates and build a strong talent reputation.
- [Recruitment Process Outsourcing (RPO)](https://humanhirecorp.com/services): Fully managed recruitment outsourcing designed to reduce hiring costs and improve hiring quality at scale.
- [Workforce Consulting](https://humanhirecorp.com/services): Expert HR and workforce strategy consulting to help businesses build future-ready teams.

## Industries We Serve

- Business Process Outsourcing (BPO)
- Information Technology — IT & Non-IT
- Software Development
- Finance
- Banking
- Business Consulting
- Customer Support

## Key Pages

- [Homepage](https://humanhirecorp.com/): Global recruitment and staffing solutions for businesses worldwide.
- [About Us](https://humanhirecorp.com/about): Learn about HumanHireCorp's mission, values, and global recruitment expertise.
- [Services](https://humanhirecorp.com/services): Explore our complete range of recruitment and HR consulting services.
- [Job Seekers](https://humanhirecorp.com/job-seekers): Career opportunities and job search support for candidates worldwide.
- [Blogs](https://humanhirecorp.com/blogs): Expert recruitment insights, HR guides, and hiring strategies.
- [Contact Us](https://humanhirecorp.com/contact-us): Get in touch with our global recruitment team.

## Office Locations

- **Headquarters**: London, United Kingdom
- **India — Delhi**: 2nd Floor, A12, Mohan Garden, Block D, Bhagwati Garden, Uttam Nagar, New Delhi, Delhi 110059
- **India — Jaipur**: Jaipur, Rajasthan, India
- **US**: 2803 Philadelphia Pike Suite B, Claymont, Delaware 19703

## Contact Information

- **Website**: https://humanhirecorp.com
- **Email**: hr@humanhirecorp.com
- **Phone (UK)**: +44 7400 075848
- **Phone (US)**: +1-302-440-6916
- **Phone (IN)**: +91-87695-21604

## About HumanHireCorp

HumanHireCorp was founded with a mission to redefine global recruitment by combining human expertise with technology-driven hiring processes. Operating across India, the United Kingdom, and the United States, we specialise in connecting businesses with top-tier talent across multiple industries. Our solutions are scalable, flexible, and customised to meet the unique workforce needs of startups, SMEs, and multinational enterprises worldwide.

## Why Choose HumanHireCorp

- Expert team in global recruitment and HR solutions
- Trusted by clients across India, UK, US, and international markets
- Expert in multi-industry hiring: IT, BPO, Engineering, Customer Support
- Scalable and flexible workforce solutions
- Proven success in talent acquisition, RPO, and global placements
- Technology-driven recruitment with AI-enabled assessments and digital onboarding
`;

/**
 * Fetches JSON from a URL using Node's built-in https module.
 */
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 15000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse JSON: ' + e.message));
        }
      });
    }).on('error', reject).on('timeout', () => reject(new Error('Request timed out')));
  });
}

/**
 * Strips HTML tags from a string to get plain text.
 */
function stripHtml(html) {
  return html ? html.replace(/<[^>]+>/g, '').trim() : '';
}

/**
 * Extracts the first heading or first 80 chars as the title.
 */
function extractTitle(htmlText) {
  if (!htmlText) return 'Blog Post';
  const headingMatch = htmlText.match(/<h[1-2][^>]*>([\s\S]*?)<\/h[1-2]>/i);
  if (headingMatch) return stripHtml(headingMatch[1]).substring(0, 100);
  const boldMatch = htmlText.match(/<strong>([\s\S]*?)<\/strong>/i);
  if (boldMatch) return stripHtml(boldMatch[1]).substring(0, 100);
  return stripHtml(htmlText).substring(0, 80);
}

async function main() {
  let blogSection = '\n## Latest Blog Posts\n\n';

  try {
    console.log('📡 Fetching blog posts from API...');
    const json = await fetchJSON(API_URL);
    const blogs = json.data || json || [];

    if (Array.isArray(blogs) && blogs.length > 0) {
      console.log(`✅ Found ${blogs.length} blog posts.`);
      for (const blog of blogs) {
        const title = extractTitle(blog.text);
        const url = `https://humanhirecorp.com/blog/${blog._id}`;
        blogSection += `- [${title}](${url})\n`;
      }
    } else {
      console.log('⚠️  No blog posts found or unexpected API response shape.');
      blogSection += '_No blog posts published yet._\n';
    }
  } catch (err) {
    console.warn(`⚠️  Could not fetch blogs (${err.message}). llms.txt will be generated without dynamic blog list.`);
    blogSection += '_Blog posts could not be fetched at build time. Visit https://humanhirecorp.com/blogs for the latest articles._\n';
  }

  const generated = `<!-- Auto-generated on ${new Date().toISOString()} by scripts/generate-llms-txt.js -->\n` + BASE_CONTENT + blogSection;
  writeFileSync(OUTPUT_PATH, generated, 'utf8');
  console.log(`✅ llms.txt written to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('❌ generate-llms-txt.js failed:', err);
  // Write base content even if everything fails — don't block the build
  writeFileSync(OUTPUT_PATH, BASE_CONTENT, 'utf8');
  process.exit(0); // Don't fail the build
});
