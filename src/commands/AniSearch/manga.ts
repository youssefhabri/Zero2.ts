import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { MediaRichDisplay } from '../../utils/RichDisplay';
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
      enabled: true,
      usage: '<manga:string>',
      description: 'Search for a manga in AniList.',
    });
  }

  // @ts-ignore
  async run(message: KlasaMessage, params: any[]) {
    const mangaList: any[] = (await AniList.query(
      AniList.SEARCH_ALL_MEDIA_QUERY,
      {
        search: params[0],
        type: 'ANIME',
      },
    )).Page.media;

    return MediaRichDisplay(this, message, mangaList, this.buildEmbed);
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
