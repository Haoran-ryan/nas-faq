// src/components/VideoModal.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addTouchFeedback } from "../utils/animation";

const VideoModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    // Check orientation on mount and when window resizes
    useEffect(() => {
        const checkOrientation = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        // Initial check
        checkOrientation();

        // Listen for resize or orientation change events
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);

        return () => {
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
        };
    }, []);

    const toggleModal = () => {
        addTouchFeedback(); // Add haptic feedback for touch devices
        setIsOpen(!isOpen);
    };

    // Pause/stop video when modal is closed
    useEffect(() => {
        if (!isOpen) {
            // Find any iframes and update their src to stop playback
            const iframes = document.querySelectorAll('.video-container iframe');
            iframes.forEach(iframe => {
                iframe.src = iframe.src;
            });
        }
    }, [isOpen]);

    // Animation variants - Apple style animations
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1], // Apple-style easing
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 10,
            transition: {
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.2 },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 },
        },
    };

    const buttonVariants = {
        rest: { scale: 1, opacity: 0.9 },
        hover: { scale: 1.05, opacity: 1 },
        tap: { scale: 0.95 },
    };

    return (
        <>
            {/* Floating Video Button - Apple style */}
            <motion.button
                className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-40
                 bg-white bg-opacity-70 backdrop-blur-md rounded-full
                 px-6 py-3 shadow-lg touch-target video-button
                 flex items-center justify-center"
                onClick={toggleModal}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                aria-label="Watch introduction video"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-900"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                <span className="font-medium text-gray-900">Watch Video</span>
            </motion.button>

            {/* Video Modal - Apple style */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
                        {/* Modal Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm modal-backdrop"
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={toggleModal}
                        ></motion.div>

                        {/* Modal Content */}
                        <motion.div
                            className={`
                relative bg-white rounded-2xl overflow-hidden shadow-2xl
                max-w-4xl w-full mx-auto animate-modal-open
                ${isLandscape ? 'max-h-[90vh]' : 'max-h-[95vh]'}
              `}
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50
                           rounded-full p-2 text-white modal-close-button"
                                onClick={toggleModal}
                                aria-label="Close video"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            {/* Video Embed - Responsive container */}
                            <div className="video-container">
                                <iframe
                                    title="vimeo-player"
                                    src="https://player.vimeo.com/video/466027086?h=9fbc021bd0&autoplay=1"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; fullscreen; picture-in-picture"
                                ></iframe>
                            </div>

                            {/* Video Details */}
                            <div className="p-6">
                                <h3 className="text-xl font-medium text-gray-900">
                                    National Art School Introduction
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Learn about the National Art School and its programs in this
                                    introductory video.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default VideoModal;