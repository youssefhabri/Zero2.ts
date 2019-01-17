import fetch from 'node-fetch';
import { Command, KlasaClient, KlasaMessage, KlasaUser } from 'klasa';
import { random } from '../../utils/common';
import { MessageEmbed } from 'discord.js';

const typeList = [
  'tickle', 'slap', 'poke', 'pat',
  'neko', 'meow', 'lizard', 'kiss',
  'hug', 'kemonomimi', 'feed', 'cuddle',
  'holo', 'smug', 'baka', 'woof', 'fox_girl',
];

const nsfwList = [
  'ngif',
];

export default class NLImg extends Command {
  constructor(client: KlasaClient, ...args) {
    // @ts-ignore
    super(client, ...args, {
      enabled: true,
      name: 'nekolife',
      aliases: ['nl', 'nlimg'],
      usage: '[input:string]',
      useDelim: ' ',
      description: 'Get gifs from nekos.life.',
      extendedHelp: 'Usage: ' + client.options.prefix + 'nl ' + '[' + typeList.join('|') + ']',
    });
  }


  async run(message: KlasaMessage, params: any[]) {

    const args: any[] = params.length > 0 ? params[0].split(' ') : [];
    const type: string = args.length > 0 ? args[0] : '';
    const user: KlasaUser = args.length > 1 ? args[1] : undefined;
    // @ts-ignore
    const selection = this.selection(type, message.channel.nsfw || false);

    return fetch(`https://nekos.life/api/v2/img/${selection}`)
      .then(async res => {
        const img_url = (await res.json()).url;
        let img_title = (selection[0].toUpperCase() + selection.substr(1));
        img_title = img_title.replace('_', ' ');

        const messageEmbed = new MessageEmbed().setImage(img_url);

        const messages: any[] = [];

        if (user !== undefined) {
          message.delete();
          messages.push(message.send(`${user}: ${message.author} sent you a ${img_title}!`));
        } else {
          messageEmbed.setTitle(img_title).setURL(img_url);
        }

        messages.push(
          message.sendEmbed(messageEmbed),
        );

        return messages;
      })
      .catch(reason => {
        console.log(reason);
        return message.send('Something went wrong!');
      });
  }

  selection = (input: string, nsfw: boolean = false): string => {
    if (nsfw) typeList.push(...nsfwList);

    if (input && typeList.includes(input)) {
      return input;
    }
    return typeList[random(0, typeList.length - 1)];
  };

}
