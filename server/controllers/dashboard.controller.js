import zooPool from "../db/connection.js";

export const getDashboardStats = async (req, res) => {
  try {
    const animalCountResult = await zooPool.query(
      `SELECT COUNT(*) AS total, 
              SUM(CASE WHEN health_status = 'excellent' THEN 1 ELSE 0 END) AS healthy
         FROM animals`
    );
    const animalCount = parseInt(animalCountResult.rows[0].total, 10);
    const health = parseInt(animalCountResult.rows[0].healthy, 10);

    const staffCountResult = await zooPool.query(
      `SELECT COUNT(*) AS count FROM staff`
    );
    const staffCount = parseInt(staffCountResult.rows[0].count, 10);

    const feedingResult = await zooPool.query(
      `SELECT 
          SUM(CASE WHEN completed = TRUE THEN 1 ELSE 0 END) AS completed,
          SUM(CASE WHEN completed = FALSE THEN 1 ELSE 0 END) AS pending
       FROM feeding_schedules
       WHERE feeding_time::date = CURRENT_DATE`
    );
    const completed = parseInt(feedingResult.rows[0].completed, 10) || 0;
    const pending = parseInt(feedingResult.rows[0].pending, 10) || 0;

    // 4. Visitors today and yesterday
    const presentDayVisitorResult = await zooPool.query(
      `SELECT COALESCE(SUM(number_of_tickets), 0) AS count
       FROM visitors
       WHERE created_at::date = CURRENT_DATE`
    );
    const previousDayVisitorResult = await zooPool.query(
      `SELECT COALESCE(SUM(number_of_tickets), 0) AS count
       FROM visitors
       WHERE created_at::date = CURRENT_DATE - INTERVAL '1 day'`
    );
    const presentDayVisitor = parseInt(presentDayVisitorResult.rows[0].count, 10);
    const previousDayVisitors = parseInt(previousDayVisitorResult.rows[0].count, 10);

    return res.status(200).json({
      animal: { animalCount, health },
      staff: { staffCount },
      feedings: { completed, pending },
      visitors: { presentDayVisitor, previousDayVisitors }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};