import {
  Command,
  KlasaClient,
  CommandStore,
  CommandOptions,
  KlasaMessage,
} from 'klasa';
import * as AniList from '../../utils/anilist';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';

export default class ALUserCommand extends Command {
  msgColor = 3447003;

  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string,
    options?: CommandOptions,
  ) {
    super(client, store, file, directory, {
      name: 'user',
      enabled: true,
      usage: '<user:string>',
    });
  }

  run(msg: KlasaMessage, params: any[]) {
    var options = {
      query: AniList.SEARCH_USER_QUERY,
      variables: {
        search: params[0],
      },
    };
    axios.post(AniList.API_URL, options).then((result) => {
      var user = result.data.data.User;
      return msg.sendEmbed(this.buildEmbed(user));
    });
  }

  buildEmbed(user: any): MessageEmbed {
    var msgEmbed: MessageEmbed = {
      color: this.msgColor,
      title: user.name,
      url: user.siteUrl,
      description: AniList.Synopsis(user.about, 300),
      image: {
        url: user.bannerImage,
      },
      thumbnail: {
        url: user.avatar.large,
      },
      footer: {
        text: 'Powered by AniList',
      },
      fields: [
        {
          name: 'Watched time',
          value: user.stats.watchedTime || 'N/A',
          inline: true,
        },
        {
          name: 'Chapters read',
          value: user.stats.chaptersRead || 'N/A',
          inline: true,
        },
        //{ name: 'Favourite Anime', value: user.episodes || 'N/A', inline: true },
        //{ name: 'Favourite Manga', value: user.episodes || 'N/A', inline: true },
        //{ name: 'Favourite Characters', value: user.episodes || 'N/A', inline: true },
      ],
    };
    return msgEmbed;
  }
}
