const SAFE_LAT = 12.9716;
const SAFE_LON = 77.5946;
const LIMIT = 0.05;

function send(lat, lon, type){
fetch("/alert",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({lat,lon,type})
})
.then(r=>r.json())
.then(d=>{
document.getElementById("status").innerText =
d.message + " | " + d.risk;
});
}

function manualAlert(){
navigator.geolocation.getCurrentPosition(p=>{
send(p.coords.latitude,p.coords.longitude,"emergency");
});
}

function healthAlert(){
navigator.geolocation.getCurrentPosition(p=>{
send(p.coords.latitude,p.coords.longitude,"health");
});
}

function safetyAlert(){
navigator.geolocation.getCurrentPosition(p=>{
send(p.coords.latitude,p.coords.longitude,"safety");
});
}

function startTracking(){
navigator.geolocation.watchPosition(p=>{
let lat=p.coords.latitude;
let lon=p.coords.longitude;

let dist=Math.abs(lat-SAFE_LAT)+Math.abs(lon-SAFE_LON);

if(dist>LIMIT){
send(lat,lon,"geo");
}
});
}