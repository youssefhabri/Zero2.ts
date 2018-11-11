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
import { MediaRichDisplay } from '../../utils/RichDisplay';

export default class ALCharacterCommand extends Command {
  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string,
    options?: CommandOptions,
  ) {
    super(client, store, file, directory, {
      name: 'character',
      enabled: true,
      usage: '<character:string>',
    });
  }

  async run(msg: KlasaMessage, params: any[]) {
    var characterList: any[] = (await AniList.query(
      AniList.SEARCH_CHARACTER_QUERY,
      {
        search: params[0],
      },
    )).Page.media;

    return MediaRichDisplay(msg, characterList, this.buildEmbed);
  }

  buildEmbed(character: any): MessageEmbed {
    var msgEmbed: MessageEmbed = {
      color: 3447003,
      title: character.title.userPreferred,
      url: character.siteUrl,
      description: AniList.Synopsis(character.description, 300),
      image: {
        url: character.bannerImage,
      },
      thumbnail: {
        url: character.coverImage.large,
      },
      footer: {
        text: 'Powered by AniList',
      },
      fields: [
        {
          name: 'Anime',
          value: AniList.CharacterMediaList(character.media, 'ANIME'),
          inline: true,
        },
        {
          name: 'Manga',
          value: AniList.CharacterMediaList(character.media, 'MANGA'),
          inline: true,
        },
      ],
    };
    return msgEmbed;
  }
}
