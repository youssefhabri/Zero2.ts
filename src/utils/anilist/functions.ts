import striptags from 'striptags';
import fetch from 'node-fetch';
import { isNullOrUndefined } from 'util';

export const API_URL = 'https://graphql.anilist.co';

export async function query(query: string, variables: any) {
  var options = {
    query,
    variables,
  };

  var res = await fetch(API_URL, {
    method: 'post',
    body: JSON.stringify(options),
    headers: { 'Content-Type': 'application/json' },
  });
  return (await res.json()).data;
}

export function Synopsis(description: string, length: number = 350): string {
  var synopsis: string = striptags(description);
  synopsis = synopsis.replace('\n\n', '\n');

  var segs = synopsis.split('\n');
  if (segs.length > 5) {
    segs = segs.slice(0, 5);
  }
  synopsis = segs.join('\n');

  if (synopsis.length > length) {
    return synopsis.substring(0, length) + ' ...';
  }
  return synopsis;
}

export function StreamingServices(externalLinks: any[]): string {
  if (externalLinks.length > 0) {
    var list = new Array<string>();
    for (var service of externalLinks) {
      list.push(`[${service.site}](${service.url})`);
    }
    return list.join(', ');
  }
  return 'Not available';
}

export function TrackingSites(media: any): string {
  var sites = `[AniList](https://anilist.co/anime/${media.id})`;
  sites += `, [MAL](https://myanimelist.com/anime/${media.idMal})`;
  return sites;
}

export function CharacterName(nameObj: any): string {
  var name: string = (nameObj.first || '') + ' ' + (nameObj.last || '');
  if (name.trim().length <= 0) {
    name = nameObj.native;
  }
  return name;
}

export function CharacterMediaList(media: any, type: string): string {
  var list = new Array<string>();
  var count = 0;
  for (var item of media.nodes) {
    if (item.type == type) {
      list.push(`[${item.title.userPreferred}](${item.siteUrl})`);
      count++;
    }
    if (count >= 5) break;
  }

  return list.join('\n') || 'N/A';
}
