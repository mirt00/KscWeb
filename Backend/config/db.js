// backend/config/db.js
import mongoose from "mongoose";
import 'colors'; // Import colors package to enable .red, .green, etc.

const connectDB = async () => {
  try {
    // Mongoose no longer requires useNewUrlParser or useUnifiedTopology in v6+
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.red.bold);
    process.exit(1); // Exit process with failure
  }
};

// Event listeners for mongoose connection
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB".green);
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err.message}`.red);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected".yellow);
});

// Handle app termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to app termination".magenta);
  process.exit(0);
});

export default connectDB;
