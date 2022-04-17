import React, { useState } from 'react'
import { Alert, Accordion, Col, Container, Placeholder, ListGroup, Row } from 'react-bootstrap'
import { GQL_FETCH_FILMS } from 'api/gql_quries'
import { useQuery } from '@apollo/client'
import IMDBInfo from './IMDBInfo'
import KinopoiskInfo from './KinopoiskInfo'
import FilmInfo from './FilmInfo'

const FilmItem = ({ film, active }) => (
  <ListGroup.Item key={film.id} action eventKey={film.id}>
    {film.externalInfo.map(ei => {
      if (ei.site == "IMDB") {
        return <IMDBInfo id={ei.externalId} key={ei.externalId} className="me-2" />
      } else if (ei.site == "Kinopoisk") {
        return <KinopoiskInfo id={ei.externalId} key={ei.externalId} className="me-2" />
      }
    })}
    {film.name} ({film.year})
  </ListGroup.Item>
)


const Films = () => {
  const { loading, error, data } = useQuery(GQL_FETCH_FILMS)
  const [currentFilm, setCurrentFilm] = useState(null)

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
    <Container fluid>
      <Row>
        <Col sm={4}>
          <ListGroup onSelect={setCurrentFilm} size="xs">
            {data.films.map((film) => <FilmItem film={film} key={film.id} active={film.id === currentFilm} />)}
          </ListGroup>
        </Col>
        <Col>
          <FilmInfo id={currentFilm} />
        </Col>-
      </Row>
    </Container>
  )
}

export default Films