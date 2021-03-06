import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { ALRichDisplay } from '../../utils/ALRichDisplay';
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
      aliases: ['c'],
      enabled: true,
      usage: '<character:string>',
      description: 'Search for a character in AniList.',
    });
  }

  // @ts-ignore
  async run(message: KlasaMessage, params: any[]) {
    const characterList: any[] = await AniList.searchCharacter(params[0]);

    if (characterList.length > 0) {
      return ALRichDisplay(this, message, characterList, this.buildEmbed);
    }
    return message.send(`No results were found for \`${params[0]}\`!`);
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
