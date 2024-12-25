import { app } from './app'
import { SETTINGS } from './settings'
// import { connectToDb } from './db';

app.listen(SETTINGS.PORT, async () => {
  // await connectToDb()
  console.log('...server started in port ' + SETTINGS.PORT)
})

app.set('trust proxy', true)
