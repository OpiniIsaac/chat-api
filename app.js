const express = require('express');
const app = express();
const userRoute = require('./src/routes/User');
const benefitRoute = require('./src/routes/Benefit')

const chatMessageRoute = require('./src/routes/chat')
const config = require('./src/config/database');
const port = 4000;
const mongoose = require("mongoose");

// Use express.json() for parsing JSON bodies
app.use(express.json());

app.use('/api/v1/users', userRoute);
app.use('/api/v1/benefits', benefitRoute);
app.use('/api/v1/chat/', chatMessageRoute);
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
