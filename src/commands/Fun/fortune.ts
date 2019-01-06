import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import { GuildMember, MessageEmbed } from 'discord.js';
import { random } from '../../utils/common';

export default class FortuneCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'fortune',
      enabled: true,
      usage: '',
      description: 'Find out you fortune. It just might be you lucky day ...',
    });
  }

  async run(message: KlasaMessage) {
    const fortunesList: any[] = await this.getFortunes();

    const n = random(0, fortunesList.length);
    const fortune = fortunesList[n]['message'];

    const user: GuildMember = await message.guild.members.fetch(message.author);

    const msgEmbed = new MessageEmbed();
    msgEmbed.setColor(user.displayColor);
    msgEmbed.addField(`${user.displayName}'s Fortune!`, fortune);

    return message.sendEmbed(msgEmbed);
  }

  getFortunes = async (): Promise<any[]> => {
    const page = random(1, 6);
    const request = await fetch(`http://fortunecookieapi.herokuapp.com/v1/fortunes?limit=&skip=&page=${page}`);

    return request.json();
  };
}
