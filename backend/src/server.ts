import express, { Express } from "express"
import dotenv from "dotenv"
import { weatherRouter } from "./routes/weather"

dotenv.config()

const app: Express = express()
const port = process.env.BACKEND_PORT

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Amazing weather server")
})

app.use("/weather", weatherRouter)

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Shutting down server")
  })
})