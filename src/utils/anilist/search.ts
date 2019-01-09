import { SEARCH_ALL_CHARACTER_QUERY, SEARCH_ALL_MEDIA_QUERY, SEARCH_ALL_USERS_QUERY } from './queries';
import { query } from './helpers';

export async function searchUser(username: string): Promise<any[]> {
  return (await query(
    SEARCH_ALL_USERS_QUERY,
    {
      search: username,
    },
  )).Page.users;
}

export async function searchMedia(search: string, type: string = 'ANIME'): Promise<any[]> {
  return (await query(
    SEARCH_ALL_MEDIA_QUERY,
    {
      search,
      type,
    },
  )).Page.media;
}

export async function searchCharacter(search: string): Promise<any[]> {
  return (await query(
    SEARCH_ALL_CHARACTER_QUERY,
    {
      search,
    },
  )).Page.characters;
}

export async function search(search: string): Promise<any> {
  return {
    anime: await searchMedia(search),
    manga: await searchMedia(search, 'MANGA'),
    users: await searchUser(search),
    characters: await searchCharacter(search),
  };
}
