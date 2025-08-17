'use strict'

require('dotenv').config({ path: '../.env' })
const Express = require('express')
const CORS = require('cors')

const WeatherAPIKey = process.env.WEATHER_API_KEY
const ServerPort = process.env.SERVER_PORT
const ServerHost = process.env.SERVER_HOST

const App = Express()
App.use(Express.json())
App.use(CORS())

App.get('/api/weather/key', async (req, res) => {
  try {
    return res
      .status(200)
      .json({ isFine: true, message: 'Your API key is ready.', key: WeatherAPIKey })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ isFine: false, message: 'Something went wrong at the server.' })
  }
})

App.listen(ServerPort, () => {
  console.log(`Server is running on URL http://${ServerHost}:${ServerPort}`)
})
