import express, { Express } from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = process.env.BACKEND_PORT

app.get("/", (req, res) => {
  res.send("Amazing weather server")
})

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Shutting down server")
  })
})