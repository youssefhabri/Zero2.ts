import fetch from 'node-fetch';
import qs from 'querystring';
import { MusicCommand } from '../../Sneyra';

const URL = 'https://www.googleapis.com/youtube/v3/search?';

export default class extends MusicCommand {

  constructor(...args) {
    // @ts-ignore
    super(...args, {
      description: 'Adds a song the the queue.',
      usage: '<url:string>',
    });
  }

  async run(msg, [url]) {
    const youtubeURL = await this.getURL(url);
    if (!youtubeURL) throw 'Not found.';

    const { music } = msg.guild;
    const song = await music.add(msg.author, youtubeURL);

    return msg.sendMessage(`🎵 Added **${song.title}** to the queue 🎶`);
  }

  async getURL(url) {
    const id = MusicCommand.YOUTUBE_REGEXP.exec(url);
    if (id) return `https://youtu.be/${id[1]}`;

    const query = qs.stringify({
      part: 'snippet',
      q: url,
      key: process.env.GOOGLE_SEARCH,
    });
    const { items } = await fetch(URL + query)
      .then(result => result.json());

    const video = items.find(item => item.id.kind === 'youtube#video');
    return video ? `https://youtu.be/${video.id.videoId}` : null;
  }

};
