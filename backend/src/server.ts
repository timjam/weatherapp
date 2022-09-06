import express, { Express } from "express"
import dotenv from "dotenv"
import { weatherRouter } from "./api/weather"
import http from "http"
import socketIO, { Socket } from "socket.io"

dotenv.config()

const port = process.env.BACKEND_PORT

const app: Express = express()

// Socket
const server = http.createServer(app)
export const io = new socketIO.Server(server, {
  transports: ["polling"],
  cors: {
    origin: `http://localhost:${port}`
  }
})

io.on("connection", (socket: Socket) => {
  socket.on("message", (message) => {
    console.log(`Message from ${socket.id}: ${message}`)
  })
})

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Amazing weather server")
})

app.use("/weather", weatherRouter)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Shutting down server")
  })
})