import { RichDisplay, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';

export async function MediaRichDisplay(
  msg: KlasaMessage,
  media_list: any[],
  embedBuilder: Function,
) {
  var display = new RichDisplay(new MessageEmbed().setTitle('Search Results'));
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
  display.setFooterSuffix(' | Powered by AniList');

  for (const media of media_list) {
    display.addPage(new MessageEmbed(embedBuilder(media)));
  }

  var loadingMsg = await msg.send('Loading ...');
  return display.run(loadingMsg, {
    filter: (_: any, user: any) => user === msg.author,
    firstLast: false,
    jump: false,
  });
}
