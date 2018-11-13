import { KlasaMessage, Monitor } from 'klasa';

export default class FukaBotMonitor extends Monitor {
  private fukaID = '510000124949168165';
  private responses: string[] = [
    `<@${this.fukaID}>, Is that all you can do. Pff!`,
    `Oh, wow. <@${this.fukaID}>, you're actually trying!`,
    `Ehm, I too can add numbers. But, I don't wanna take <@${this.fukaID}>'s only job. You should be grateful`
  ];

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'fukaMonitor',
      enabled: true,
      ignoreBots: false,
      ignoreSelf: true,
      ignoreOthers: true,
      ignoreWebhooks: true,
      ignoreEdits: true,
      ignoreBlacklistedUsers: true,
      ignoreBlacklistedGuilds: true
    });
  }
  run(message: KlasaMessage) {
    const n = Math.floor(Math.random() * this.responses.length);
    if (message.author.id === this.fukaID) {
      return message.send(this.responses[n]);
    }
  }
}
