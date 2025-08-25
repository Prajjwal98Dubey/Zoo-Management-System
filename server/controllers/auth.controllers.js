import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/token.helpers.js";
import zooPool from "../db/connection.js";

export const registerUser = async (req, res) => {
  const { userName, userEmail, userPassword, userRole } = req.body;
  if (
    !userName ||
    typeof userName !== "string" ||
    !userEmail ||
    typeof userEmail !== "string" ||
    !userPassword ||
    typeof userPassword !== "string" ||
    !userRole ||
    typeof userRole !== "string"
  ) {
    return res.status(400).json({ error: "Missing or invalid fields." });
  }
  try {
    const existing = await zooPool.query(
      "SELECT user_id FROM users WHERE user_email = $1 OR user_name = $2",
      [userEmail, userName]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: "User already exists." });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const user_id = nanoid();
    const refreshToken = generateToken(user_id, userName, userEmail, userRole);
    await zooPool.query(
      `INSERT INTO users (user_id, user_name, user_email, user_password, user_role, user_refresh_token)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        user_id,
        userName,
        userEmail,
        hashedPassword,
        userRole || "other",
        refreshToken,
      ]
    );
    const accessToken = generateToken(user_id, userName, userEmail, userRole);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    return res.status(201).json({
      userId: user_id,
      userName,
      userEmail,
      userRole: userRole || "other",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const loginUser = async (req, res) => {
  const { userCred, userPassword } = req.body;
  if (
    !userCred ||
    typeof userCred !== "string" ||
    !userPassword ||
    typeof userPassword !== "string"
  ) {
    return res.status(400).json({ error: "Missing or invalid fields." });
  }
  try {
    const userResult = await zooPool.query(
      "SELECT user_id, user_name, user_email, user_password, user_role FROM users WHERE user_email = $1 or user_name = $1",
      [userCred]
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(userPassword, user.user_password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const accessToken = generateToken(
      user.user_id,
      user.user_name,
      user.user_email,
      user.user_role
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      userId: user.user_id,
      userName: user.user_name,
      userEmail: user.user_email,
      userRole: user.user_role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getUserDetails = async (req, res) => {
  const userId = req.userId;
  try {
    const userDetails = await zooPool.query(
      "SELECT USER_EMAIL,USER_NAME,USER_ROLE FROM USERS WHERE USER_ID = $1",
      [userId]
    );
    if (userDetails.rowCount == 0)
      return res.status(400).json({ message: "user does not exists..." });
    return res.status(200).json({
      userName: userDetails.rows[0].user_name,
      userEmail: userDetails.rows[0].user_email,
      userRole: userDetails.rows[0].user_role,
      userId: userId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some server error..." });
  }
};

export const logoutUser = async (_, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    return res.status(200).json({ message: "user logout success." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some server error" });
  }
};
