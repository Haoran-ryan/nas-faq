// src/components/ExpandedCard.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addTouchFeedback } from "../utils/animation";

const ExpandedCard = ({
  faq,
  onClose,
  relatedCards = [],
  onSelectRelated,
  isLandscape,
}) => {
  const [showRelatedCards, setShowRelatedCards] = useState(false);

  // Format answer text for better readability - Apple style
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
          <p
            className={`${faq.textColor} text-opacity-90 text-lg leading-relaxed font-light selectable-text`}
          >
            {answer}
          </p>
        );
      }

      return (
        <ol className="list-none pl-0 space-y-6 mt-6">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`${faq.textColor} text-opacity-90 text-lg flex items-start selectable-text`}
            >
              <span className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 text-sm">
                {index + 1}
              </span>
              <span className="font-light">{step.replace(/^\d+\.\s/, "")}</span>
            </li>
          ))}
        </ol>
      );
    } else {
      // Split paragraphs for better readability
      const paragraphs = answer.split(/\n+/);

      return (
        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`${faq.textColor} text-opacity-90 text-lg leading-relaxed font-light selectable-text`}
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

  // Animation variants - Apple-style smooth animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const panelVariants = {
    hidden: { y: "100%" },
    visible: {
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

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-800 bg-opacity-30 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className={`
          bg-gradient-to-br ${faq.bgGradient}
          apple-card w-full ${
            isLandscape ? "max-w-6xl max-h-[80vh]" : "max-w-4xl max-h-[90vh]"
          }
          overflow-hidden relative flex flex-col
        `}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header with back button - Apple style */}
        <div className="p-5 flex justify-between items-center border-b border-gray-200 border-opacity-20">
          <button
            className="rounded-full p-2 bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors touch-target"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={faq.textColor}
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </button>

          <div className="text-center">
            <span className={`${faq.textColor} text-base font-medium`}>
              {faq.category}
            </span>
          </div>

          <button
            className="rounded-full p-2 bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors touch-target"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={faq.textColor}
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        {/* Content area with scrolling - Apple style - adapt for landscape */}
        <div
          className={`
          ${isLandscape ? "flex flex-row overflow-hidden" : "block"}
          flex-grow
        `}
        >
          {/* Main content */}
          <div
            className={`
            ${
              isLandscape
                ? "w-2/3 overflow-y-auto border-r border-gray-200 border-opacity-20"
                : "overflow-y-auto"
            }
            p-8
          `}
          >
            {/* Question - Apple typography */}
            <div className="flex items-start mb-8">
              <div className="text-4xl mr-4">{faq.icon}</div>
              <h2
                className={`${faq.textColor} text-3xl font-medium tracking-tight`}
              >
                {faq.question}
              </h2>
            </div>

            {/* Answer - Apple typography */}
            <div className="mt-6 mb-8">{formatAnswer(faq.answer)}</div>

            {/* Additional resources - Apple style */}
            <div className="mt-8 pt-6 border-t border-gray-200 border-opacity-20">
              <h4 className={`${faq.textColor} text-xl font-medium mb-4`}>
                Learn more
              </h4>
              <a
                href="https://nas.edu.au"
                target="_blank"
                rel="noreferrer"
                className={`${faq.textColor} text-lg flex items-center hover:underline touch-target group`}
              >
                Visit nas.edu.au
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
                  className={`ml-2 ${faq.textColor} transition-transform group-hover:translate-x-1`}
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Side panel for related questions in landscape mode */}
          {isLandscape && relatedCards.length > 0 && (
            <div className="w-1/3 p-6 overflow-y-auto">
              <h3 className="text-xl font-medium mb-6">Related Questions</h3>
              <div className="space-y-4">
                {relatedCards.map((card) => (
                  <div
                    key={card.id}
                    className={`
                      bg-gradient-to-br ${card.bgGradient}
                      apple-card p-4 cursor-pointer touch-target
                      hover:shadow-md hover:-translate-y-1 transition-all
                    `}
                    onClick={() => handleSelectRelated(card.id)}
                  >
                    <div className="flex items-start">
                      <div className="text-2xl mr-3">{card.icon}</div>
                      <div>
                        <h4
                          className={`${card.textColor} text-base font-medium mb-1`}
                        >
                          {card.question}
                        </h4>
                        <p
                          className={`${card.textColor} opacity-70 text-xs line-clamp-1`}
                        >
                          {card.category}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with related questions toggle - Only show in portrait mode */}
        {!isLandscape && relatedCards.length > 0 && (
          <div className="p-6 border-t border-gray-200 border-opacity-20">
            <button
              className={`
                w-full rounded-xl p-3.5 text-base font-medium
                flex items-center justify-center transition-colors touch-target
                ${faq.textColor} bg-white bg-opacity-10 hover:bg-opacity-20
              `}
              onClick={toggleRelatedCards}
            >
              {showRelatedCards
                ? "Hide Related Questions"
                : "Show Related Questions"}
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
                className={`ml-2 transition-transform ${
                  showRelatedCards ? "rotate-180" : ""
                } ${faq.textColor}`}
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
        )}

        {/* Related cards panel - Apple style - Only in portrait mode */}
        {!isLandscape && (
          <AnimatePresence>
            {relatedCards.length > 0 && showRelatedCards && (
              <motion.div
                className="absolute inset-x-0 bottom-0 bg-gray-50 dark:bg-gray-900 rounded-t-3xl overflow-hidden z-10 shadow-lg"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 mx-auto rounded-full mb-6"></div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                    Related Questions
                  </h3>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto">
                  {relatedCards.map((card) => (
                    <div
                      key={card.id}
                      className={`
                        bg-gradient-to-br ${card.bgGradient}
                        apple-card p-5 cursor-pointer touch-target
                        hover:shadow-md hover:-translate-y-1 transition-all
                      `}
                      onClick={() => handleSelectRelated(card.id)}
                    >
                      <div className="flex items-start">
                        <div className="text-2xl mr-3">{card.icon}</div>
                        <div>
                          <h4
                            className={`${card.textColor} text-lg font-medium mb-1`}
                          >
                            {card.question}
                          </h4>
                          <p
                            className={`${card.textColor} opacity-70 text-sm line-clamp-1`}
                          >
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
        )}
      </motion.div>

      {/* Stacked cards on the side - Only in portrait mode */}
      {!isLandscape && (
        <div className="absolute right-6 top-1/4 hidden lg:flex flex-col space-y-4 z-30">
          {relatedCards.slice(0, 3).map((card, index) => (
            <motion.div
              key={card.id}
              className={`
                bg-gradient-to-br ${card.bgGradient}
                apple-card p-4 cursor-pointer w-64 touch-target
                hover:shadow-md hover:-translate-y-1 transition-all
              `}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.3,
                  delay: 0.1 * index,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              exit={{
                opacity: 0,
                x: 50,
                transition: {
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              onClick={() => handleSelectRelated(card.id)}
              style={{
                translateX: `${index * 10}px`,
                translateY: `${index * 10}px`,
                zIndex: 30 - index,
              }}
            >
              <div className="text-2xl mb-2">{card.icon}</div>
              <h3 className={`${card.textColor} font-medium mb-1 line-clamp-1`}>
                {card.question}
              </h3>
              <p
                className={`${card.textColor} opacity-70 text-sm line-clamp-1`}
              >
                {card.category}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ExpandedCard;
