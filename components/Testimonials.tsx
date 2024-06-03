import React from "react";

const testimonials = [
  {
    comment: "This app has changed the way I manage my budget!",
    user: "user One",
  },
  {
    comment: "A must-have tool for personal finance management.",
    user: "user One",
  },
];

const Testimonials: React.FC = () => {
    return (
      <section
        id="testimonials"
        className="bg-gray-100 py-12"
        style={{ backgroundColor: "#0a3d62" }}
      >
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
          <div className=" bg-white p-6 rounded-lg shadow-md">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p>{testimonial.comment}</p>
                <p className="mt-4 font-bold ">{testimonial.user}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

}


export default Testimonials