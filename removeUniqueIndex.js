// require('dotenv').config();
// const mongoose = require('mongoose');
// const Card = require("./cards/models/mongodb/Card");

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('Connected to MongoDB');
//     // עדכן את שם האינדקס בהתאם לשם שמצאת בבדיקת האינדקסים
//     await Card.collection.dropIndex('email_1'); 
//     console.log('Removed unique index from email field in cards collection');
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB or remove index', err);
//   });
