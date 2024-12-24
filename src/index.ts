import { app } from './app'
import { SETTINGS } from './settings'
import { connectToDb } from './db';

app.listen(SETTINGS.PORT, async () => {
  await connectToDb("mongodb+srv://d-otynshin:BluqOihIXnR16Ujz@cluster0.nqahj.mongodb.net/blogger_platform?retryWrites=true&w=majority&appName=Cluster0")
  console.log('...server started in port ' + SETTINGS.PORT)
})

app.set('trust proxy', true)
