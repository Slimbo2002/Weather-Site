import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
const key = process.env.API_KEY;

app.get('/weather', async (req, res) => {
    const location = req.query.location;

    const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${encodeURIComponent(location)}`
    );

    const data = await response.json();
    res.json(data);
});
app.get('/forecast', async (req, res) => {
    const location = req.query.location;

    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${encodeURIComponent(location)}`
    );

    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});