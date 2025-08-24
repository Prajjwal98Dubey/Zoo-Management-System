

const Schedule = ({completedFeedings, pendingFeedings}) => {



  return (
    <div className="bg-white shadow rounded-2xl p-6 ">
      <h2 className="font-bold text-xl">Today's schedule</h2>
      <div className=" flex justify-around overflow-x-auto mt-4 ">
        {pendingFeedings.map((schedule, index) => (
          <div key={index} className="schedule-item p-2 bg-orange-100 border border-orange-500 rounded-lg">
            <p><strong>{schedule.animalName}</strong></p>
            <p>Time: {schedule.feedingTime}</p>
            <p>Food: {schedule.food}</p>
            <p>Status: Pending</p>
          </div>
        ))}
        {completedFeedings.map((schedule, index) => (
          <div key={index} className="schedule-item p-2 bg-green-100 border border-green-500 rounded-lg">
            <p><strong>{schedule.animalName}</strong></p>
            <p>Time: {schedule.feedingTime}</p>
            <p>Food: {schedule.food}</p>
            <p>Status: Completed</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
