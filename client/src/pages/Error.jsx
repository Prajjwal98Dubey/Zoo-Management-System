import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div>
        <div className="text-4xl font-semibold">:( Page Not Found</div>
        <div className="w-full py-6 flex justify-center items-center">
          <Link to="/">
            <button className="text-sm font-semibold bg-green-600 hover:bg-green-700 cursor-pointer px-4 py-2 rounded-md text-white">
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
