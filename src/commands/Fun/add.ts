import { Command, KlasaMessage } from 'klasa';

export default class AddCommand extends Command {
  constructor(...args) {
    // @ts-ignore
    super(...args, {
      name: 'add',
      description: 'Try your luck at adding two numbers. Who knows, Zero Two might actually pity you, and help you.',
      usage: '<numbers:int> [...]',
      usageDelim: ' ',
    });
  }

  run(message: KlasaMessage, numbers) {
    if (numbers.length >= 2) {
      const response: any = this.response(numbers);
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
    const n = Math.floor(Math.random() * this.responsesList(numbers).length);

    return this.responsesList[n];
  }

  responsesList = (args: any) => [
    'You can\'t event added two number yourself? Pathetic. Maybe you should get <@510000124949168165> to do it for you. _Hmph_ ...',
    `What? <@510000124949168165> couldn\'t do that for you? And now you want me to do it? ...\nAlright, I\'ll help you this time. **${args[0]}** + **${args[0]}** is **${parseInt(args[0]) + parseInt(args[0])}**`,
    // ['Hey, <@510000124949168165>! This is your job, right?', `!add ${args[0]} ${args[1]}`]
  ];
}
