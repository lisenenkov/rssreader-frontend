import { Alert, Button, ListGroup, Placeholder } from 'react-bootstrap'
import { Interweave } from 'interweave'
import IMDBInfo from './IMDBInfo'
import { injectStore } from 'stores/Store'

const htmlTransorm = (node, children) => {
  if (node.nodeName === 'SCRIPT') {
    return null;
  }
  if (node.nodeName === 'A') {
    return <>{children}</>;
  }
  if (node.className === 'imdbRatingPlugin') {
    const { dataset: { title } } = node
    if (title)
      return <IMDBInfo id={title} />;
  }

}

const FilmInfo = ({ store }) => {
  const films = store.films
  const selectedFilm = films.selectedFilm

  if (selectedFilm.loading) {
    return <Placeholder animation="glow">
      <Placeholder sm={7} />
    </Placeholder>
  }
  if (selectedFilm.error) {
    return <Alert variant="warning">
      {error.message}<br />
      {error.extraInfo}
    </Alert>
  }


  const { links = [] } = selectedFilm.filmInfo
  const { description } = selectedFilm.selectedLink || {}
  return < div >
    <ListGroup onSelect={selectedFilm.selectFilmLink} size="xxs">
      {links.map((link) =>
        <ListGroup.Item eventKey={link.url} active={link.url == selectedFilm.selectedLink.url}>
          <a href={link.url} className="link-dark" target="_blank">{link.pubDate} {link.comment}</a>
        </ListGroup.Item>)}
    </ListGroup>
    <Interweave content={description} transform={htmlTransorm} />
  </div >
}

export default injectStore(FilmInfo)