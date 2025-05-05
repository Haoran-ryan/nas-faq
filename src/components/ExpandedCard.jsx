// src/components/ExpandedCard.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  expandedCardVariants,
  overlayVariants,
  stackedCardVariants,
  slideUpPanelVariants,
  addTouchFeedback,
} from "../utils/animation";

const ExpandedCard = ({ faq, onClose, relatedCards = [], onSelectRelated }) => {
  const [showRelatedCards, setShowRelatedCards] = useState(false);

  // Format answer text for better readability
  const formatAnswer = (answer) => {
    // Check if the answer contains numbered steps
    if (answer.includes("1.")) {
      // Split by numbered items and filter out empty strings
      const parts = answer.split(/(\d+\.\s)/);
      const steps = [];

      for (let i = 1; i < parts.length; i += 2) {
        if (i + 1 < parts.length) {
          steps.push(parts[i] + parts[i + 1].trim());
        }
      }

      if (steps.length === 0) {
        return (
          <p className="text-white text-opacity-90 text-xl leading-relaxed selectable-text">
            {answer}
          </p>
        );
      }

      return (
        <ol className="list-none pl-0 space-y-4 mt-6">
          {steps.map((step, index) => (
            <li
              key={index}
              className="text-white text-opacity-90 text-xl flex items-start selectable-text"
            >
              <span className="bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                {index + 1}
              </span>
              <span>{step.replace(/^\d+\.\s/, "")}</span>
            </li>
          ))}
        </ol>
      );
    } else {
      // Split paragraphs for better readability
      const paragraphs = answer.split(/\n+/);

      return (
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-white text-opacity-90 text-xl leading-relaxed selectable-text"
            >
              {paragraph}
            </p>
          ))}
        </div>
      );
    }
  };

  // Toggle related cards display
  const toggleRelatedCards = () => {
    addTouchFeedback();
    setShowRelatedCards(!showRelatedCards);
  };

  // Handle close
  const handleClose = () => {
    addTouchFeedback();
    onClose();
  };

  // Handle related card selection
  const handleSelectRelated = (id) => {
    addTouchFeedback();
    setShowRelatedCards(false);
    onSelectRelated(id);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black bg-opacity-50 backdrop-blur-sm"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className={`
          bg-gradient-to-br ${faq.bgGradient}
          rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh]
          overflow-hidden relative flex flex-col
        `}
        variants={expandedCardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Header with back button */}
        <div className="p-6 flex justify-between items-center border-b border-white border-opacity-20">
          <button
            className="bg-white bg-opacity-20 hover:bg-opacity-30 
                     text-white rounded-full p-4 transition-colors touch-target"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>

          <div className="text-center">
            <span className="text-white text-xl font-medium">
              {faq.category}
            </span>
          </div>

          <button
            className="bg-white bg-opacity-20 hover:bg-opacity-30 
                     text-white rounded-full p-4 transition-colors touch-target"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content area with scrolling */}
        <div className="p-8 overflow-y-auto flex-grow">
          {/* Question */}
          <div className="flex items-start mb-8">
            <div className="text-5xl mr-4">{faq.icon}</div>
            <h2 className="text-white text-4xl font-bold">{faq.question}</h2>
          </div>

          {/* Answer */}
          <div className="mt-6 mb-8">{formatAnswer(faq.answer)}</div>

          {/* Additional resources */}
          <div className="mt-8 pt-6 border-t border-white border-opacity-20">
            <h4 className="text-white text-2xl font-medium mb-4">Learn more</h4>
            <a
              href="https://nas.edu.au"
              target="_blank"
              rel="noreferrer"
              className="text-white text-xl flex items-center hover:underline touch-target"
            >
              Visit nas.edu.au
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
                className="ml-2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Footer with related questions toggle - only show if there are related cards */}
        {relatedCards.length > 0 && (
          <div className="p-6 border-t border-white border-opacity-20">
            <button
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30
                       text-white rounded-xl p-4 text-xl font-medium
                       flex items-center justify-center transition-colors touch-target"
              onClick={toggleRelatedCards}
            >
              {showRelatedCards
                ? "Hide Related Questions"
                : "Show Related Questions"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ml-2 transition-transform ${
                  showRelatedCards ? "rotate-180" : ""
                }`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
        )}

        {/* Related cards panel */}
        <AnimatePresence>
          {relatedCards.length > 0 && showRelatedCards && (
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-gray-900 rounded-t-3xl overflow-hidden z-10"
              variants={slideUpPanelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="p-6 border-b border-gray-800">
                <div className="w-16 h-1 bg-gray-700 mx-auto rounded-full mb-6"></div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Related Questions
                </h3>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto">
                {relatedCards.map((card) => (
                  <div
                    key={card.id}
                    className={`
                      bg-gradient-to-br ${card.bgGradient}
                      rounded-xl p-5 shadow-md cursor-pointer
                      hover:shadow-lg transition-shadow touch-target
                      touch-feedback
                    `}
                    onClick={() => handleSelectRelated(card.id)}
                  >
                    <div className="flex items-start">
                      <div className="text-3xl mr-3">{card.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">
                          {card.question}
                        </h4>
                        <p className="text-white text-opacity-70 text-sm line-clamp-1">
                          {card.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Stacked cards on the side for LG STANDBYME display */}
      <div className="absolute right-6 top-1/4 hidden lg:flex flex-col space-y-4 z-30">
        {relatedCards.slice(0, 3).map((card, index) => (
          <motion.div
            key={card.id}
            className={`
              bg-gradient-to-br ${card.bgGradient}
              rounded-2xl p-4 shadow-lg cursor-pointer
              w-64 touch-target touch-feedback
            `}
            custom={index}
            variants={stackedCardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleSelectRelated(card.id)}
            style={{
              translateX: `${index * 10}px`,
              translateY: `${index * 10}px`,
              zIndex: 30 - index,
            }}
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <h3 className="text-white font-bold mb-1 line-clamp-1">
              {card.question}
            </h3>
            <p className="text-white text-opacity-80 text-sm line-clamp-1">
              {card.category}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpandedCard;
