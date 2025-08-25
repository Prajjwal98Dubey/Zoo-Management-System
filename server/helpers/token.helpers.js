import jwt from "jsonwebtoken";
export const generateToken = (userId, userName, userEmail, userRole) => {
  return jwt.sign(
    {
      user_id: userId,
      user_email: userEmail,
      user_name: userName,
      user_role: userRole,
    },
    process.env.JWT_SECRET_KEY
  );
};
