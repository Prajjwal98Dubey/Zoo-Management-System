import { CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";

const SearchFilter = ({ componentname, positionClasses }) => {
  return (
    <div className={`${positionClasses}`}>
      <div className="w-full bg-white h-fit py-4 rounded-[15px] shadow-sm shadow-gray-300 border border-gray-200 ">
        <div className="font-bold text-lg flex px-2 py-3">
          <div className="flex justify-center items-center font-bold text-2xl px-1">
            <CiFilter />
          </div>
          <div className="flex justify-center items-center text-xl font-semibold">
            Filter & Search
          </div>
        </div>
        <div className="w-full px-4 py-2 relative">
          <div className="absolute left-6 top-[21px] text-[20px] font-bold text-gray-500">
            <IoIosSearch />
          </div>
          <input
            placeholder={`Search ${componentname} ...`}
            className="w-full bg-[hsl(40,20%,97%)] h-[45px] text-sm rounded-md border border-gray-300 focus:border-green-500 px-8 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
