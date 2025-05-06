// src/components/Card.jsx
import { motion } from "framer-motion";
import { cardVariants, addTouchFeedback } from "../utils/animation";

const Card = ({ faq, onExpand, isLandscape }) => {
  // Determine card size based on type and orientation
  let cardSizeClasses = "";

  if (isLandscape) {
    // Landscape mode has a different grid layout optimized for horizontal display
    switch (faq.type) {
      case "large":
        cardSizeClasses = "col-span-6 md:col-span-4 row-span-2 min-h-[180px]";
        break;
      case "medium":
        cardSizeClasses = "col-span-4 md:col-span-3 row-span-2 min-h-[180px]";
        break;
      case "small":
        cardSizeClasses = "col-span-3 md:col-span-2 row-span-1 min-h-[150px]";
        break;
      default:
        cardSizeClasses = "col-span-3 md:col-span-2 row-span-1 min-h-[150px]";
    }
  } else {
    // Portrait mode (vertical) - original layout
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
        apple-card overflow-hidden
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
      {/* Apple-style touch indicator */}
      <div className="absolute bottom-4 right-4 touch-target">
        <span className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={faq.textColor}
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </span>
      </div>

      {/* Category badge - Apple style */}
      <div className="absolute top-4 right-4 apple-badge bg-white bg-opacity-10">
        <span className={`${faq.textColor}`}>{faq.category}</span>
      </div>

      {/* Icon - Apple style */}
      <div className="text-3xl mb-4">{faq.icon}</div>

      {/* Question - Apple typography - adjust size for landscape */}
      <h3
        className={`${faq.textColor} font-medium tracking-tight mb-3 
        ${
          isLandscape
            ? faq.type === "large"
              ? "text-xl"
              : "text-lg"
            : faq.type === "large"
            ? "text-2xl"
            : "text-xl"
        }`}
      >
        {faq.question}
      </h3>

      {/* Answer preview - Apple style - potentially truncate more for landscape */}
      <p
        className={`${faq.textColor} opacity-80 line-clamp-2 text-base font-light`}
      >
        {isLandscape
          ? faq.answer.length > 80
            ? faq.answer.substring(0, 80) + "..."
            : faq.answer
          : faq.answer.length > 120
          ? faq.answer.substring(0, 120) + "..."
          : faq.answer}
      </p>

      {/* Read more indicator - Apple style */}
      <div className="mt-auto pt-3 flex items-center">
        <span className={`${faq.textColor} text-sm font-medium`}>
          Read more
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`ml-2 ${faq.textColor}`}
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </div>
    </motion.div>
  );
};

export default Card;
