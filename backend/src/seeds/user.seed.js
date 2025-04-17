import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "priya.verma@example.com",
    fullName: "Priya Verma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    email: "ananya.singh@example.com",
    fullName: "Ananya Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    email: "isha.kapoor@example.com",
    fullName: "Isha Kapoor",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    email: "sneha.mishra@example.com",
    fullName: "Sneha Mishra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/56.jpg",
  },
  {
    email: "aisha.jain@example.com",
    fullName: "Aisha Jain",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    email: "ritu.bhatt@example.com",
    fullName: "Ritu Bhatt",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/61.jpg",
  },
  {
    email: "tanvi.desai@example.com",
    fullName: "Tanvi Desai",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    email: "neha.rastogi@example.com",
    fullName: "Neha Rastogi",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/74.jpg",
  },

  // Male Users
  {
    email: "rahul.sharma@example.com",
    fullName: "Rahul Sharma",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    email: "amit.patel@example.com",
    fullName: "Amit Patel",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    email: "arjun.mehra@example.com",
    fullName: "Arjun Mehra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    email: "vikram.nair@example.com",
    fullName: "Vikram Nair",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    email: "manish.rana@example.com",
    fullName: "Manish Rana",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/63.jpg",
  },
  {
    email: "sachin.kumar@example.com",
    fullName: "Sachin Kumar",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/74.jpg",
  },
  {
    email: "tarun.sen@example.com",
    fullName: "Tarun Sen",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/61.jpg",
  },
];


const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();