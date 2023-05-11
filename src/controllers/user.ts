import { UserModel } from "@models/user";
import { checkPassword, hashPassword } from "@utils/encryption";
import { generate } from "@utils/jwt";

const generateAndSendJwt = (user, res) => {
  const regularUserObj = user.toObject();
  delete regularUserObj.password;
  const userToken = generate(regularUserObj);
  res.send({ token: userToken, ...regularUserObj });
};

export const getSignedInUser = async (req, res, next) => {
  try {
    const { user } = req;
    const userData = await UserModel.findById(user._id)
      .select("-password")
      .exec();
    if (!userData) return res.status(404).send({ message: "User not found" });
    res.send(userData);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { user } = req;
    const userData = await UserModel.findByIdAndUpdate(user._id, req.body, {
      new: true,
    }).exec();
    res.send(userData);
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { user } = req;
    const { oldPassword, newPassword } = req.body;
    // Check if old password is correct
    const userData = await UserModel.findById(user._id).exec();
    if (!checkPassword(oldPassword, userData.password))
      return res.status(401).send({ message: "Old password is not correct" });
    await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword(newPassword),
    }).exec();
    res.send();
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await UserModel.findOne({ email: body.email }).exec();
    if (!user)
      return res.status(401).send({ message: "Invalid email or password" });
    const passwordMatch = checkPassword(body.password, user.password);
    if (!passwordMatch)
      res.status(401).send({ message: "Invalid email or password" });

    generateAndSendJwt(user, res);
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    // Check if user with email exists
    const { body } = req;
    const user = await UserModel.findOne({ email: body.email }).exec();
    if (user)
      return res.status(400).send({
        message:
          "A user with that email already exists, please choose a different one",
      });
    const newUser = new UserModel({
      ...body,
      password: hashPassword(body.password),
    });
    const createdUser = await newUser.save();

    generateAndSendJwt(createdUser, res);
  } catch (err) {
    next(err);
  }
};
