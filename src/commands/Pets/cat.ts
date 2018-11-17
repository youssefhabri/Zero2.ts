// https://randomfox.ca/floof/
import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import { Colors } from '../../utils/common';

export default class DogCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'cat',
      aliases: ['kitten'],
      usage: '',
      description: 'Get a random Cat picture/gif.',
    });
  }

  async run(message: KlasaMessage) {
    const result = await fetch('http://aws.random.cat/meow');
    const media_url = (await result.json())['file'];

    return message.sendEmbed(new MessageEmbed().setImage(media_url).setColor(Colors.GOLD));
  }
}
