const EmptyListCard = ({ componentName, icon }) => {
  return (
    <div className="w-full h-full rounded-[10px] shadow-sm shadow-gray-300 border border-gray-200 bg-white flex items-center justify-center py-3 ">
      <div className="w-full h-full text-black">
        <div className="flex justify-center items-center py-4 text-6xl font-bold">
          {icon}
        </div>
        <div className="flex justify-center items-center py-1 font-semibold text-xl">
          No {componentName} found
        </div>
        <div className="flex justify-center items-center py-1 text-sm text-gray-600">
          try adjusting your search criteria or filters.
        </div>
      </div>
    </div>
  );
};

export default EmptyListCard;
