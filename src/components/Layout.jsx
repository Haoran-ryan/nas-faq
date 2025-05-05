// src/components/Layout.jsx
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* App header - could be customized with NAS branding */}
      <header className="bg-gray-800 shadow-md p-4 hidden">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">National Art School</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* App footer - hidden by default for kiosk mode */}
      <footer className="bg-gray-800 p-4 text-center text-gray-400 text-sm hidden">
        <p>National Art School © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
