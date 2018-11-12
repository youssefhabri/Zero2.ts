import { RichDisplay, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';

export async function MediaRichDisplay(
  message: KlasaMessage,
  media_list: any[],
  embedBuilder: Function,
  suffix: string = 'Powered by AniList'
) {
  let display = new RichDisplay(new MessageEmbed().setTitle('Search Results'));
  display.setEmojis({
    first: '⏮',
    back: '⬅',
    forward: '➡',
    last: '⏭',
    jump: '🔢',
    info: 'ℹ',
    stop: '🇽',
  });
  display.setFooterPrefix('Page: ');
  display.setFooterSuffix(' | ' + suffix);

  for (const media of media_list) {
    display.addPage(new MessageEmbed(embedBuilder(media)));
  }
  // @ts-ignore
  var loadingMsg: KlasaMessage = await message.send('Loading ...');
  return display.run(loadingMsg, {
    filter: (_: any, user: any) => (user === message.author) || (user === this.client.owner),
    firstLast: false,
    jump: false,
  });
}
