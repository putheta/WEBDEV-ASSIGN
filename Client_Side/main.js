console.log("test")

const DRONE_ID = 65010646
const config_url = "http://127.0.0.1:8000/configs/65010646"
const log_url = "https://app-tracking.pockethost.io/api/collections/drone_logs/records" 

const getconfig = async (droneID) => {
    const rawData = await fetch(config_url)
    const jsonData = await rawData.json()

    console.log({jsonData})
    document.getElementById("config").innerHTML = ''
    document.getElementById("result").innerHTML =
        `
            <p>Drone ID : ${jsonData.drone_id}</p>
            <p>Drone Name : ${jsonData.drone_name}</p>
            <p>Condition : ${jsonData.condition}</p>
            <p>Light : ${jsonData.light}</p>
            <p>Max Speed : ${jsonData.max_speed}</p>
            <p>Country : ${jsonData.country}</p>
            <p>Population : ${jsonData.population}</p>
        `
}

const displayWaiting = () => {
    const html = `<p>Drone ID : ${DRONE_ID}</p>`
    document.getElementById("config").innerHTML = html
    console.log("wait")
}

displayWaiting()
getconfig(DRONE_ID)