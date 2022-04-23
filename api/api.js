import { gql, request } from 'graphql-request'
import {
  GQL_FETCH_FILMS, GQL_GET_FILM, GQL_UPDATE_FILM, GQL_UPDATE_FILMLINK,
  GQL_FETCH_RSSSOURCES, GQL_CREATE_RSSSOURCE, GQL_UPDATE_RSSSOURCE, GQL_DELETE_RSSSOURCE
} from "api/gql_quries"

const grphql_url = process.env.NEXT_PUBLIC_API_URL

const API = {
  fetchRssSources: () => request(grphql_url, GQL_FETCH_RSSSOURCES),
  createRssSource: (rssSource) => request(grphql_url, GQL_CREATE_RSSSOURCE, { rssSource }),
  updateRssSource: (id, rssSource) => request(grphql_url, GQL_UPDATE_RSSSOURCE, { id, rssSource }),
  deleteRssSource: (id) => request(grphql_url, GQL_DELETE_RSSSOURCE, { id }),
  fetchFilms: () => request(grphql_url, GQL_FETCH_FILMS),
  getFilm: (id) => request(grphql_url, GQL_GET_FILM, { id }),
  updateFilm: (id, film) => request(grphql_url, GQL_UPDATE_FILM, { id, film }),
  updateFilmLinks: (filmLinkIds, filmLink) => request(grphql_url, GQL_UPDATE_FILMLINK, { ids: filmLinkIds, filmLink }),
}

export default API