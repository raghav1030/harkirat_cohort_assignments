const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("your-mongodb-url");

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  // id : String,
  username: {
    String,
    required: true,
  },

  password: {
    String,
    required: true,
  },

  coursesCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  // id: String,
  username: {
    String,
    required: true,
  },
  password: {
    String,
    required: true,
  },
  coursesPurchased: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  id : Number,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    Number,
    required: true,
  },
  imageLink: {
    type : String
  },
  enrolledUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  courseAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
