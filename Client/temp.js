const DRONE_ID = 65010646;
const config_url = "https://webdev-assign.onrender.com/configs/65010646";
const log_url = "https://webdev-assign.onrender.com/logs";

// เพิ่มฟังก์ชันสำหรับการส่งข้อมูลเมื่อมีการ submit
document.getElementById('form').addEventListener('submit', async function(event) {
    console.log("testtt");
    event.preventDefault(); // ป้องกันการ submit แบบปกติ

    // ดึงค่าจาก input
    const tempValue = document.querySelector('input[name="temp"]').value;
    const unitValue = document.querySelector('input[name="unit"]').value;
    const currentDate = new Date().toISOString();

    // เตรียมข้อมูลสำหรับ payload
    const data = {
        "celsius": tempValue,
        "collectionId": "ra4yr307291j38v",
        "collectionName": "drone_logs",
        "country": "Thailand",
        "created": currentDate,
        "drone_id": DRONE_ID,
        "drone_name": "Punyaruethai",
        "updated": currentDate
    };

    try {
        // ทำการ POST request
        const response = await fetch("https://app-tracking.pockethost.io/api/collections/drone_logs/records", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // ถ้าคำตอบไม่โอเค ให้ log รายละเอียดข้อผิดพลาด
            const errorDetails = await response.text();
            console.error('Error details:', errorDetails);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();  // แปลงคำตอบ JSON
        console.log("Submission successful:", result);  // Log คำตอบเมื่อสำเร็จ
        console.log("Submitted at:", currentDate);
        location.reload(); 

    } catch (error) {
        console.error('Error during POST request:', error);  // Log ข้อผิดพลาด
    }
});

// ฟังก์ชันสำหรับโหลด config
const getconfig = async (droneID) => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("form").innerHTML = `
        <label class="mt-3" for="temp">Input temp</label>
        <input class="fs-sm form-control rounded border" name="temp" type="text" placeholder="input temp" value="25">
        <label class="mt-3" for="unit">unit</label>
        <input class="fs-sm form-control rounded border" name="unit" type="text" placeholder="input temp" value="C">
        <button class="button mt-3 btn btn-sm btn-primary" type="submit">submit</button>
    `;
};

// ฟังก์ชันแสดงการรอโหลดข้อมูล
const displayWaiting = () => {
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
