const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
};

const Modal = ({ details, onClose }) => {
  if (!details) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 w-full max-w-2xl"
        style={{
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-2xl font-semibold">{details.animalName}</div>
          <button
            className="border border-gray-200 rounded-md px-4 py-1 bg-[hsl(40,20%,97%)] text-gray-700 font-medium hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
          <div>
            <div className="text-sm text-gray-500 font-medium">Species</div>
            <div className="text-base font-normal">{details.species}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Health Status
            </div>
            <div>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: "#e6f9ed",
                  color: "#166534",
                  fontWeight: 500,
                }}
              >
                {details.healthStatus}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Age</div>
            <div className="text-base font-normal">{details.age} years</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Weight</div>
            <div className="text-base font-normal">{details.weight} kg</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">Enclosure</div>
            <div className="text-base font-normal">{details.enclosure}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 font-medium">
              Last Checkup
            </div>
            <div className="text-base font-normal">
              {formatDate(details.lastCheckup)}
            </div>
          </div>
        </div>
        <div className="mb-2">
          <div className="text-sm text-gray-500 font-medium mb-1">Diet</div>
          <div
            className="rounded-md px-3 py-2 text-base"
            style={{
              backgroundColor: "#e6f9ed",
              color: "#166534",
              fontWeight: 500,
              width: "fit-content",
            }}
          >
            {details.diet}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 font-medium mb-1">Notes</div>
          <div
            className="rounded-md px-3 py-2 text-base"
            style={{
              backgroundColor: "#e6f9ed",
              color: "#166534",
              fontWeight: 500,
              width: "fit-content",
            }}
          >
            {details.notes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
