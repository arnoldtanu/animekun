import { gql } from '@apollo/client';
import { ALL_GENRE } from './genre';

export const ITEM_PER_PAGE = 12;

export const GENRE_LIST = () => {
  return gql`
  {
    GenreCollection
  }`;
};

export const POPULAR_ANIME_BY_GENRE = (page:number, genre:string) => {
  if (genre === ALL_GENRE){
    return gql`
    {
      Page(page:${page}, perPage:${ITEM_PER_PAGE}){
        media(sort: POPULARITY_DESC) {
          id,
          title {
            english
          },
          popularity,
          coverImage {
            large
          }
        }
      }
    }`;
  } else {
    return gql`
    {
      Page(page:${page}, perPage:${ITEM_PER_PAGE}){
        media(sort: POPULARITY_DESC, genre_in:\"${genre}\") {
          id,
          title {
            english
          },
          popularity,
          coverImage {
            large
          }
        }
      }
    }`;
  }
};

export const ANIME_DETAIL = (id:number) => {
  return gql`
  {
    Media(id: ${id}) {
      id,
      title {
        english
      },
      popularity,
      genres,
      coverImage {
        extraLarge
        large
        medium
        color
      }
      description
    }
  }`;
};