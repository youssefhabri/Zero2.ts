// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

import { Inhibitor } from 'klasa';


export default class extends Inhibitor {

  constructor(...args) {
    // @ts-ignore
    super(...args, { spamProtection: true });
  }

  async run(msg, cmd) {
    if (cmd.requireMusic !== true) return;

    if (msg.channel.type !== 'text') throw 'This command may be only executed in a server.';

    if (!msg.member.voice.channel) throw 'You are not connected in a voice channel.';
    if (!msg.guild.me.voice.channel) throw 'I am not connected in a voice channel.';
    if (msg.member.voice.channel !== msg.guild.me.voice.channel) throw 'You must be in the same voice channel as me.';
  }

}
