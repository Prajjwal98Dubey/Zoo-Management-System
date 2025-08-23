import React, { useState } from 'react';
import { TotalFeeding } from './all.context';

export const TotalFeedingProvider = ({ children }) => {
  const [feedingData, setFeedingData] = useState([
    { animalName: 'Lion', feedingDone: true, feedingTime: '08:00', food: 'Meat' },
    { animalName: 'Elephant', feedingDone: false, feedingTime: '10:00', food: 'Fruits' },
    { animalName: 'Giraffe', feedingDone: true, feedingTime: '12:00', food: 'Leaves' },
    { animalName: 'Tiger', feedingDone: false, feedingTime: '14:00', food: 'Raw Meat' },
    { animalName: 'Monkey', feedingDone: true, feedingTime: '16:00', food: 'Bananas' },
    { animalName: 'Zebra', feedingDone: false, feedingTime: '18:00', food: 'Grass' }
  ]);

  return (
    <TotalFeeding.Provider value={{ feedingData, setFeedingData }}>
      {children}
    </TotalFeeding.Provider>
  );
};
