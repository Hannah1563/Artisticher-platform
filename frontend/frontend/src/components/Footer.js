import React from 'react';

function Footer() {
  return (
    <footer className="bg-purple-600 text-white py-4">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Artisticher. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy" className="text-white hover:underline">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="/terms" className="text-white hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;