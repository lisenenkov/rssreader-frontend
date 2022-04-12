import React from 'react'
import { Alert, Accordion, Placeholder } from 'react-bootstrap'
import { GQL_FETCH_FILMS } from 'api/gql_quries'
import { useQuery } from '@apollo/client'
import IMDBInfo from './IMDBInfo'
import KinopoiskInfo from './KinopoiskInfo'
import FilmInfo from './FilmInfo'

const FilmItem = ({ film }) => (
  <Accordion.Item key={film.id} eventKey={film.id}>
    <Accordion.Header>
      {film.externalInfo.map(ei => {
        if (ei.site == "IMDB") {
          return <IMDBInfo id={ei.externalId} key={ei.externalId} className="me-2" />
        } else if (ei.site == "Kinopoisk") {
          return <KinopoiskInfo id={ei.externalId} key={ei.externalId} className="me-2" />
        }
      })}
      {film.name} ({film.year})
    </Accordion.Header>
    <Accordion.Body>
      <FilmInfo id={film.id} />
    </Accordion.Body>

  </Accordion.Item>
)


const Films = () => {
  const { loading, error, data } = useQuery(GQL_FETCH_FILMS)

  if (loading) {
    return <Placeholder animation="glow">
      <Placeholder sm={7} />
    </Placeholder>
  }
  if (error) {
    return <Alert variant="warning">
      {error.message}<br />
      {error.extraInfo}
    </Alert>
  }

  return (
    <>
      <Accordion >
        {data.films.map((film) => <FilmItem film={film} />)}
      </Accordion>
    </>
  )
}

export default Films