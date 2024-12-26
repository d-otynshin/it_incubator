import { app } from './app'
import { SETTINGS } from './settings'
import { connectToDb } from './infrastructure/db';

const start = async () => {
  await connectToDb();

  app.listen(SETTINGS.PORT, async () => {
    console.log('...server started in port ' + SETTINGS.PORT)
  })
};

start().catch((error) => console.log(error));

app.set('trust proxy', true)
