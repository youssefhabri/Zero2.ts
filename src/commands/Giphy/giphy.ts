import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import { ALRichDisplay } from '../../utils/RichDisplay';

export default class extends Command {
  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string,
    options?: CommandOptions,
  ) {
    super(client, store, file, directory, {
      name: 'gif',
      enabled: true,
      usage: '<gif:string>',
      description: 'Search for a GIF in Giphy',
    });
  }

  // @ts-ignore
  async run(message: KlasaMessage, params: any[]) {
    const gifs_list: any[] = await this.request(params[0]);

    if (gifs_list.length > 0) {
      return ALRichDisplay(this, message, gifs_list, this.buildEmbed, 'Powered by Giphy');
    }
    return message.send(`No results were found for \`${params[0]}\`!`);
  }

  async request(query: string) {
    const api_key = process.env.GIPHY_API_KEY;
    const res = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key}&fmt=json`,
      {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return (await res.json()).data;
  }

  buildEmbed(image: any): any {
    return {
      color: 3447003,
      title: image.title,
      url: image.url,
      image: {
        url: image.images.original.url,
      },
      footer: {
        text: 'Powered by Giphy',
      },
    };
  }
}
