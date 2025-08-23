import SearchFilter from "../components/animals/SearchFilter";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { use, useEffect, useState } from "react";
import { TotalAnimalsContext } from "../contexts/all.context";
import Card from "../components/animals/Card.jsx";
import { GET_ANIMALS } from "../apis/local.apis.js";

const Animal = () => {
  const { animalList, setAnimalList } = use(TotalAnimalsContext);
  const [filteredList, setFilteredList] = useState(animalList);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAnimalDetails = async () => {
      setIsLoading(true);
      let res = await fetch(GET_ANIMALS);
      res = await res.json();
      setAnimalList(res.details);
      setFilteredList(res.details);
      setIsLoading(false);
    };
    if (animalList.length == 0) getAnimalDetails();
  }, [animalList.length, setAnimalList]);

  return (
    <div className="px-4 w-full ">
      <div className="flex justify-between px-2 py-4">
        <div>
          <div className="text-3xl font-semibold">Animal Management</div>
          <div className="text-sm text-gray-700">
            Monitor and manage all animals in the zoo
          </div>
        </div>
        <div>
          <button className="bg-green-600 font-bold hover:bg-green-700 cursor-pointer rounded-md px-3 py-2 text-white text-sm">
            + Add New Animal
          </button>
        </div>
      </div>
      <div className="w-ful">
        <SearchFilter
          componentname={"animal by name or species"}
          needFilters={true}
          setFilteredList={setFilteredList}
          originalList={animalList}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center text-xl">
          Loading...
        </div>
      ) : (
        <>
          <div className="flex my-6">
            <div className="w-1/3 mx-1">
              <div className="w-full rounded-[15px] bg-white py-4 shadow-sm shadow-gray-300 border border-gray-200">
                <div className="flex justify-start px-4">
                  <div
                    style={{ backgroundColor: "#e6f9ed", color: "#166534" }}
                    className="text-xl w-fit px-3 py-4 rounded-[10px] flex justify-center items-center"
                  >
                    <FaHeart />
                  </div>
                  <div className="px-2">
                    <div className="text-2xl font-semibold">
                      {filteredList.length}
                    </div>
                    <div className="text-gray-500 text-sm font-medium">
                      Total Animals
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3 mx-1">
              <div className="w-full rounded-[15px] bg-white py-4 shadow-sm shadow-gray-300 border border-gray-200">
                <div className="flex justify-start px-4">
                  <div
                    style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
                    className="text-xl w-fit px-3 py-4 rounded-[10px] flex justify-center items-center"
                  >
                    <MdOutlineHealthAndSafety />
                  </div>
                  <div className="px-2">
                    <div className="text-2xl font-semibold">
                      {
                        filteredList.filter(
                          (animal) =>
                            animal.health_status.toLowerCase() == "excellent"
                        ).length
                      }
                    </div>
                    <div className="text-gray-500 text-sm font-medium">
                      Healthy
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/3 mx-1">
              <div className="w-full rounded-[15px] bg-white py-4 shadow-sm shadow-gray-300 border border-gray-200">
                <div className="flex justify-start px-4">
                  <div
                    style={{ backgroundColor: "#fff3e6", color: "#b45309" }}
                    className="text-xl w-fit px-3 py-4 rounded-[10px] flex justify-center items-center"
                  >
                    <IoIosWarning />
                  </div>
                  <div className="px-2">
                    <div className="text-2xl font-semibold">
                      {
                        filteredList.filter(
                          (animal) =>
                            animal.health_status.toLowerCase() == "critical"
                        ).length
                      }
                    </div>
                    <div className="text-gray-500 text-sm font-medium">
                      Need Attention
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {filteredList.length == 0 ? (
            <div>No Animal Found</div>
          ) : (
            <div className="flex flex-wrap my-4">
              {filteredList.map((details) => (
                <div
                  key={details.animal_id}
                  className="w-[32%] h-[200px] mx-2 my-2"
                >
                  <Card details={details} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Animal;
