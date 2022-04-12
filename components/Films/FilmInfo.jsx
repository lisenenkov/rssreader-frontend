import { Alert, Button, ListGroup, Placeholder } from 'react-bootstrap'
import { Interweave } from 'interweave'
import { GQL_GET_FILM } from "api/gql_quries"
import { useQuery, useMutation } from '@apollo/client'

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
  console.log(links)
  return < div >
    <Interweave content={description} />
  </div >
}

export default FilmInfo