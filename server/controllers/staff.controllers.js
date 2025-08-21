import { nanoid } from "nanoid";
import zooPool from "../db/connection.js";

const fieldToDbColumn = {
  staffName: "staff_name",
  phone: "phone",
  staffEmail: "staff_email",
  hiredDate: "hired_date",
  shiffTime: "shiff_time",
  staffProfession: "staff_profession",
  staffSpecialist: "staff_specialist",
};

export const addStaff = async (req, res) => {
  const {
    staffName,
    phone,
    staffEmail,
    hiredDate,
    shiffTime,
    staffProfession,
    staffSpecialist,
  } = req.body;

  if (
    !staffName ||
    !phone ||
    !staffEmail ||
    !hiredDate ||
    !shiffTime ||
    !staffProfession ||
    !staffSpecialist
  ) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const staffId = nanoid();
    await zooPool.query(
      `INSERT INTO staff (staff_id, staff_name, phone, staff_email, hired_date, shiff_time, staff_profession, staff_specialist)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        staffId,
        staffName,
        phone,
        staffEmail,
        hiredDate,
        shiffTime,
        staffProfession,
        staffSpecialist,
      ]
    );
    return res.status(201).json({ message: "Staff member added." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getAllStaff = async (_, res) => {
  try {
    const result = await zooPool.query("SELECT * FROM staff");
    return res.status(200).json({ staff: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const editStaff = async (req, res) => {
  const { staffId } = req.params;
  const allowedFields = Object.keys(fieldToDbColumn);

  const updates = [];
  const values = [];
  let idx = 1;

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates.push(`${fieldToDbColumn[field]} = $${idx}`);
      values.push(req.body[field]);
      idx++;
    }
  }

  if (updates.length === 0) {
    return res
      .status(400)
      .json({ error: "No valid fields provided for update." });
  }

  values.push(staffId);

  try {
    const result = await zooPool.query(
      `UPDATE staff SET ${updates.join(", ")} WHERE staff_id = $${idx}`,
      values
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Staff member not found." });
    }
    return res.status(200).json({ message: "Staff member updated." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
