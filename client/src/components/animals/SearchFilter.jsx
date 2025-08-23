import { use } from "react";
import { CiFilter } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import {
  SelectedAnimalFilter,
  TotalAnimalsContext,
} from "../../contexts/all.context";
import { useEffect } from "react";

const ANIMAL_CATEGORY = [
  "all",
  "mammal",
  "bird",
  "reptile",
  "Aquatic",
  "fish",
  "others",
];
const ANIMAL_HEALTH_STATUS = [
  "all",
  "excellent",
  "good",
  "fair",
  "poor",
  "critical",
];
const SearchFilter = ({
  componentname,
  positionClasses,
  needFilters,
  filteredList,
  setFilteredList,
}) => {
  const { filters, setFilters } = use(SelectedAnimalFilter);
  const { animalList } = use(TotalAnimalsContext);

  useEffect(() => {
    if (needFilters) {
      setFilteredList(
        animalList.filter(
          (animal) =>
            (filters["category"].toLowerCase() == "all"
              ? animal["category"] != "all"
              : animal["category"].toLowerCase() ==
                filters["category"].toLowerCase()) &&
            (filters["healthStatus"].toLowerCase() == "all"
              ? animal["health_status"] != "all"
              : animal["health_status"].toLowerCase() ==
                filters["healthStatus"].toLowerCase())
        )
      );
    }
  }, [filters, needFilters]);

  return (
    <div className={`${positionClasses}`}>
      <div className="w-full bg-white h-fit py-4 rounded-[15px] shadow-sm shadow-gray-300 border border-gray-200">
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
        {needFilters && (
          <>
            <div className="bg-white w-full h-fit px-6 py-1 rounded-[15px] my-2 ">
              <div className="flex">
                <div className="text-sm text-gray-600 flex justify-center items-center font-semibold">
                  Category:
                </div>
                <div className="flex">
                  {ANIMAL_CATEGORY.map((category) => (
                    <div
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          category: category.toLowerCase(),
                        }))
                      }
                      key={category}
                      className={`w-fit h-fit mx-1 px-4 rounded-[25px] py-1 ${
                        filters["category"].toLowerCase() ==
                        category.toLowerCase()
                          ? "bg-green-600 text-white"
                          : "border border-gray-500"
                      } text-[11px] font-semibold cursor-pointer`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white w-full h-fit px-6 py-1 rounded-[15px] my-2 ">
              <div className="flex">
                <div className="text-sm text-gray-600 flex justify-center items-center font-semibold">
                  Health Status:
                </div>
                <div className="flex">
                  {ANIMAL_HEALTH_STATUS.map((status) => (
                    <div
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          healthStatus: status.toLowerCase(),
                        }))
                      }
                      key={status}
                      className={`w-fit h-fit mx-1 px-4 rounded-[25px] py-1 ${
                        filters["healthStatus"].toLowerCase() ==
                        status.toLowerCase()
                          ? "bg-green-600 text-white"
                          : "border border-gray-500"
                      } text-[11px] font-semibold cursor-pointer`}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
