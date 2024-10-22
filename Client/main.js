console.log("test")

const DRONE_ID = 65010646;
const config_url = "https://webdev-assign.onrender.com/configs/65010646";
const log_url = "https://webdev-assign.onrender.com/logs";



const getconfig = async (droneID) => {
    const rawData = await fetch(config_url);
    const jsonData = await rawData.json();

    // แสดงข้อมูล config
    document.getElementById("loading").style.display = "none"
    document.getElementById("config").style.display = "block";
    document.getElementById("config").innerHTML =`        <h1>View Config</h-1>
        <div class="mb-3" id="config"> </div>
        <div class="result container-flex" id="result">waiting...</div>`
    document.getElementById("result").innerHTML = `
        <p>Drone ID : ${jsonData.drone_id}</p>
        <p>Drone Name : ${jsonData.drone_name}</p>
        <p>Condition : ${jsonData.condition}</p>
        <p>Light : ${jsonData.light}</p>
        <p>Max Speed : ${jsonData.max_speed}</p>
        <p>Country : ${jsonData.country}</p>
        <p>Population : ${jsonData.population}</p>
    `;

};

const displayWaiting = () => {
    document.getElementById("config").style.display = "none";
    document.getElementById("loading").innerHTML = `
    <l-waveform
      size="35"
      stroke="3.5"
      speed="1"
      color="black" 
    ></l-waveform>`;
    console.log("wait");
};

displayWaiting();
getconfig(DRONE_ID);
