console.log("test")

const DRONE_ID = 65010646;
const config_url = "https://webdev-assign.onrender.com/configs/65010646";
const log_url = "https://app-tracking.pockethost.io/api/collections/drone_logs/records";

// เพิ่มฟังก์ชันสำหรับการส่งข้อมูลเมื่อมีการ submit
document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ

    // ดึงค่าจาก input
    const tempValue = document.querySelector('input[name="temp"]').value;
    const unitValue = document.querySelector('input[name="unit"]').value;

    // สร้าง payload ที่จะส่งไปยังเซิร์ฟเวอร์
    const data = {
        "drone_id": DRONE_ID,
        "drone_name": "Deliberate Drive",
        "condition": "bad",
        "light": "on",
        "max_speed": 45,
        "country": "Brazil",
        "population": 211998573,
        "temp": tempValue,
        "unit": unitValue
    };

    try {
        const response = await fetch(log_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // อัปเดตการแสดงผลหลังจากการส่งข้อมูลสำเร็จ
        document.getElementById('result_log').innerHTML = `<p>Log Submitted: ${JSON.stringify(result)}</p>`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result_log').innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

const getconfig = async (droneID) => {
    const rawData = await fetch(config_url);
    const jsonData = await rawData.json();

    // ดึง logs
    const rawItem = await fetch("https://webdev-assign.onrender.com/logs");
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
    const html = `<p>Drone ID : ${DRONE_ID}</p>`;
    document.getElementById("config").innerHTML = html;
    document.getElementById("log").innerHTML = html;
    document.getElementById("form").innerHTML = `
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
