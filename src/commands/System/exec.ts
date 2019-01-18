// Copyright (c) 2017-2018 kyranet. All rights reserved. MIT license.

import { Command, util as KlasaUtil } from 'klasa';

module.exports = class extends Command {

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      aliases: ['execute'],
      description: 'Execute commands in the terminal, use with EXTREME CAUTION.',
      guarded: true,
      permissionLevel: 10,
      usage: '<expression:string>',
    });
  }

  async run(msg, [input]) {
    const result = await KlasaUtil.exec(input, { timeout: 'timeout' in msg.flags ? Number(msg.flags.timeout) : 60000 })
      .catch(error => ({ stdout: null, stderr: error }));
    const output = result.stdout ? `**\`OUTPUT\`**${KlasaUtil.codeBlock('prolog', result.stdout)}` : '';
    const outerr = result.stderr ? `**\`ERROR\`**${KlasaUtil.codeBlock('prolog', result.stderr)}` : '';

    return msg.sendMessage([output, outerr].join('\n'));
  }

};
