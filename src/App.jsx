// src/App.jsx
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import CardGrid from "./components/CardGrid";
import VideoModal from "./components/VideoModal";

function App() {
  // Add any app-wide state or logic here
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Function to handle fullscreen for better touch experience
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Touch optimization for LG STANDBYME
  useEffect(() => {
    // Prevent pinch zoom for kiosk-like experience
    document.addEventListener(
        "touchmove",
        (e) => {
          if (e.touches.length > 1) {
            e.preventDefault();
          }
        },
        { passive: false }
    );

    // Initial screen wake lock for kiosk mode (if supported)
    if ("wakeLock" in navigator) {
      const requestWakeLock = async () => {
        try {
          const wakeLock = await navigator.wakeLock.request("screen");
          console.log("Wake Lock active");
        } catch (err) {
          console.error(`Wake Lock error: ${err.message}`);
        }
      };
      requestWakeLock();
    }

    return () => {
      document.removeEventListener("touchmove", (e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      });
    };
  }, []);

  return (
      <Layout>
        <CardGrid />

        {/* Add the VideoModal component */}
        <VideoModal />

        {/* Fullscreen toggle for kiosk mode */}
        <button
            onClick={toggleFullscreen}
            className="fixed bottom-4 right-4 bg-gray-800 p-3 rounded-full opacity-50 hover:opacity-100 transition-opacity z-50"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
              </svg>
          ) : (
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                />
              </svg>
          )}
        </button>
      </Layout>
  );
}

export default App;