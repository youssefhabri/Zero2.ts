// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

import { promisify } from 'util';
import { MessageEmbed } from 'discord.js';
import { MusicCommand } from '../../lib/structures/MusicCommand';
import { showSeconds, splitText } from '../../utils/common';


const getInfo = promisify(require('ytdl-core').getInfo);

export default class extends MusicCommand {

  constructor(...args) {
    // @ts-ignore
    super(...args, { description: 'Get information from the current song.' });
  }

  async run(msg) {
    const { remaining, queue, playing } = msg.guild.music;
    if (!playing) throw `Are you speaking to me? Because my deck is empty...`;

    const [song] = queue;
    const info = await getInfo(song.url);
    if (!info.author) info.author = {};

    return msg.sendMessage(new MessageEmbed()
      .setColor(12916736)
      .setTitle(info.title)
      .setURL(`https://youtu.be/${info.vid}`)
      .setAuthor(info.author.name || 'Unknown', info.author.avatar || null, info.author.channel_url || null)
      .setDescription([
        `**Duration**: ${showSeconds(parseInt(info.length_seconds) * 1000)} [Time remaining: ${showSeconds(remaining)}]`,
        `**Description**: ${splitText(info.description, 500)}`,
      ].join('\n\n'))
      .setThumbnail(info.thumbnail_url)
      .setTimestamp());
  }

}
