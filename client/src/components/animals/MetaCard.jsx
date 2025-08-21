const MetaCard = ({ details }) => {
  return (
    <div className="w-full rounded-[15px] bg-white py-4 shadow-sm shadow-gray-300 border border-gray-200">
      <div className="flex justify-start px-4">
        <div
          style={details.cardStyles}
          className="text-xl w-fit px-3 py-4 rounded-[10px] flex justify-center items-center"
        >
          {details.icon}
        </div>
        <div className="px-2">
          <div className="text-2xl font-semibold">{details.count}</div>
          <div className="text-gray-500 text-sm font-medium">
            {details.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaCard;
