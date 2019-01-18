// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

import { MusicCommand } from '../../lib/structures/MusicCommand';

export default class extends MusicCommand {

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      permissionLevel: 6,
      description: 'Clears the music handler.',
    });
  }

  async run(msg) {
    msg.guild.music.clear();
    if (msg.guild.me.voice.channel) await msg.guild.me.voice.channel.leave();
    return msg.sendMessage('Successfully restarted the music module.');
  }

}
