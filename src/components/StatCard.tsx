import React from "react";

interface StatCardProps {
  title: string; // Label, e.g., "Users"
  value: number | string; // Value to display
  children?: React.ReactNode; // Optional icon
  color?: string; // Tailwind text color for value
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  children,
  color = "text-gray-900",
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-10 flex items-center space-x-4 justify-center hover:scale-105 hover:bg-white/40 transition-all duration-300">
      {children}
      <div>
        <p className="text-xl mb-2">{title}</p>
        <p className={`text-2xl font-semibold ${color} text-center`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
