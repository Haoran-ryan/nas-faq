// src/components/CardGrid.jsx
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import ExpandedCard from "./ExpandedCard";
import faqData from "../data/faqData";
import { containerVariants, addTouchFeedback } from "../utils/animation";

const CardGrid = () => {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Generate categories from FAQ data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(faqData.map((faq) => faq.category))];
    return [
      { id: "all", name: "All", icon: "🎓" },
      ...uniqueCategories.map((category) => {
        // Assign icon based on category
        let icon = "📄";
        switch (category.toLowerCase()) {
          case "finance":
            icon = "💰";
            break;
          case "admission":
            icon = "📝";
            break;
          case "location":
            icon = "📍";
            break;
          case "curriculum":
            icon = "🎨";
            break;
          case "student life":
            icon = "🏠";
            break;
          case "application":
            icon = "✏️";
            break;
          default:
            icon = "📄";
        }
        return { id: category.toLowerCase(), name: category, icon };
      }),
    ];
  }, []);

  // Find expanded card data
  const expandedCard = expandedCardId
    ? faqData.find((faq) => faq.id === expandedCardId)
    : null;

  // Filter cards by category and search query
  useEffect(() => {
    let result = faqData;

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(
        (faq) => faq.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.category.toLowerCase().includes(query)
      );
    }

    setFilteredFaqs(result);
  }, [activeCategory, searchQuery]);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    addTouchFeedback();
    setActiveCategory(categoryId);
    setMenuOpen(false);
  };

  // Handle card expansion
  const handleCardExpand = (id) => {
    setExpandedCardId(id);
  };

  // Handle card closing
  const handleCardClose = () => {
    setExpandedCardId(null);
  };

  // Get related cards for the expanded card
  const getRelatedCards = () => {
    if (!expandedCard) return [];

    return faqData
      .filter(
        (faq) =>
          faq.id !== expandedCardId && faq.category === expandedCard.category
      )
      .slice(0, 4);
  };

  // Toggle menu with touch feedback
  const toggleMenu = () => {
    addTouchFeedback();
    setMenuOpen(!menuOpen);
  };

  // Clear search with touch feedback
  const clearSearch = () => {
    addTouchFeedback();
    setSearchQuery("");
  };

  // Reset filters with touch feedback
  const resetFilters = () => {
    addTouchFeedback();
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="mr-4 p-2 rounded-full hover:bg-gray-700 lg:hidden touch-target"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <g>
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </g>
                ) : (
                  <g>
                    <path d="M3 12h18"></path>
                    <path d="M3 6h18"></path>
                    <path d="M3 18h18"></path>
                  </g>
                )}
              </svg>
            </button>

            <div>
              <h1 className="text-2xl font-bold">National Art School</h1>
              <p className="text-gray-400 text-sm">
                Frequently Asked Questions
              </p>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="bg-gray-700 text-white rounded-full py-3 pl-12 pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-3 text-gray-400"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            {searchQuery && (
              <button
                className="absolute right-4 top-3 text-gray-400 hover:text-white touch-target"
                onClick={clearSearch}
                aria-label="Clear search"
              >
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
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900 bg-opacity-90 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 touch-target"
                onClick={toggleMenu}
                aria-label="Close menu"
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

              <h2 className="text-2xl font-bold mb-6">Categories</h2>

              <div className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    className={`
                      p-4 rounded-xl flex items-center space-x-3 touch-target
                      ${
                        activeCategory === category.id
                          ? "bg-blue-600"
                          : "bg-gray-800 hover:bg-gray-700"
                      }
                    `}
                    onClick={() => handleCategorySelect(category.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.05,
                      },
                    }}
                    exit={{ opacity: 0, y: 20 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-lg font-medium">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop category sidebar */}
        <div className="hidden lg:block w-64 bg-gray-800 min-h-screen p-6">
          <h2 className="text-xl font-bold mb-6">Categories</h2>

          <div className="space-y-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`
                  w-full p-3 rounded-lg flex items-center space-x-3 text-left touch-target
                  ${
                    activeCategory === category.id
                      ? "bg-blue-600"
                      : "hover:bg-gray-700"
                  }
                `}
                onClick={() => handleCategorySelect(category.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: index * 0.05,
                  },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Category tags - only show on mobile/tablet when not in menu */}
          <div className="lg:hidden flex overflow-x-auto pb-4 space-x-2 mb-6">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-full touch-target
                  ${
                    activeCategory === category.id
                      ? "bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }
                `}
                onClick={() => handleCategorySelect(category.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.05,
                  },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl mr-2">{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Results info */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {activeCategory === "all"
                ? "All FAQs"
                : `${
                    categories.find((c) => c.id === activeCategory)?.name
                  } FAQs`}
            </h2>
            <p className="text-gray-400">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "result" : "results"}
            </p>
          </div>

          {/* Card grid */}
          <motion.div
            className={`
              grid grid-cols-12 gap-6
              transition-all duration-300 ease-in-out
              ${
                expandedCardId ? "opacity-0 pointer-events-none" : "opacity-100"
              }
            `}
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <Card key={faq.id} faq={faq} onExpand={handleCardExpand} />
              ))
            ) : (
              <div className="col-span-12 p-8 bg-gray-800 rounded-xl text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4 text-gray-400"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-gray-400">
                  Try adjusting your search or category filter
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors touch-target"
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Expanded card view */}
      <AnimatePresence>
        {expandedCardId && expandedCard && (
          <ExpandedCard
            faq={expandedCard}
            onClose={handleCardClose}
            relatedCards={getRelatedCards()}
            onSelectRelated={handleCardExpand}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardGrid;
