import { gql } from "@apollo/client"

export const GQL_FETCH_RSSSOURCES = gql`
query rssSources {
  rssSources {
    id, name, url
  }
}
`

export const GQL_CREATE_RSSSOURCE = gql`
mutation createRssSource($rssSource: RssSourceContent) {
  createRssSource(rssSource: $rssSource) {
    id, name, url
  }
}
`

export const GQL_UPDATE_RSSSOURCE = gql`
mutation updateRssSource($id: ID!, $rssSource: RssSourceContent) {
  updateRssSource(id: $id, rssSource: $rssSource) {
    id, name, url
  }
}
`

export const GQL_DELETE_RSSSOURCE = gql`
mutation deleteRssSource($id: ID!) {
  deleteRssSource(id: $id) {
    id
  }
}
`

export const GQL_FETCH_FILMS = gql`
query films {
  films { 
    id, name, year, externalInfo {
      site, externalId
    }
  }
}
`

export const GQL_GET_FILM = gql`
query film($id:ID!) {
  film(id: $id) { 
    links {
      rssSource, url, category, name, year, comment, pubDate, description
    }
  }
}
`
