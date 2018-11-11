import {
  Command,
  KlasaClient,
  CommandStore,
  CommandOptions,
  KlasaMessage,
  RichDisplay,
  RichMenu,
} from 'klasa';
import * as AniList from '../utils/anilist';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import { MediaRichDisplay } from '../utils/RichDisplay';

export default class TestCommand extends Command {
  msgColor = 3447003;
  menu: RichMenu;

  constructor(
    client: KlasaClient,
    store: CommandStore,
    file: string[],
    directory: string,
    options?: CommandOptions,
  ) {
    super(client, store, file, directory, {
      name: 'test',
      enabled: true,
      usage: '<test:string>',
    });

    this.menu = new RichMenu(
      new MessageEmbed()
        .setColor(0x673ab7)
        .setTitle('Advanced Commands Help:')
        .setDescription(
          'Use the arrow reactions to scroll between pages.\nUse number reactions to select an option.',
        ),
    );
  }

  async run(message: KlasaMessage, params: any[]) {
    const collector = await this.menu.run(
      await message.send('Loading commands...'),
    );

    const choice = await collector.selection;
    if (choice === null) {
      return collector.message.delete();
    }

    const command = this.client.commands.get(this.menu.options[choice].name);
    const info = new MessageEmbed()
      .setTitle(`Command \`${message.guild.settings.prefix}${command.name}\``)
      .setDescription(
        typeof command.description === 'function'
          ? command.description(message)
          : command.description,
      )
      .addField('Usage:', command.usageString);

    if (command.extendedHelp && command.extendedHelp !== '') {
      const extendHelp =
        typeof command.extendedHelp === 'function'
          ? command.extendedHelp(message)
          : command.extendedHelp;
      info.addField('Help:', extendHelp);
    }

    return message.sendEmbed(info);
  }

  init() {
    for (const command of this.client.commands.values()) {
      this.menu.addOption(command.name, command.description);
    }
  }
}
