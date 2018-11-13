import { Command, CommandOptions, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import { isArray } from 'util';

export default class AddCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'add',
      description: 'Try you luck at adding two numbers. Who knows, Zero Two might actually pity you, and help you.',
      usage: '<numbers:int> [...]',
      usageDelim: ' '
    });
  }

  run(message: KlasaMessage, numbers) {
    if (numbers.length >= 2) {
      const response = this.response(numbers);
      if (response instanceof Array) {
        for (let i = 0; i < response.length - 1; i++) {
          message.send(response[i]);
        }
        return message.send(response[response.length - 1]);
      }

      return message.send(response);
    }
    return message.send('You didn\'t gave me enough numbers to add, dummy.');
  }

  response(numbers) {
    const responsesList = [
      'You can\'t event added two number yourself? Pathetic. Maybe you should get <@510000124949168165> to do it for you. _Hmph_ ...',
      `What? <@510000124949168165> couldn\'t do that for you? And now you want me to do it? ...\nAlright, I\'ll help you this time. **${numbers[0]}** + **${numbers[0]}** is **${parseInt(numbers[0]) + parseInt(numbers[0])}**`,
      ['Hey, <@510000124949168165>! This is your job, right?', `!add ${numbers[0]} ${numbers[1]}`]
    ];

    const n = Math.floor(Math.random() * responsesList.length);

    return responsesList[n];
  }
}

