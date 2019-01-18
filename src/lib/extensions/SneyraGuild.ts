// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

import { Structures } from 'discord.js';

import { MusicManager } from '../structures/MusicManager';

export default Structures.extend('Guild', Guild => {
  /**
   * Sneyra's Extended Guild
   * @extends {Guild}
   */
  class SneyraGuild extends Guild {
    private music: MusicManager;

    /**
     * @param {...*} args Normal D.JS Guild args
     */
    constructor(...args) {
      // @ts-ignore
      super(...args);

      /**
       * The MusicManager instance for this client
       * @since 2.0.0
       * @type {MusicManager}
       */
      this.music = new MusicManager(this);
    }

  }

  return SneyraGuild;
});
