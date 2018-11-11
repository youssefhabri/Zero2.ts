import {
  Command,
  KlasaClient,
  CommandStore,
  CommandOptions,
  KlasaMessage,
} from 'klasa';
import * as AniList from '../../utils/anilist';
import { MediaRichDisplay } from '../../utils/RichDisplay';

export default class ALAnimeCommand extends Command {
  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string,
    options?: CommandOptions,
  ) {
    super(client, store, file, directory, {
      name: 'anime',
      enabled: true,
      usage: '<anime:string>',
      description: 'Search for an anime in AniList.',
    });
  }

  // @ts-ignore
  async run(msg: KlasaMessage, params: any[]) {
    var animeList: any[] = (await AniList.query(
      AniList.SEARCH_ALL_MEDIA_QUERY,
      {
        search: params[0],
        type: 'ANIME',
      },
    )).Page.media;

    return MediaRichDisplay(msg, animeList, this.buildEmbed);
  }

  buildEmbed(anime: any): any {
    var msgEmbed: any = {
      color: 3447003,
      title: anime.title.userPreferred,
      url: anime.siteUrl,
      description: AniList.Synopsis(anime.description, 300),
      image: {
        url: anime.bannerImage,
      },
      thumbnail: {
        url: anime.coverImage.large,
      },
      footer: {
        text:
          'Status: ' +
          anime.status +
          ', Next episode: ' +
          anime.nextAiringEpisode +
          ' | Powered by AniList',
      },
      fields: [
        { name: 'Score', value: anime.meanScore || 'N/A', inline: true },
        { name: 'Episodes', value: anime.episodes || 'N/A', inline: true },
        {
          name: 'Streaming Services',
          value: AniList.StreamingServices(anime.externalLinks),
          inline: true,
        },
        {
          name: 'More info',
          value: AniList.TrackingSites(anime),
          inline: true,
        },
      ],
    };
    return msgEmbed;
  }
}
