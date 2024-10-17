console.log("test")

const DRONE_ID = 65010646;
const config_url = "https://webdev-assign.onrender.com/configs/65010646";
const log_url = "https://webdev-assign.onrender.com/logs";

// เพิ่มฟังก์ชันสำหรับการส่งข้อมูลเมื่อมีการ submit
document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const tempValue = document.querySelector('input[name="temp"]').value;
    const unitValue = document.querySelector('input[name="unit"]').value;
    const currentDate = new Date().toISOString();

    // Prepare the data payload
    const data = {
        "celsius": tempValue,
        "collectionId": "ra4yr307291j38v",  // Assuming this stays the same
        "collectionName": "drone_logs",
        "country": "Thailand",
        "created": currentDate,  // Use the current date for creation
        "drone_id": DRONE_ID,   // This should be your drone ID
        "drone_name": "Punyaruethai",  // Your drone name
        "updated": currentDate   // Also update this with the current time
    };

    try {
        // Perform the POST request
        const response = await fetch("https://app-tracking.pockethost.io/api/collections/drone_logs/records", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)  // Stringify the payload for the request
        });

        if (!response.ok) {
            // If response is not OK, log the error
            const errorDetails = await response.text();
            console.error('Error details:', errorDetails);
            throw new Error('Network response was not ok');
        }

        const result = await response.json();  // Parse the JSON response
        console.log("Submission successful:", result);  // Log the successful result
        console.log("Submitted at:", currentDate);
        location.reload(); 

    } catch (error) {
        console.error('Error during POST request:', error);  // Log any errors
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

    jsonItem.sort((a, b) => new Date(b.updated) - new Date(a.updated));

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
