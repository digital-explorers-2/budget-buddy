import React from "react"
import { FaRegMoneyBillAlt, FaChartLine, FaPiggyBank } from "react-icons/fa"

const features = [
  {
    title: "Expense Tracking",
    detail:
      "Easily record and categorize your daily expenses to stay on top of your spending.",
    icon: <FaRegMoneyBillAlt size={24} />,
  },
  {
    title: "Income Management",
    detail:
      "Track all sources of income and view detailed reports to manage your earnings effectively.",
    icon: <FaChartLine size={24} />,
  },
  {
    title: "Financial Goals",
    detail:
      "Define your financial goals and track your savings progress to reach them efficiently.",
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
            className="bg-white bg-opacity-90 p-6 rounded-lg shadow-custom-strong"
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
