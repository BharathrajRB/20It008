const express = require('express');

const router = express.Router();

const app = express();
const connectDB = require('./config/db.config');

connectDB();
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/user"));


app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello world' });
});

app.listen(9000, () => {
    console.log('Server Started');
});