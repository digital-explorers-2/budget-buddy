import React from 'react';

const Footer: React.FC = () => {
    return(
        
<footer className="w-full border-t border-t-foreground/10 p-8 flex flex-col items-center text-center text-xs">
<div className="mb-4">
  <p className="font-semibold text-base">Budget Buddy</p>
  <p className="text-sm">Track your expenses, manage your budget, and achieve your financial goals.</p>
</div>
<div className="flex space-x-4 mb-4">
  <a href="/about" className="hover:underline">About Us</a>
  <a href="/features" className="hover:underline">Features</a>
  <a href="/contact" className="hover:underline">Contact</a>
  <a href="/privacy" className="hover:underline">Privacy Policy</a>
</div>
<div className="mb-4">
  <a href="https://twitter.com/budgetbuddy" target="_blank" rel="noreferrer" className="hover:underline">
    Twitter
  </a>
  {" | "}
  <a href="https://facebook.com/budgetbuddy" target="_blank" rel="noreferrer" className="hover:underline">
    Facebook
  </a>
  {" | "}
  <a href="https://instagram.com/budgetbuddy" target="_blank" rel="noreferrer" className="hover:underline">
    Instagram
  </a>
</div>
<div className="text-gray-500">
  <p>&copy; 2024 Budget Buddy. All rights reserved.</p>
  <p>Designed and built with ❤️ by the Budget Buddy team.</p>
</div>
</footer>

    );
};

export default Footer;
