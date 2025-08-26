import { use, useState } from "react";
import { UserContext } from "../../contexts/all.context";
import toast from "react-hot-toast";
import { ADD_RECENT_ACTIVITY } from "../../apis/local.apis";
import { createTimeString } from "../../helpers/animal.helpers";

const AddActivityModal = ({ onClose, setRecentActivity }) => {
  const { user } = use(UserContext);
  const [inpText, setInpText] = useState("");
  const handleAddActivity = async () => {
    if (!inpText) {
      toast.error("enter some text to continue", {
        position: "top-center",
        duration: 1500,
      });
      return;
    }
    if (Object.keys(user).length == 0 || user.userRole !== "manager") {
      toast.error("not allowed to add activity", {
        position: "top-center",
        duration: 1500,
      });
      return;
    }
    let res = await fetch(ADD_RECENT_ACTIVITY, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ note: inpText }),
    });
    if (
      res.status == 204 ||
      res.status == 400 ||
      res.status == 500 ||
      res.status == 403
    )
      return toast.error("not allowed", {
        position: "top-center",
        duration: 1500,
      });
    setRecentActivity((prev) => [
      { message: inpText, time: createTimeString(new Date()) },
      ...prev,
    ]);
    toast.success("activity added !!!", {
      position: "top-center",
      duration: 1500,
    });
    onClose();
    return;
  };
  return (
    <div className="fixed w-full top-0 left-0 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm min-h-screen z-50">
      <div className="bg-white bg-opacity-95 backdrop-blur-md p-8 rounded-2xl max-w-2xl w-full max-h-[85vh] shadow-2xl overflow-y-auto relative border border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 font-medium transition-colors"
        >
          Close
        </button>
        <div className="w-full flex justify-center items-center">
          <h1 className="text-2xl font-semibold py-2">Share an Activity</h1>
        </div>
        <div className="w-full h-[100px] px-4 py-2 my-1 flex justify-center">
          <textarea
            value={inpText}
            onChange={(e) => setInpText(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="write a description about the acitivity"
          ></textarea>
        </div>
        <div className="w-full flex justify-center items-center py-2">
          <button
            onClick={handleAddActivity}
            className="px-5 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 cursor-pointer rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
