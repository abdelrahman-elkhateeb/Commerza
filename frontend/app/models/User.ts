import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: "user" | "admin";
  wishlist: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: false,
    minlength: [8, "password must be more than 8 characters"],
    select: false
  },
  image: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  // wishlist: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Product',
  //   },
  // ],

},
  {
    timestamps: true,
  })

const User = models.User || model<IUser>("User", UserSchema);

export default User;