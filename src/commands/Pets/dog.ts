import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import { MessageEmbed } from 'discord.js';
import { Colors, file_ext } from '../../utils/common';

export default class DogCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'dog',
      aliases: ['doggo', 'woof', 'poppy'],
      usage: '',
      description: 'Get a random Doggo picture/gif.',
    });
  }

  async run(message: KlasaMessage) {
    const result = await fetch('https://random.dog/woof.json');
    const media_url = (await result.json())['url'];

    console.log(media_url);

    return message.send(this.buildEmbed(media_url));
  }

  buildEmbed(media_url): MessageEmbed | string {
    const image_exts = ['jpg', 'jpeg', 'png', 'gif'];


    const ext = file_ext(media_url);
    console.log(ext, image_exts.includes(ext));
    if (image_exts.includes(ext)) {
      return new MessageEmbed().setImage(media_url).setColor(Colors.LIGHT_GREY);
    }

    return media_url;
  }
}
