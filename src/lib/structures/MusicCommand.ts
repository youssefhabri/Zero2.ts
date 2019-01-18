// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

import { Command } from 'klasa';


export class MusicCommand extends Command {

  requireMusic: boolean;

  static YOUTUBE_REGEXP = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/\S*(?:(?:\/e(?:mbed)?)?\/|watch\/?\?(?:\S*?&?v=))|youtu\.be\/)([\w-]{11})(?:[^\w-]|$)/;

  constructor(client, store, file, core, { requireMusic = false, ...options }) {
    // By nature, music commands only run in VoiceChannels, which are in Guilds.
    if ('runIn' in options) options.runIn = ['text'];

    super(client, store, file, core, options);

    /**
     * Whether this command requires an active VoiceConnection or not
     * @since 1.0.0
     * @type {boolean}
     */
    this.requireMusic = requireMusic;
  }

}
