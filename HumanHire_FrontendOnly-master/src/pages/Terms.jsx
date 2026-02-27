import React, { useEffect } from 'react'
import { useState } from 'react';
import termsService from '../services/termsServices';
import Loader from '../components/UI/Loader';

const Terms = () => {
  const [terms, setTerms] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await termsService.getTerms();
        console.log('response', response)
        if (!response.success ) {
          throw new Error('Failed to fetch terms & conditions');
        }
        setTerms(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  } , []);
  return (
    <div className='bg-black min-h-screen text-white pt-20'>
        {loading ? (
        <Loader />
      ) : (
      <div className="wraper  max-w-7xl mx-auto px-4 py-8">

        <div className='text-3xl mb-10'>{terms.heading}</div>
        <div dangerouslySetInnerHTML={{ __html: terms.content }}></div>
      </div>
      )}
    </div>
  )
}

export default Terms