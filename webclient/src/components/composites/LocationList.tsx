import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export const LocationList = () => {
  const [locations, setLocations] = useState<string[]>([])

  useEffect(() => {
    const socket = io("ws://localhost:3456")

    socket.on("connection", () => console.log("connected to backend socket"))

    socket.on("location-added", newLocation => {
      setLocations([...locations, newLocation])
    })
  })
  

  return (
    <div className="container m-3">

      {!!locations.length && locations.map(location => (<div>{location}</div>))}
    </div>
  )
}