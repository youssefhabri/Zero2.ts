import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { ALRichDisplay } from '../../utils/RichDisplay';
import * as AniList from '../../utils/anilist';

export default class ALMangaCommand extends Command {
  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string,
    options?: CommandOptions,
  ) {
    super(client, store, file, directory, {
      name: 'manga',
      aliases: ['m'],
      enabled: true,
      usage: '<manga:string>',
      description: 'Search for a manga in AniList.',
    });
  }

  // @ts-ignore
  async run(message: KlasaMessage, params: any[]) {
    const mangaList: any[] = await AniList.searchMedia(params[0], 'MANGA');

    if (mangaList.length > 0) {
      return ALRichDisplay(this, message, mangaList, this.buildEmbed);
    }
    return message.send(`No results were found for \`${params[0]}\`!`);
  }

  buildEmbed(manga: any): any {
    return {
      color: 3447003,
      title: manga.title.userPreferred,
      url: manga.siteUrl,
      description: AniList.Synopsis(manga.description),
      image: {
        url: manga.bannerImage,
      },
      thumbnail: {
        url: manga.coverImage.large,
      },
      footer: {
        text: 'Status: ' + manga.status + ' | Powered by AniList',
      },
      fields: [
        { name: 'Score', value: manga.meanScore || 'N/A', inline: true },
        { name: 'Chapters', value: manga.chapters || 'N/A', inline: true },
        {
          name: 'More info',
          value: AniList.TrackingSites(manga),
          inline: true,
        },
      ],
    };
  }
}
