import fetch from 'node-fetch';
import { Command, KlasaClient, KlasaMessage } from 'klasa';
import { random } from '../../utils/common';
import { MessageEmbed } from 'discord.js';

const selectionList = [
  'tickle', 'slap', 'poke', 'pat',
  'neko', 'meow', 'lizard', 'kiss',
  'hug', 'kemonomimi', 'feed', 'cuddle',
  'holo', 'smug', 'baka', 'woof', 'ngif',
  'fox_girl',
];

export default class NLOwO extends Command {
  constructor(client: KlasaClient, ...args) {
    // @ts-ignore
    super(client, ...args, {
      enabled: true,
      name: 'nekolife',
      aliases: ['nl', 'nlimg'],
      usage: '[nlimg:string]',
      description: 'Get gifs from nekos.life.',
      extendedHelp: 'Usage: ' + client.options.prefix + 'nl ' + '[' + selectionList.join('|') + ']',
    });
  }


  async run(message: KlasaMessage, params: any[]) {

    const selection = this.selection(params[0]);

    return fetch(`https://nekos.life/api/v2/img/${selection}`)
      .then(async res => {
        const img_url = (await res.json()).url;
        let img_title = (selection[0].toUpperCase() + selection.substr(1));
        img_title = img_title.replace('_', ' ');

        return message.sendEmbed(
          new MessageEmbed()
            .setTitle(img_title)
            .setImage(img_url)
            .setURL(img_url),
        );
      })
      .catch(reason => {
        console.log(reason);
        return message.send('Something went wrong!');
      });
  }

  selection = (input: string): string => {
    if (input && selectionList.includes(input)) {
      return input;
    }
    return selectionList[random(0, selectionList.length - 1)];
  };

}
