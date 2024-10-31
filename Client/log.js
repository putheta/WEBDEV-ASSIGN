console.log("test");

const DRONE_ID = 65010646;
const config_url = "https://webdev-assign.onrender.com/configs/65010646";
const log_url = "https://webdev-assign.onrender.com/logs";

const getconfig = async (droneID) => {
    const rawData = await fetch(config_url);
    const jsonData = await rawData.json();

    // ดึง logs
    const rawItem = await fetch("https://webdev-assign.onrender.com/logs");
    const jsonItem = await rawItem.json();  // แก้จาก jason() เป็น json()

    console.log({ jsonData });
    console.log({ jsonItem });  // ตรวจสอบข้อมูล logs

    jsonItem.sort((a, b) => new Date(b.updated) - new Date(a.updated));

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
        // แปลงเวลาเป็น GMT+7
        const createdDate = new Date(item.created);
        const formattedDate = createdDate.toLocaleString("en-US", { 
            timeZone: "Asia/Bangkok", 
            hour12: false 
        });

        logHTML += `
            <tr>
                <td>${formattedDate}</td>
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
    document.getElementById("loading").style.display = "none";
    document.getElementById("log").style.display = "block";
};

const displayWaiting = () => {
    document.getElementById("log").style.display = "none";
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
