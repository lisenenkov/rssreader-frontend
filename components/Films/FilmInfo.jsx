import { observer } from 'mobx-react'
import { Alert, Badge, Button, ListGroup, Placeholder } from 'react-bootstrap'
import { Link as LinkIcon } from 'react-bootstrap-icons';
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
  if (node.nodeName === 'IMG') {
    if (node.src) {
      const match = node.src.match(/.*\/image.php\?link=(.*)/);
      if (match && match[1]) {
        node.src = match[1];
      }
    }
  }

}

const FilmLink = observer(({ link, selectedFilm }) => {
  const date = new Date(link.pubDate)

  return <ListGroup.Item action eventKey={link.url} active={link.url == selectedFilm.selectedLink.url}>
    <Button variant="light" as="a" href={link.url} className="link-dark" target="_blank"><LinkIcon /></Button>
    {' '}
    <b>{date.toLocaleString()}</b>
    {' '}
    {link.comment}
    {link.viewed ? null : (<><Badge bg="info">new</Badge>{' '}</>)}
  </ListGroup.Item>;
})

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
    <ListGroup onSelect={selectedFilm.selectFilmLink}>
      {links.map((link) =>
        <FilmLink link={link} selectedFilm={selectedFilm} />)}
    </ListGroup>
    <Interweave content={description} transform={htmlTransorm} />
  </div >
}

export default injectStore(FilmInfo)

