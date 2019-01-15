import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import * as AniList from '../../utils/anilist';
import { ALRichDisplay } from '../../utils/ALRichDisplay';

export default class ALUserCommand extends Command {

  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string,
    options?: CommandOptions,
  ) {
    super(client, store, file, directory, {
      name: 'user',
      aliases: ['u'],
      enabled: true,
      usage: '<user:string>',
      description: 'Search for a user in AniList',
    });
  }

  // @ts-ignore
  async run(message: KlasaMessage, params: any[]) {
    const userList: any[] = await AniList.searchUser(params[0]);

    if (userList.length > 0) {
      return ALRichDisplay(this, message, userList, this.buildEmbed);
    }
    return message.send(`No results were found for \`${params[0]}\`!`);
  }

  buildEmbed(user: any): any {
    return {
      color: 3447003,
      title: user.name,
      url: user.siteUrl,
      description: AniList.Synopsis(user.about, 300),
      // image: {
      //   url: user.bannerImage,
      // },
      thumbnail: {
        url: user.avatar.large,
      },
      footer: {
        text: 'Powered by AniList',
      },
      fields: [
        {
          name: 'Watched time',
          value: AniList.FormatTime(user.stats.watchedTime) || 'N/A',
          inline: true,
        },
        {
          name: 'Chapters read',
          value: user.stats.chaptersRead || 'N/A',
          inline: true,
        },
        {
          name: 'Favourite Anime',
          value: AniList.UserFavourites(user, 'ANIME'),
          inline: true,
        },
        {
          name: 'Favourite Manga',
          value: AniList.UserFavourites(user, 'MANGA'),
          inline: true,
        },
        {
          name: 'Favourite Characters',
          value: AniList.UserFavouritesCharacters(user) || 'N/A',
          inline: true,
        },
      ],
    };
  }
}
