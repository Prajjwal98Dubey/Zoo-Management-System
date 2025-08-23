const MetaCard = ({ details }) => {
  return (
    <div className="w-full h-full shadow-sm shadow-gray-300 border border-gray-200 rounded-[15px] bg-white my-2">
      <div className="flex w-full h-fit py-2 px-4">
        <div
          className={`text-[#eb9956] text-xl px-2 py-2 flex justify-center items-center`}
        >
          {details.icon}
        </div>
        <div className="flex justify-center items-center text-xl font-semibold">
          {details.title}
        </div>
      </div>
      <div className="py-2 px-4 w-full h-[250px] overflow-auto">
        {details.metaData.map((data, index) => (
          <div
            key={index}
            style={data.cardStyles}
            className="w-full h-fit py-3 my-2 rounded-[15px]"
          >
            <div className="flex justify-between px-3 font-semibold text-[15px]">
              <div className="flex justify-center items-center">
                {data.animalName}
              </div>
              <div className="flex font-semibold justify-center items-center text-[13px] px-4 py-1 rounded-[30px] border border-[#F5AA83] text-[#F5AA83]">
                {data.tag}
              </div>
            </div>
            <div className="text-[13px] px-3 text-gray-600">{data.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetaCard;
