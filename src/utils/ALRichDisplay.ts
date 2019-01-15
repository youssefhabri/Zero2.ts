import { Command, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import { RichDisplay } from './RichDisplay';


export async function ALRichDisplay(
  command: Command,
  message: KlasaMessage,
  media_list: any[],
  embedBuilder: Function,
) {
  const display = new RichDisplay(
    new MessageEmbed().setTitle('Search Results'),
  );
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

  for (const media of media_list) {
    const messageEmbed = new MessageEmbed(embedBuilder(media));
    display.addPage(messageEmbed);
  }
  // @ts-ignore
  const loadingMsg: KlasaMessage = await message.send('Loading ...');

  return display.run(loadingMsg, {
    filter: (_: any, user: any) => user === message.author || user === command.client.owner,
    firstLast: false,
    jump: false,
    time: 5 * 60 * 1000, // TODO Reset the time out after the user clicks the button
  });
}
