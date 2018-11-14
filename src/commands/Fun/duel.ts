import { Command, KlasaMessage, KlasaUser } from 'klasa';
import { random } from '../../utils/common';
import { MessageEmbed } from 'discord.js';

export default class DuelCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'fight',
      aliases: ['duel'],
      runIn: ['text'],
      enabled: true,
      usage: '<user:user> [...]',
      usageDelim: ' ',
      description: 'Have a "100% fair" fight with other members of the server.',
    });
  }

  run(message: KlasaMessage, users: KlasaUser[]) {
    console.log(users);
    if (users.length === 1 && users[0].id === this.client.user.id) {
      return message.send('I\'m not the fighting kind');
    } else if (users.length === 1 && users[0].id === message.author.id) {
      message.send('_Stop hitting yourself!_');
      return message.sendEmbed(new MessageEmbed().setImage('https://media.giphy.com/media/bdn4mVgumSK7C/giphy.gif'));
    }

    const players = [message.author.id, ...users.map(user => user.id)];
    const winnerID = players[random(0, players.length)];
    const msg: string[] = [
      players.filter(playerID => playerID !== message.author.id).map(playerID => `<@${playerID}>`).join(', '),
      `and <@${message.author.id}> fought for ${random(2, 120)} gruesome hours!`,
      `It was a long, heated battle, but <@${winnerID}> came out victorious!`,
    ];

    return message.send(msg.join(' '));
  }
}
