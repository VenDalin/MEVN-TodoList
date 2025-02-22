import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import route from './routes/todoRoute.js';

dotenv.config();
const app = express();
app.use(express.json());

// const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.error("Blocked by CORS:", origin); // Debugging
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,  // Allow credentials (cookies, authorization headers)
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Apply CORS middleware
app.use(cors());

// ✅ Handle Preflight Requests Manually
app.options("*", cors()); 

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use('/api/todo', route);

//connect to MongoDB
mongoose.connect(MONGO_URI).then(() =>{
    console.log('MongoDB Connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => console.log(error.message));
