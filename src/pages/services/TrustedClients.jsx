// import React, { useEffect, useState } from "react";
// import clientService from "../../services/clientsServices";
// import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

// export default function TrustedClients() {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         setLoading(true);
//         const response = await clientService.getClients();
//         if (response.success) {
//           setClients(response.data.slice(0, 6)); // Limit to 6 clients
//         } else {
//           setError("Failed to fetch clients");
//         }
//       } catch (err) {
//         setError(err.message || "Failed to fetch clients");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClients();
//   }, []);
//   return (
//     <section className="bg-black py-16 ">
//       <div className="max-w-7xl mx-auto px-4 text-center mb-4">
//         <h2 className="text-[#959596] text-3xl lg:text-lg font-bold mb-12">
//           We are trusted by thousands of clients
//         </h2>
//         {loading ? (
//           <div className="text-center text-white">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#a64d79]"></div>
//             <p className="mt-4">Loading clients...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-400">
//             <p>Error: {error}</p>
//           </div>
//         ) : clients.length === 0 ? (
//           <div className="text-center text-gray-400">
//             <p>No clients to display at the moment.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-center">
//             {clients.map((client, index) => (
//               <img
//                 key={index}
//                 src={getOptimizedImageUrl(client.logo)}
//                 alt={`Client logo ${index + 1}`}
//                 className="h-16 object-contain filter brightness-50 transition duration-300 ease-in-out hover:brightness-100 hover:scale-110"
//                 loading="lazy"
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }








import React, { useEffect, useState } from "react";
import clientService from "../../services/clientsServices";
import getOptimizedImageUrl from "../../utils/getOptimizedImageUrl ";

export default function TrustedClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await clientService.getClients();
        if (response.success) {
          setClients(response.data.slice(0, 6)); // Limit to 6 clients
        } else {
          setError("Failed to fetch clients");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="bg-black py-16 overflow-hidden">
      {/* Internal CSS for the scrolling animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        /* Optional: Pause animation on hover */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 text-center mb-4">
        <h2 className="text-[#959596] text-3xl lg:text-lg font-bold mb-12">
          We are trusted by thousands of clients
        </h2>

        {loading ? (
          <div className="text-center text-white">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#a64d79]"></div>
            <p className="mt-4">Loading clients...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            <p>Error: {error}</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>No clients to display at the moment.</p>
          </div>
        ) : (
          /* Slider Container */
          <div className="relative w-full overflow-hidden">
            {/* Moving Track: Contains 2 sets of the client list for seamless looping */}
            <div className="flex items-center w-max animate-scroll">
              
              {/* Set 1: Original Data */}
              <div className="flex items-center gap-12 px-6">
                {clients.map((client, index) => (
                  <img
                    key={`original-${index}`}
                    src={getOptimizedImageUrl(client.logo)}
                    alt={`Client logo ${index + 1}`}
                    className="h-16 w-auto object-contain filter brightness-50 transition duration-300 ease-in-out hover:brightness-100 hover:scale-110"
                    loading="lazy"
                  />
                ))}
              </div>

              {/* Set 2: Duplicate Data (Required for infinite cycle effect) */}
              <div className="flex items-center gap-12 px-6">
                {clients.map((client, index) => (
                  <img
                    key={`duplicate-${index}`}
                    src={getOptimizedImageUrl(client.logo)}
                    alt={`Client logo ${index + 1}`}
                    className="h-16 w-auto object-contain filter brightness-50 transition duration-300 ease-in-out hover:brightness-100 hover:scale-110"
                    loading="lazy"
                  />
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}