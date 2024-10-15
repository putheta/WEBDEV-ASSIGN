console.log("test")

const DRONE_ID = 65010646
const config_url = "http://127.0.0.1:8000/configs/65010646"
const log_url = "https://app-tracking.pockethost.io/api/collections/drone_logs/records" 



const getconfig = async (droneID) => {
    const rawData = await fetch(config_url);
    const jsonData = await rawData.json();

    // ดึง logs
    const rawItem = await fetch("http://127.0.0.1:8000/logs");
    const jsonItem = await rawItem.json();  // แก้จาก jason() เป็น json()

    console.log({ jsonData });
    console.log({ jsonItem });  // ตรวจสอบข้อมูล logs

    // แสดงข้อมูล config
    document.getElementById("config").innerHTML = '';
    document.getElementById("form").innerHTML = `
        <label class="mt-3" for="temp">Input temp</label>
        <input class="fs-sm form-control rounded border" name="temp" type="text" placeholder="input temp" value="25">
        <label class="mt-3" for="unit">unit</label>
        <input class="fs-sm form-control rounded border" name="unit" type="text" placeholder="input temp" value="C">
        <button class="button mt-3 btn btn-sm btn-primary" type="submit">submit</button>
    `;

    // แสดงข้อมูล drone config
    document.getElementById("log").innerHTML = '';
    document.getElementById("result").innerHTML = `
        <p>Drone ID : ${jsonData.drone_id}</p>
        <p>Drone Name : ${jsonData.drone_name}</p>
        <p>Condition : ${jsonData.condition}</p>
        <p>Light : ${jsonData.light}</p>
        <p>Max Speed : ${jsonData.max_speed}</p>
        <p>Country : ${jsonData.country}</p>
        <p>Population : ${jsonData.population}</p>
    `;

    let logHTML = `
    <table cellspacing="0" cellpadding="10">
        <thead style="background-color: rgba(144, 165, 180, 0.336);">
            <tr>
                <th>Created</th>
                <th>Drone ID</th>
                <th>Drone Name</th>
                <th>Celsius</th>
                <th>Country</th>
            </tr>
        </thead>
        <tbody>
`;

jsonItem.forEach((item) => {
    logHTML += `
        <tr>
            <td>${item.created}</td>
            <td>${item.drone_id}</td>
            <td>${item.drone_name}</td>
            <td>${item.celsius}</td>
            <td>${item.country}</td>
        </tr>
    `;
});

logHTML += `
        </tbody>
    </table>
`;

document.getElementById("result_log").innerHTML = logHTML;

};

const displayWaiting = () => {
    const html = `<p>Drone ID : ${DRONE_ID}</p>`
    document.getElementById("config").innerHTML = html
    document.getElementById("log").innerHTML = html
    document.getElementById("form").innerHTML = `
<l-waveform
  size="35"
  stroke="3.5"
  speed="1"
  color="black" 
></l-waveform>`
    console.log("wait")
}

displayWaiting()
getconfig(DRONE_ID)