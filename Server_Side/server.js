const express = require("express")
const app = express()
const path = require("path");
const PORT = 8000
const cors = require("cors");
app.use(cors()); 

app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', './views');

const conver = response => response.json
//แปลงข้อมูลที่รับมาจาก http ให้เป็น json
const url = "https://script.googleusercontent.com/macros/echo?user_content_key=rNFw9TAGg3jKyWpkpjSThCIOezgdmWJDZEP9m7DHLlWi_onPKOvkGyJPeQ48fPBfB1kPq9x_M1NlqU4Ec1KRdasefZIL4GHXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOQwROx_Wq-O5wsPy5w5JUsdPdcpj8TWgjjVAuN4sDTiMrnThHKU7n7LmNcslGllO5_ldGegmAJuXjfvqC1tFaecv-CYmXuM6Nz9Jw9Md8uu&lib=M9_yccKOaZVEQaYjEvK1gClQlFAuFWsxN"
const logs_url = "https://app-tracking.pockethost.io/api/collections/drone_logs/records"

app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
  
  res.send("Welcome 65010646")
})

//รับ request ผ่าน body ใน bruno 
app.post("/logs" , async (req,res) => {
  console.log("posting log data")
  console.log(req.body) //print request ที่มาจาก body ตอน input ค่าใน bruno
  const rawData = await fetch(logs_url ,{ //await คือ รอให้ fetch(คือการส่ง http request) ให้เสร็จก่อน ค่อยทำบรรทัดถัดไป
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(req.body) // body คือข้อมูลที่จะ post ส่่วนหลังคือแปลงข้อมูลจาก client ที่ตอนแรกเป็น object แปลงให้เป็น string , json เพื่อจะส่งผ่าน http ได้
  })
  res.send("OK")

})

app.get("/logs" , async (req,res) => {
  console.log("/logs");

  fetch (logs_url , {method:"GET"})
  .then(rawData => rawData.json())
  .then(jsonData => res.send(jsonData.items))

})

app.get("/configs" , async (req,res)=>{
  console.log("/configs")

  fetch (url , {method:"GET"})
  .then(rawData => rawData.json())
  .then(jsonData => res.send(jsonData.data))

})

app.get("/configs/:id" , async(req,res) => {
  console.log("wait for input id")
  const id = req.params.id
  const drone = await (await (await fetch(url,{method:"GET"})).json()).data
  const myDrone = drone.find(data => data.drone_id == id)
  console.log(myDrone)
   
  myDrone.max_speed = (myDrone.max_speed == null) ? 100 : myDrone.max_speed // เป็น null มั้ย ถ้าเป็น กำหนดให้เป็น 100 else ให้มีค่าเท่าเดิม
  myDrone.max_speed = (myDrone.max_speed > 110 ) ? 110 : myDrone.max_speed // มากกว่า 110 มั้ย ถ้าเป็น กำหนดให้เป็น 110 else ให้มีค่าเท่าเดิม
  if (!myDrone) {
    return res.status(404).send({ error: "Drone not found" }); // ส่งค่าผลลัพธ์หากไม่พบ drone
  }

  res.send(myDrone)
})

app.get("/logs/:id" , async(req,res) => {
  console.log("wait for input id")
  const id = req.params.id
  const drone = await (await (await fetch(logs_url,{method:"GET"})).json()).items
  const myDrone = drone.find(data => data.drone_id == id)
  console.log(myDrone)

  res.send(myDrone)
})

app.get("/status/:id" , async (req,res)=>{
  console.log("status-id")
  const id = req.params.id
  const drone = await (await (await fetch (url,{method:"GET"})).json()).data
  const myDrone = drone.find(data=>data.drone_id == id)
  if (myDrone) {
    res.send({condition : myDrone.condition})
  }
  else {
    res.send({condition : "not found"})
  }

  
})

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})

app.use(cors({
  origin: 'http://127.0.0.1:5500' // อนุญาตเฉพาะ origin นี้
}));