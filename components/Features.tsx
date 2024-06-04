import React from "react"
import { FaRegMoneyBillAlt, FaChartLine, FaPiggyBank } from "react-icons/fa"

const features = [
  {
    title: "Expense Tracking",
    detail: "Record and categorize daily expenses.",
    icon: <FaRegMoneyBillAlt size={24} />,
  },
  {
    title: "Income Management",
    detail: "Track income and view detailed reports.",
    icon: <FaChartLine size={24} />,
  },
  {
    title: "Financial Goals",
    detail: "Set and track savings goals.",
    icon: <FaPiggyBank size={24} />,
  },
]


const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="container mx-auto py-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-90 p-6 rounded-lg shadow-custom-strong text-black"
          >
            {" "}
            <div className="flex items-center mb-4">
              <div className="mr-3">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
            </div>
            <p>{feature.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
