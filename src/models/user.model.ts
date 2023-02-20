import mongoose from "mongoose";
import bcrypt, { hashSync } from "bcrypt";
import config from "config";

export interface IUserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const user = {
  email: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
};

const userSchema = new mongoose.Schema(user, { timestamps: true });

// Pre-Save hook

userSchema.pre("save", async (next) => {
  let user = this as unknown as IUserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = hashSync(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async (
  password: string
): Promise<boolean> => {
  const user = this as unknown as IUserDocument;
  return bcrypt.compare(password, user.password).catch((error) => false);
};

const User = mongoose.model("User", userSchema);
export default User;
