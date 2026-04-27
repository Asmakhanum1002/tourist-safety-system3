const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let alerts = [];

// ALERT API
app.post("/alert", (req, res) => {
    const { lat, lon, type } = req.body;

    const SAFE_LAT = 12.9716;
    const SAFE_LON = 77.5946;

    let dist = Math.abs(lat - SAFE_LAT) + Math.abs(lon - SAFE_LON);

    let risk = "LOW";
    if (dist > 0.08) risk = "HIGH";
    else if (dist > 0.04) risk = "MEDIUM";

    let msg = "Alert Sent";

    if(type === "health") msg = "🚑 Ambulance Notified!";
    else if(type === "safety") msg = "🚓 Police Notified!";
    else if(type === "geo") msg = "⚠️ Geo-Fence Breach!";

    const alert = {
        user: "tourist",
        lat,
        lon,
        risk,
        type,
        time: new Date().toLocaleString()
    };

    alerts.push(alert);
    console.log(alert);

    res.json({ message: msg, risk });
});

// GET ALERTS
app.get("/alerts", (req, res) => {
    res.json(alerts);
});

// START SERVER
app.listen(5500, () => {
    console.log("http://localhost:5500/login.html");
});