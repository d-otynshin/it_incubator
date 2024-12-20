import { app } from './app'
import { SETTINGS } from './settings'
import { connectToDB } from './db/monogo-db';

app.listen(SETTINGS.PORT, async () => {
  await connectToDB()
  console.log('...server started in port ' + SETTINGS.PORT)
})

app.set('trust proxy', true)
