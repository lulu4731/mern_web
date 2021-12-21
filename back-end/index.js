const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./src/config/mongoose/index")
const route = require("./src/routes")
const PORT = 5000

db.connect()

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())
app.use(cors())
route(app)

app.listen(PORT, () => {
    console.log(`Start website http://localhost:${PORT}`)
})
