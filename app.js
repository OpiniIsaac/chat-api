const express = require('express');
const app = express();
const userRoute = require('./src/routes/User');
const benefitRoute = require('./src/routes/Benefit')
const authRoutes = require("./src/routes/auth")
const cors = require("cors");
const chatMessageRoute = require('./src/routes/chat')
const config = require('./src/config/database');
const port = 4000;
const mongoose = require("mongoose");

app.use(cors());
// Use express.json() for parsing JSON bodies
app.use(express.json());

  
app.use('/api/v1/users', userRoute);
app.use('/api/v1/benefits', benefitRoute);
app.use('/api/v1/chat', chatMessageRoute);
app.use('/api/v1/auth',authRoutes)
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("connected to db");
});

db.on("error", (err) => {
    console.error(err);
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});
