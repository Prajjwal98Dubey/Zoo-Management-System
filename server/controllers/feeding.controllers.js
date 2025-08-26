import { nanoid } from "nanoid";
import zooPool from "../db/connection.js";
const fieldToDbColumn = {
  animalId: "animal_id",
  animalName: "animal_name",
  feedingTime: "feeding_time",
  foodType: "food_type",
  amount: "amount",
  staffId: "staff_id",
  staffName: "staff_name",
  completed: "completed",
  notes: "notes",
};

export const addFeedingSchedule = async (req, res) => {
  const {
    animal_id,
    animal_name,
    feeding_time,
    food_type,
    amount,
    staff_id,
    staff_name,
    notes,
  } = req.body;

  if (
    !animal_id ||
    !animal_name ||
    !feeding_time ||
    !food_type ||
    !amount ||
    !staff_id ||
    !staff_name
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const id = nanoid();
    await zooPool.query(
      `INSERT INTO feeding_schedules 
        (id, animal_id, animal_name, feeding_time, food_type, amount, staff_id, staff_name, notes)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        id,
        animal_id,
        animal_name,
        feeding_time,
        food_type,
        amount,
        staff_id,
        staff_name,
        notes,
      ]
    );
    return res
      .status(201)
      .json({ id, animal_name, feeding_time, diet: food_type, staff_name });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const updateFeedingSchedule = async (req, res) => {
  const { id } = req.params;
  const updates = [];
  const values = [];
  let idx = 1;

  for (const field in fieldToDbColumn) {
    if (req.body[field] !== undefined) {
      updates.push(`${fieldToDbColumn[field]} = $${idx}`);
      values.push(req.body[field]);
      idx++;
    }
  }
  updates.push(`updated_at = CURRENT_TIMESTAMP`);
  if (updates.length === 1) {
    return res
      .status(400)
      .json({ error: "No valid fields provided for update." });
  }
  values.push(id);
  try {
    const result = await zooPool.query(
      `UPDATE feeding_schedules SET ${updates.join(", ")} WHERE id = $${idx}`,
      values
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Feeding schedule not found." });
    }
    return res.status(200).json({ message: "Feeding schedule updated." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const markFeedingCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await zooPool.query(
      `UPDATE feeding_schedules 
       SET completed = TRUE, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Feeding schedule not found." });
    }
    return res.status(200).json({ message: "Feeding marked as completed." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getPendingFeedingsForToday = async (_, res) => {
  try {
    const result = await zooPool.query(
      `SELECT 
          fs.animal_name, 
          fs.feeding_time, 
          a.diet,
          fs.staff_name,
          fs.id
       FROM feeding_schedules fs
       JOIN animals a ON fs.animal_id = a.animal_id
       WHERE fs.completed = FALSE`
    );
    return res.status(200).json({ pendingFeedings: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getCompletedFeedings = async (_, res) => {
  try {
    const result = await zooPool.query(
      `SELECT 
          fs.animal_name, 
          fs.feeding_time, 
          a.diet,
          fs.staff_name,
          fs.id
       FROM feeding_schedules fs
       JOIN animals a ON fs.animal_id = a.animal_id
       WHERE fs.completed = TRUE`
    );
    return res.status(200).json({ completedFeedings: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
