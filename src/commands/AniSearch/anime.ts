import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { ALRichDisplay } from '../../utils/RichDisplay';
import * as AniList from '../../utils/anilist';

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
      aliases: ['a'],
      enabled: true,
      usage: '<anime:string>',
      description: 'Search for an anime in AniList.',
    });
  }

  // @ts-ignore
  async run(message: KlasaMessage, params: any[]) {
    const animeList: any[] = await AniList.searchMedia(params[0]);

    if (animeList.length > 0) {
      return ALRichDisplay(this, message, animeList, this.buildEmbed);
    }
    return message.send(`No results were found for \`${params[0]}\`!`);
  }

  buildEmbed(anime: any): any {
    return {
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
  }
}
