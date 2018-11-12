import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';
import { MediaRichDisplay } from '../../utils/RichDisplay';

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
      description: 'Search for g GIF in Giphy',
    });
  }

  // @ts-ignore
  async run(message: KlasaMessage, params: any[]) {
    let gifs_list = await this.request(params[0]);

    return MediaRichDisplay(message, gifs_list, this.buildEmbed, 'Powered by Giphy');
  }

  async request(query: string) {
    const token = process.env.GIPHY_TOKEN;
    let res = await fetch(
      `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${token}&fmt=json`,
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
