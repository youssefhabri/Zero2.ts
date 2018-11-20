import { KlasaMessage, Monitor } from 'klasa';

export default class FukaBotMonitor extends Monitor {
  private timeout: number;
  private fukaID = '510000124949168165';
  private responses: string[] = [
    `<@${this.fukaID}>, Is that all you can do. Pff!`,
    `Oh, wow. <@${this.fukaID}>, you're actually trying!`,
    `Ehm, I too can add numbers. But, I don't wanna take <@${this.fukaID}>'s only job. You should be grateful.`,
  ];

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'fukaMonitor',
      enabled: false,
      ignoreBots: false,
      ignoreSelf: true,
      ignoreOthers: false,
      ignoreWebhooks: true,
      ignoreEdits: true,
      ignoreBlacklistedUsers: true,
      ignoreBlacklistedGuilds: true,
    });
    this.timeout = new Date().getTime();
  }

  async run(message: KlasaMessage) {
    const n = Math.floor(Math.random() * this.responses.length);
    if (message.author.id === this.fukaID && (this.timeout <= new Date().getTime())) {

      // Delay the command & start typing so it looks natural
      message.channel.startTyping();
      await this.delay(1500);
      message.channel.stopTyping();

      // Set a timeout for the command so it doesn't become annoying (10 minutes)
      this.timeout = new Date().getTime() + (10 * 60 * 1000);

      return message.send(this.responses[n]);
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
