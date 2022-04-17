import { Alert, Button, ListGroup, Placeholder } from 'react-bootstrap'
import { Interweave } from 'interweave'
import { GQL_GET_FILM } from "api/gql_quries"
import { useQuery, useMutation } from '@apollo/client'
import IMDBInfo from './IMDBInfo'

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

const FilmInfo = ({ id }) => {
  const { loading, error, data } = useQuery(GQL_GET_FILM, {
    variables: { id }
  })

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


  var { film: { links = [] } } = data
  var description = links && links[0].description
  return < div >
    <Interweave content={description} transform={htmlTransorm} />
    <ListGroup>
      {links.map((link) => <a href={link.url} target="_blank">{link.name}</a>)}
    </ListGroup>
  </div >
}

export default FilmInfo