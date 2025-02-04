if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: `${process.env.SIBERIAN_HOME}/.env` ?? undefined,
  })
}

import 'reflect-metadata'
import { client } from './lib/discord'
import { connectMySQL } from './lib/connect-mysql'
import { EtcModule, MailStaff, MailUser } from './modules'

for (const stage of [MailStaff, MailUser, EtcModule]) {
  client.registerStage(stage)
}

connectMySQL()
  .then(() => {
    client.login(process.env.DISCORD_TOKEN)
    client.on('ready', () => {
      client.logger.info(`Logged in as ${client.user?.tag}`)
    })
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
