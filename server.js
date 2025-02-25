
const express = require('express');
const dotenv = require('dotenv');	
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoute = require('./routes/todoRoute');


dotenv.config();
const app = express();
app.use(express.json());
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
  })
);

app.use(cors());

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use('/api', todoRoute);

//connect to MongoDB
mongoose.connect(MONGO_URI).then(() =>{
    console.log('MongoDB Connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => console.log(error.message));
