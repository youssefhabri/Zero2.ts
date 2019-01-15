import { Command, KlasaMessage } from 'klasa';
import { random } from '../../utils/common';


export default class NLOwO extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      enabled: true,
      hidden: true,
      name: 'nlowo',
      aliases: ['owo'],
      usage: '<nlowo:string>',
    });
  }

  async run(message: KlasaMessage, params: any[]) {

    message.delete();

    return message.send(`${message.author} said: ${this.get_owo(params[0])}`);
  }

  get_owo(text: string): string {
    const faces = ['owo', 'UwU', '>w<', '^w^'];
    let r = text.replace(new RegExp('[rl]', 'g'), 'w');
    r = r.replace(new RegExp('[RL]', 'g'), 'W');
    r = r.replace('ove', 'uv');
    r = r.replace('n', 'ny');
    r = r.replace('N', 'NY');
    r = r.replace(new RegExp('[!]', 'g'), ` ${faces[random(0, 3)]} `);

    return r;
  }

}
