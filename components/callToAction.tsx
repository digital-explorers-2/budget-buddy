// components/CallToAction.tsx
import React from "react";

const CallToAction: React.FC = () => {
  return (
    <section id="cta" className="bg-blue-600 text-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
        <a
          href="#"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md font-bold"
        >
          Sign Up Now
        </a>
      </div>
    </section>
  );
};

export default CallToAction;
