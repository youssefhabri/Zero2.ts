// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

import { MusicCommand } from '../../lib/structures/MusicCommand';

export default class extends MusicCommand {

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      description: 'Resumes the current song.',
      requireMusic: true,
    });
  }

  async run(msg) {
    if (msg.guild.music.idling) throw 'My deck is empty! Give me a disk first so I can lift the spirits in this room!';
    if (msg.guild.music.playing) throw 'Is this song too silent, my friend? Because it is indeed... playing.';

    msg.guild.music.resume();
    return msg.sendMessage('▶ Resumed');
  }

}
