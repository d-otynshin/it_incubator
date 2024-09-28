import { app } from '../src/app'
import { SETTINGS } from '../src/settings'

app.listen(SETTINGS.PORT, () => {
  console.log('...server started in port ' + SETTINGS.PORT)
})
