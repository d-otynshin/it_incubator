import express from 'express'
import cors from 'cors'
import { SETTINGS } from './settings';
import { getVideosController } from './videos/getVideosController';

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors())

app.get('/', (_, res) => {
  res.status(200).json({version: '1.0'})
})
app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)
