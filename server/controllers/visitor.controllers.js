import { nanoid } from "nanoid";
import zooPool from "../db/connection.js";

export const addTicket = async (req, res) => {
  const { ticketCount } = req.body;
  if (!ticketCount || typeof ticketCount != "number")
    return res.status(401).json({ error: "Invalid input" });
  try {
    const visitorId = nanoid();
    await zooPool.query(
      "INSERT INTO VISITORS (id,number_of_tickets) VALUES ($1,$2)",
      [visitorId, ticketCount]
    );
    return res.status(201).json({ message: "ticket generate success." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "some server error." });
  }
};

export const getTodayAndYesterdayVisitors = async (_, res) => {
  try {
    const todayResult = await zooPool.query(
      `SELECT COALESCE(SUM(number_of_tickets), 0) AS count
       FROM visitors
       WHERE created_at::date = CURRENT_DATE`
    );

    const yesterdayResult = await zooPool.query(
      `SELECT COALESCE(SUM(number_of_tickets), 0) AS count
       FROM visitors
       WHERE created_at::date = CURRENT_DATE - INTERVAL '1 day'`
    );

    return res.status(200).json({
      presentDayCount: parseInt(todayResult.rows[0].count, 10),
      previousDayCount: parseInt(yesterdayResult.rows[0].count, 10),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};
