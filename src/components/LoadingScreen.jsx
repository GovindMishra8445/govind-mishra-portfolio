// // components/LoadingScreen.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Logo from '../assets/images/mainLogo.png'; // Update to your logo file
// import backgroundVideo from '../assets/loadingBackgroundVideo.mp4'; // Update to your background video file

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { 
//     opacity: 1,
//     transition: { duration: 1 }
//   },
//   exit: { opacity: 0, transition: { duration: 1 } }
// };

// const LoadingScreen = ({ onComplete }) => {  // onComplete callback to signal finish
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 5);

//     return () => clearInterval(interval);
//   }, []);

//   // Trigger onComplete when progress reaches 100
//   useEffect(() => {
//     if (progress === 100 && onComplete) {
//       setTimeout(onComplete, 1000);
//     }
//   }, [progress, onComplete]);

//   const radius = 40;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;

//   return (
//     <motion.div
//       className="fixed inset-0 flex items-center justify-center z-50"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//     >
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src={backgroundVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       <div className="relative z-10 flex flex-col items-center justify-center">
//         <div className="relative w-48 h-48">
//           {/* Rotating Lines */}
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//               <motion.div
//                 initial={{ rotate: (i - 1) * 120 }}
//                 animate={{ rotate: (i - 1) * 120 + 360 }}
//                 transition={{ repeat: Infinity, duration: i + 1, ease: 'linear' }}
//                 className="origin-bottom-center"
//               >
//                 <div className="w-1 h-12 bg-white/80 rounded-full" />
//               </motion.div>
//             </div>
//           ))}

//           {/* Centered Logo */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <img 
//               src={Logo} 
//               alt="Logo" 
//               className="w-32 h-32 object-contain rounded-full" 
//             />
//           </div>

//           {/* Progress Circle */}
//           <svg 
//             className="absolute inset-0"
//             viewBox="0 0 100 100"
//           >
//             <circle
//               cx="50"
//               cy="50"
//               r={radius}
//               stroke="blue"
//               strokeWidth="4"
//               fill="transparent"
//               strokeDasharray={circumference}
//               strokeDashoffset={strokeDashoffset}
//               transform="rotate(-90 50 50)"
//               style={{ transition: 'stroke-dashoffset 0.05s linear' }}
//             />
//           </svg>
//         </div>

//         {/* Progress Percentage Text Outside the Circle */}
//         <div className="mt-4 text-2xl font-bold text-white">
//           {progress}%
//         </div>

//         <motion.h2
//           className="mt-2 text-2xl font-bold text-white"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 1 }}
//         >
//           {progress === 100 ? "Ready!" : "Loading..."}
//         </motion.h2>
//       </div>
//     </motion.div>
//   );
// };

// export default LoadingScreen;




// components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import Logo from '../../public/assets/images/mainLogo.png'; // Update to your logo file

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1 }
  },
  exit: { opacity: 0, transition: { duration: 1 } }
};

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 5);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100 && onComplete) {
      setTimeout(onComplete, 1000);
    }
  }, [progress, onComplete]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Rotating Lines */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ rotate: (i - 1) * 120 }}
                animate={{ rotate: (i - 1) * 120 + 360 }}
                transition={{ repeat: Infinity, duration: i + 1, ease: 'linear' }}
                className="origin-bottom-center"
              >
                <div className="w-1 h-12 bg-white/80 rounded-full" />
              </motion.div>
            </div>
          ))}

          {/* Centered Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
             src="/mainLogo.png" 
              alt="Logo" 
              className="w-32 h-32 object-contain rounded-full" 
            />
          </div>

          {/* Outer Glowing Ring (Blue) */}
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius + 8} // Slightly larger radius
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="4"
              fill="transparent"
              className="shadow-lg shadow-blue-500/30"
            />
          </svg>

          {/* Progress Ring (Red-Blue Gradient) */}
          <svg className="absolute inset-0" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" /> {/* Red */}
                <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 50 50)"
              className="shadow-lg shadow-red-500/20"
              style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
          </svg>
        </div>

        {/* Progress Percentage Text */}
        <div className="mt-4 text-2xl font-bold text-white">
          {progress}%
        </div>

        <motion.h2
          className="mt-2 text-2xl font-bold text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {progress === 100 ? "Ready!" : "Loading..."}
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;