const express = require("express");
const dotenv = require("dotenv")

const app = express();

app.get("/",(req,res)=>{
  res.send("Go to the homepage");
})


app.listen(3000,()=>{
  console.log("http://localhost:3000")
})
// const dotenv = require("dotenv");
// dotenv.config(); // Load .env variables

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const multer = require('multer');

// // Import routes
// const userRoutes = require('./router/user.routes');
// const uploadRoutes = require('./router/upload.routes');

// const app = express();
// const PORT = process.env.PORT || 5001;
// // 
// // Middleware
// app.use(cors());
// app.use(express.json());

// // Multer config (for file upload handling)
// const storage = multer.memoryStorage(); // Store uploaded files in memory
// const upload = multer({ storage });

// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // ✅ API Routes
// app.use('/api/user', userRoutes); // <-- fixed this: was /api/users
// app.use('/api/upload', uploadRoutes(upload)); // pass multer instance

// // Test route
// app.get('/', (req, res) => {
//   res.send('TRAE AI Backend API');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`TRAE AI backend running on http://localhost:${PORT}`);
// });
