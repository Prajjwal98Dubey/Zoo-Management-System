const InitialCard = ({ details }) => {
  return (
    <div className="w-full h-full py-3 rounded-[10px] shadow-sm shadow-gray-300 border border-gray-200 text-sm my-2 bg-white">
      <div className="flex w-full h-fit justify-between px-4 py-2">
        <p className="text-[16px] flex justify-center items-center font-semibold text-gray-500">
          {details.title}
        </p>
        <div
          style={details.cardStyles}
          className="w-fit h-fit px-2 py-2 rounded-[5px] font-bold text-lg"
        >
          {details.icon}
        </div>
      </div>
      <div className="px-4">
        <div className="text-xl font-bold py-1">{details.metaData.count}</div>
        <div className={`${details.metaData.color} font-semibold text-[12px]`}>
          {details.metaData.message}
        </div>
      </div>
    </div>
  );
};

export default InitialCard;
