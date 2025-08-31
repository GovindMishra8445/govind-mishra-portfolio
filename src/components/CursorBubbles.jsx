// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const CursorBubbles = () => {
//   const [bubbles, setBubbles] = useState([]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       // Create a new bubble at the current mouse position
//       const newBubble = {
//         id: Date.now() + Math.random(), // unique id
//         x: e.clientX,
//         y: e.clientY,
//       };

//       setBubbles((prev) => [...prev, newBubble]);

//       // Remove the bubble after 0.8 seconds
//       setTimeout(() => {
//         setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
//       }, 800);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <AnimatePresence>
//       {bubbles.map((bubble) => (
//         <motion.div
//           key={bubble.id}
//           className="absolute pointer-events-none bg-blue-500 rounded-full"
//           initial={{ scale: 0.5, opacity: 0.8 }}
//           animate={{ scale: 1.5, opacity: 0 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           style={{ 
//             top: bubble.y - 10, 
//             left: bubble.x - 10, 
//             width: 20, 
//             height: 20 
//           }}
//         />
//       ))}
//     </AnimatePresence>
//   );
// };

// export default CursorBubbles;



import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorBubbles = ({
  // Customizable options with defaults
  colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'],
  minSize = 15,
  maxSize = 25,
  duration = 0.8,
  maxBubbles = 30,
  clickEffect = true,
  throttleMs = 50,
  trail = false,
  trailLength = 5,
  interactiveHover = true
}) => {
  const [bubbles, setBubbles] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const lastBubbleTime = useRef(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const trailInterval = useRef(null);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      if (trailInterval.current) {
        clearInterval(trailInterval.current);
      }
    };
  }, []);

  // Create a new bubble with randomized properties
  const createBubble = useCallback((x, y, isClick = false) => {
    const now = Date.now();
    
    // Throttle bubble creation based on throttleMs
    if (!isClick && now - lastBubbleTime.current < throttleMs) {
      return;
    }
    
    lastBubbleTime.current = now;
    
    // Generate random characteristics for the bubble
    const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
    const colorIndex = Math.floor(Math.random() * colors.length);
    const rotationDeg = Math.random() * 360;
    const durationVariation = duration * (0.8 + Math.random() * 0.4); // +/- 20% variation
    
    const newBubble = {
      id: now + Math.random(),
      x,
      y,
      size,
      color: colors[colorIndex],
      rotation: rotationDeg,
      duration: durationVariation,
      isClick
    };

    // Limit maximum number of bubbles for performance
    setBubbles(prev => {
      const updated = [...prev, newBubble];
      return updated.length > maxBubbles ? updated.slice(-maxBubbles) : updated;
    });

    // Remove the bubble after its animation completes
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, durationVariation * 1000);
  }, [colors, minSize, maxSize, duration, maxBubbles, throttleMs]);

  // Mouse move handler with throttling and state management
  const handleMouseMove = useCallback((e) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
    createBubble(e.clientX, e.clientY);
  }, [createBubble]);

  // Click handler for special effect
  const handleClick = useCallback((e) => {
    if (clickEffect) {
      // Create multiple bubbles in a burst pattern on click
      for (let i = 0; i < 8; i++) {
        // Add slight position variation
        const offsetX = e.clientX + (Math.random() * 20 - 10);
        const offsetY = e.clientY + (Math.random() * 20 - 10);
        
        // Delay each bubble slightly for a nicer effect
        setTimeout(() => {
          createBubble(offsetX, offsetY, true);
        }, i * 30);
      }
    }
  }, [clickEffect, createBubble]);

  // Trail effect - creates bubbles along the mouse path
  useEffect(() => {
    if (trail) {
      trailInterval.current = setInterval(() => {
        const { x, y } = mousePosition.current;
        if (x && y) {
          createBubble(
            x + (Math.random() * 10 - 5),
            y + (Math.random() * 10 - 5)
          );
        }
      }, 1000 / trailLength);
    }
    
    return () => {
      if (trailInterval.current) {
        clearInterval(trailInterval.current);
      }
    };
  }, [trail, trailLength, createBubble]);

  // Event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    if (clickEffect) {
      window.addEventListener('click', handleClick);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (clickEffect) {
        window.removeEventListener('click', handleClick);
      }
    };
  }, [handleMouseMove, handleClick, clickEffect]);

  return (
    <AnimatePresence>
      {bubbles.map((bubble) => {
        // Different animation for click vs regular bubbles
        const variants = bubble.isClick ? {
          initial: { scale: 0.2, opacity: 0.9, rotate: 0 },
          animate: { 
            scale: 2.5, 
            opacity: 0, 
            rotate: bubble.rotation
          },
          exit: { opacity: 0 }
        } : {
          initial: { scale: 0.5, opacity: 0.8 },
          animate: { 
            scale: isHovering && interactiveHover ? 2.2 : 1.5, 
            opacity: 0 
          },
          exit: { opacity: 0 }
        };
        
        return (
          <motion.div
            key={bubble.id}
            className={`absolute pointer-events-none rounded-full ${bubble.color}`}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ 
              duration: bubble.duration, 
              ease: bubble.isClick ? 'easeOut' : 'easeInOut'
            }}
            style={{ 
              top: bubble.y - bubble.size / 2, 
              left: bubble.x - bubble.size / 2, 
              width: bubble.size, 
              height: bubble.size,
              zIndex: 9999
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
        );
      })}
    </AnimatePresence>
  );
};

export default CursorBubbles;

// Example usage:
// <CursorBubbles 
//   colors={['bg-red-500', 'bg-green-500', 'bg-blue-500']}
//   minSize={10}
//   maxSize={30}
//   duration={1.2}
//   clickEffect={true}
//   trail={true}
//   trailLength={8}
// />