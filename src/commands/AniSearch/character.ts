import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { MediaRichDisplay } from '../../utils/RichDisplay';
import * as AniList from '../../utils/anilist';

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
      description: 'Search for a character in AniList.',
    });
  }

  // @ts-ignore
  async run(message: KlasaMessage, params: any[]) {
    const characterList: any[] = (await AniList.query(
      AniList.SEARCH_ALL_CHARACTER_QUERY,
      {
        search: params[0],
      },
    )).Page.characters;

    return MediaRichDisplay(this, message, characterList, this.buildEmbed);
  }

  buildEmbed(character: any): any {
    return {
      color: 3447003,
      title: AniList.CharacterName(character.name),
      url: character.siteUrl,
      description: AniList.Synopsis(character.description, 300),
      thumbnail: {
        url: character.image.large,
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
  }
}
