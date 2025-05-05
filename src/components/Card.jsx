// src/components/Card.jsx
import { motion } from "framer-motion";
import { cardVariants, addTouchFeedback } from "../utils/animation";

const Card = ({ faq, onExpand }) => {
  // Determine card size based on type
  let cardSizeClasses = "";

  switch (faq.type) {
    case "large":
      cardSizeClasses = "col-span-12 md:col-span-6 row-span-2 min-h-[220px]";
      break;
    case "medium":
      cardSizeClasses = "col-span-6 md:col-span-4 row-span-2 min-h-[220px]";
      break;
    case "small":
      cardSizeClasses = "col-span-6 md:col-span-3 row-span-1 min-h-[180px]";
      break;
    default:
      cardSizeClasses = "col-span-6 md:col-span-3 row-span-1 min-h-[180px]";
  }

  // Handle card click with touch feedback
  const handleCardClick = () => {
    addTouchFeedback();
    onExpand(faq.id);
  };

  return (
    <motion.div
      className={`
        ${cardSizeClasses}
        rounded-3xl overflow-hidden shadow-lg 
        bg-gradient-to-br ${faq.bgGradient} 
        cursor-pointer p-6 flex flex-col
        relative
      `}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      onClick={handleCardClick}
      layout
    >
      {/* Touch indicator - optimized for LG STANDBYME touch screen */}
      <div className="absolute bottom-4 right-4 touch-target">
        <span className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-30 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M14 14.76V3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v11.76"></path>
            <path d="M12 21a9 9 0 0 0 9-9"></path>
            <path d="M3 12a9 9 0 0 1 9-9"></path>
          </svg>
        </span>
      </div>

      {/* Category badge - larger for touch */}
      <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full px-4 py-2">
        <span className="text-white text-sm font-medium">{faq.category}</span>
      </div>

      {/* Icon - larger for visibility */}
      <div className="text-4xl mb-4">{faq.icon}</div>

      {/* Question - larger text for readability on the large screen */}
      <h3
        className={`text-white font-bold mb-3 ${
          faq.type === "large" ? "text-3xl" : "text-2xl"
        }`}
      >
        {faq.question}
      </h3>

      {/* Answer preview */}
      <p className="text-white text-opacity-80 line-clamp-2 text-lg">
        {faq.answer.length > 120
          ? faq.answer.substring(0, 120) + "..."
          : faq.answer}
      </p>

      {/* Read more indicator - enhanced for touch */}
      <div className="mt-auto pt-3 flex items-center">
        <span className="text-white text-base font-medium">
          Tap to read more
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2 text-white"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </div>
    </motion.div>
  );
};

export default Card;
