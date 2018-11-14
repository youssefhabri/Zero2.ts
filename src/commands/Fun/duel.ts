import { Command, KlasaMessage, KlasaUser } from 'klasa';
import { random } from '../../utils/common';
import { MessageEmbed } from 'discord.js';

export default class DuelCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'duel',
      enabled: true,
      usage: '<user:user>',
    });
  }

  run(message: KlasaMessage, users: KlasaUser[]) {
    const user = users[0];
    if (user.id === this.client.user.id) {
      return message.send('I\'m not the fighting kind');
    } else if (user.id === message.author.id) {
      message.send('_Stop hitting yourself!_');
      return message.sendEmbed(new MessageEmbed().setImage('https://media.giphy.com/media/bdn4mVgumSK7C/giphy.gif'));
    }

    const winnerID = [user.id, message.author.id][random(0, 2)];

    const msg: string[] = [
      `<@${message.author.id}> and <@${user.id}> dueled for ${random(2, 120)} gruesome hours!`,
      `It was a long, heated battle, but <@${winnerID}> came out victorious!`,
    ];

    return message.send(msg.join(' '));
  }
}
