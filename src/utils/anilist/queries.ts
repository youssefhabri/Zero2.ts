export const SEARCH_MEDIA_QUERY: string = `
query($search: String, $type: MediaType) {
  Media(search: $search, type: $type) {
    id
    idMal
    type
    title {
      english
      userPreferred
    }
    nextAiringEpisode {
      airingAt
    }
    status
    meanScore
    episodes
    chapters
	siteUrl
    externalLinks {
      site
      url
    }
    coverImage {
      medium, large
    }
	bannerImage
    description
  }
}
`;

export const SEARCH_ALL_MEDIA_QUERY: string = `
query ($search: String, $type: MediaType) {
  Page(perPage: 50) {
    media(search: $search, type: $type) {
      id
      idMal
      type
      title {
        english
        userPreferred
      }
      nextAiringEpisode {
        airingAt
      }
      status
      meanScore
      episodes
      chapters
      siteUrl
      externalLinks {
        site
        url
      }
      coverImage {
        medium
        large
      }
      bannerImage
      description
    }
  }
}
`;

export const SEARCH_USER_QUERY: string = `
query ($id: Int, $search: String) {
  User(id: $id, search: $search) {
    id
    name
    siteUrl
    avatar {
      large
    }
    bannerImage
    about(asHtml: true)
    stats {
      watchedTime
      chaptersRead
    }
    favourites {
      manga {
        nodes {
          id
		  siteUrl
          title {
            romaji
            english
            native
            userPreferred
          }
        }
      }
      characters {
        nodes {
          id
		  siteUrl
          name {
            first
            last
            native
          }
        }
      }
      anime {
        nodes {
          id
		  siteUrl
          title {
            romaji
            english
            native
            userPreferred
          }
        }
      }
    }
  }
}
`;

export const SEARCH_ALL_USERS_QUERY: string = `
query ($id: Int, $search: String) {
  Page(perPage: 50) {
    users(id: $id, search: $search, sort: USERNAME) {
      id
      name
      siteUrl
      avatar {
        large
      }
      bannerImage
      about(asHtml: true)
      stats {
        watchedTime
        chaptersRead
      }
      favourites {
        manga {
          nodes {
            id
        siteUrl
            title {
              romaji
              english
              native
              userPreferred
            }
          }
        }
        characters {
          nodes {
            id
        siteUrl
            name {
              first
              last
              native
            }
          }
        }
        anime {
          nodes {
            id
        siteUrl
            title {
              romaji
              english
              native
              userPreferred
            }
          }
        }
      }
    }
	}
}
`;

export const SEARCH_CHARACTER_QUERY: string = `
query ($id: Int, $search: String) {
  Character(id: $id, search: $search) {
    id
	siteUrl
    description(asHtml: true)
    name {
      first
      last
      native
    }
    image {
      large
    }
    media {
      nodes {
        id
        type
		siteUrl
        title {
          romaji
          english
          native
          userPreferred
        }
      }
    }
  }
}
`;

export const SEARCH_ALL_CHARACTER_QUERY: string = `
query ($id: Int,$search: String) {
  Page(perPage: 50) {
    characters(id: $id, search: $search) {
      id
      siteUrl
      description(asHtml: true)
      name {
        first
        last
        native
      }
      image {
        large
      }
      media {
        nodes {
          id
          type
          siteUrl
          title {
            romaji
            english
            native
            userPreferred
          }
        }
      }
    }
  }
}
`;
