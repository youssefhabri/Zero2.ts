import { Command, KlasaMessage } from 'klasa';

import * as AniList from '../../utils/anilist';

export default class ALSearch extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'alsearch',
      aliases: ['al'],
      enabled: false,
      usage: '<alsearch:string>',
      description: 'Search AniList.',
    });
  }

  async run(message: KlasaMessage, params): Promise<KlasaMessage | KlasaMessage[]> {
    // let results = await AniList.search(params[0]);

    // TODO Create a interactive RichMenu to allow users to select the set of
    //  results they want using reactions: Anime, Manga, Characters, and Users

    return message.send('Unimplemented');
  }
}
