// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

import { Command } from 'klasa';
import { MessageEmbed } from 'discord.js';


export default class extends Command {

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      aliases: ['talk'],
      description: 'Make the bot talk in another channel.',
      permissionLevel: 10,
      usage: '[channel:channel] [title:string] [message:string] [...]',
      usageDelim: ' | ',
    });
  }

  async run(msg, [channel = msg.channel, title, ...content]) {
    if (msg.deletable) msg.delete().catch(() => undefined);

    const attachment = msg.attachments.size > 0 ? msg.attachments.first().url : undefined;
    const replyContent = content.length ? content.join(' ') : '';

    if (replyContent.length === 0 && !attachment) throw 'I have no replyContent nor attachment to send, please write something.';

    const options = {
      files: [],
    };
    if (attachment) options.files = [{ attachment }];

    const msgEmbed = new MessageEmbed();
    msgEmbed.setTitle(title);
    msgEmbed.setDescription(replyContent);

    return channel.sendEmbed(msgEmbed);
  }

};
