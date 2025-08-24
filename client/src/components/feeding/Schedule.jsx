

const Schedule = ({ data }) => {
  return (
    <div className="bg-white shadow rounded-2xl p-6 ">
      <h2>Feeding Schedule</h2>
      <div className="schedule-list flex flex-row gap-4 overflow-x-auto mt-4">
        {data.map((schedule, index) => (
          <div key={index} className="schedule-item p-2 border-b">
            <p><strong>{schedule.animalName}</strong></p>
            <p>Time: {schedule.feedingTime}</p>
            <p>Food: {schedule.food}</p>
            <p>Status: {schedule.feedingDone ? 'Completed' : 'Pending'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
