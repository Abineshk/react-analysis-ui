interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => {
  return (
    <div className="bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 h-[230px] shadow-md hover:shadow-xl transition-shadow">
      <span className="text-xl text-purple-600">{title}</span>

      <div className="w-full h-[200px] mt-3 hover:scale-105 hover:bg-white/40 transition-all duration-300 relative">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
