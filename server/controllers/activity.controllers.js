import { nanoid } from "nanoid";
import zooPool from "../db/connection.js";

export const getAllRecentActivities = async (_, res) => {
  try {
    const result = await zooPool.query("SELECT * FROM RECENT_ACTIVITY");
    result.rows.sort(
      (a, b) =>
        parseInt(new Date(b.created_at).getTime()) -
        parseInt(new Date(a.created_at).getTime())
    );
    return res.status(200).json({ result: result.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some server error occured !!!" });
  }
};

export const addActivity = async (req, res) => {
  const { note } = req.body;
  if (!note || typeof note !== "string")
    return res.status(400).json({ error: "invalid data." });
  try {
    const id = nanoid();
    await zooPool.query(
      "INSERT INTO RECENT_ACTIVITY (id,note) VALUES ($1,$2)",
      [id, note]
    );
    return res.status(201).json({
      message: "activity added.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some server error !!!" });
  }
};
