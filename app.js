const express = require('express')

const {open} = require('sqlite')

const sqlite3 = require('sqlite3')

const path = require('path')

const app = express()

const dbPath = path.join(__dirname, 'cricketTeam.db')

const db = null

const initializeDBAndServer = async () => {
  try {
    const db = await open({filename: dbPath, driver: sqlite3.Database})
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/players/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

//GET List Of Player API
app.get('/players/', async (request, respose) => {
  const getListOfPlayersQuery = `
    SELECT *
    FROM cricket_team;
   `

  const playersList = await db.all(getListOfPlayersQuery)

  const playersArray = playersList => {
    return {
      playerId: playersList.player_id,
      playerName: playersList.player_name,
      jerseyNumber: playersList.jersey_number,
      role: playersList.role,
    }
  }
  response.send(playersList.map((eachPlayer)=>playersArray(eachPlayer)));
})
