import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "UnAuthorized access" });
    }
    const decoded_token = await jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded_token;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
