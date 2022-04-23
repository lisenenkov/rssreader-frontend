import React from 'react'
import { Alert, Col, Container, Placeholder, ListGroup, Row } from 'react-bootstrap'
import IMDBInfo from './IMDBInfo'
import KinopoiskInfo from './KinopoiskInfo'
import { injectStore } from 'stores/Store'

const FilmItem = ({ film, active }) => (
  <ListGroup.Item action eventKey={film.id} active={active} className={{
    "list-group-item-secondary": film.ignore
  }}>
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

const Films = ({ store }) => {
  const films = store.films
  const selectedFilm = films.selectedFilm

  if (films.loading == true) {
    return <Placeholder animation="glow">
      <Placeholder sm={7} />
    </Placeholder>
  }
  if (films.error) {
    return <Alert variant="warning">
      {films.error.message}
    </Alert>
  }

  return (
    <ListGroup onSelect={selectedFilm.selectFilm}>
      {films.list.map((film) => <FilmItem film={film} key={film.id} active={film.id == selectedFilm.id} />)}
    </ListGroup>
  )
}

export default injectStore(Films)