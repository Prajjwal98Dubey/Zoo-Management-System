// check for the manager access
export const managerAccessMiddleware = (req, res, next) => {
  const token = req.token;
  try {
    if (token.user_role.toLowerCase() == "manager") {
      next();
    } else {
      return res.status(403).status({ message: "you don't have access" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some server error" });
  }
};
