import React, { useState } from 'react';
import { TotalFeeding } from './all.context';

export const TotalFeedingProvider = ({ children }) => {
  const [feedingData, setFeedingData] = useState([
    { animalName: 'Lion', feedingDone: true, feedingTime: '08:00', food: 'Meat', caretaker: 'John' },
    { animalName: 'Elephant', feedingDone: false, feedingTime: '10:00', food: 'Fruits', caretaker: 'Alice' },
    { animalName: 'Giraffe', feedingDone: true, feedingTime: '12:00', food: 'Leaves', caretaker: 'Bob' },
    { animalName: 'Tiger', feedingDone: false, feedingTime: '14:00', food: 'Raw Meat', caretaker: 'Sara' },
    { animalName: 'Monkey', feedingDone: true, feedingTime: '16:00', food: 'Bananas', caretaker: 'Mike' },
    { animalName: 'Zebra', feedingDone: false, feedingTime: '18:00', food: 'Grass', caretaker: 'Emma' }
  ]);

  const pendingFeedings = feedingData.filter(item => !item.feedingDone);
  const completedFeedings = feedingData.filter(item => item.feedingDone);

  function markFeedingDone(animalName) {
    setFeedingData(prev =>
      prev.map(item =>
        item.animalName === animalName && !item.feedingDone
          ? { ...item, feedingDone: true }
          : item
      )
    );
  }

  return (
    <TotalFeeding.Provider value={{ pendingFeedings, completedFeedings, markFeedingDone }}>
      {children}
    </TotalFeeding.Provider>
  );
};
