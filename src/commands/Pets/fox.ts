// https://randomfox.ca/floof/
import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import { Colors } from '../../utils/common';

export default class DogCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'fox',
      aliases: ['floof'],
      usage: '',
      description: 'Get a random Fox picture/gif.',
    });
  }

  async run(message: KlasaMessage) {
    const result = await fetch('https://randomfox.ca/floof/');
    const media_url = (await result.json())['image'];

    return message.sendEmbed(new MessageEmbed().setImage(media_url).setColor(Colors.ORANGE));
  }
}
