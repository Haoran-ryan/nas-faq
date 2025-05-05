// src/utils/animation.js

/**
 * Animation variants for Framer Motion
 * Optimized for LG STANDBYME touch screen
 */

// Card animation variants
export const cardVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
    y: 2,
    transition: {
      duration: 0.1,
    },
  },
};

// Expanded card animation variants
export const expandedCardVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

// Overlay animation variants
export const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Stacked cards animation variants
export const stackedCardVariants = {
  initial: (index) => ({
    opacity: 0,
    x: 50,
    y: index * 5,
  }),
  animate: (index) => ({
    opacity: 1,
    x: 0,
    y: index * 10,
    transition: {
      duration: 0.3,
      delay: 0.1 * index,
    },
  }),
  exit: (index) => ({
    opacity: 0,
    x: 50,
    transition: {
      duration: 0.2,
      delay: 0.05 * index,
    },
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Panel slide up animation
export const slideUpPanelVariants = {
  initial: {
    y: "100%",
  },
  animate: {
    y: "0%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    y: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

// Helper function to add touch feedback
export const addTouchFeedback = () => {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(50); // Short vibration for touch feedback
  }
};

// Container variants for staggered children
export const containerVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};
