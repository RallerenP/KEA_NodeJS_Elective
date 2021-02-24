const express = require('express');
const PORT = 3000;

const app = express();

app.get('/time', (req, res) => {
    const time = new Date().toTimeString();
    res.status(200).json(time);
});

app.get('/date', (req, res) => {
    const date = new Date().getDate();
    res.status(200).json(date);
})

app.get('/month', (req, res) => {
    const month = new Date().getMonth();
    console.log(month);
    res.status(200).json(month + 1); // Month is 0-indexed
})

app.listen(PORT, () => {
    console.log(`Listening on ${3000}...`);
})