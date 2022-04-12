import React from 'react'
import { Alert, Button, ListGroup, Placeholder } from 'react-bootstrap'
import { PlusLg, Trash, PencilSquare } from 'react-bootstrap-icons';
import { GQL_FETCH_RSSSOURCES, GQL_CREATE_RSSSOURCE, GQL_UPDATE_RSSSOURCE, GQL_DELETE_RSSSOURCE } from 'api/gql_quries'
import { useQuery, useMutation } from '@apollo/client'
import showEditor from './RssSourcesEdit'
import { confirm } from 'components/Confirmation';

const RssSources = () => {
  const { loading, error, data } = useQuery(GQL_FETCH_RSSSOURCES)
  const [updateRss] = useMutation(GQL_UPDATE_RSSSOURCE);
  const [createRss] = useMutation(GQL_CREATE_RSSSOURCE, {
    refetchQueries: ['rssSources'],
  });
  const [deleteRss] = useMutation(GQL_DELETE_RSSSOURCE, {
    refetchQueries: ['rssSources'],
  });

  const editRssSource = async (rssSource) => {

    await showEditor({
      rssSource: { ...rssSource },
      onSave: async (rssData) => {
        if (rssSource == null) {
          //new record
          return await createRss({
            variables: { rssSource: rssData }
          });
        } else {
          //existing record
          return await updateRss({
            variables: {
              id: rssSource.id,
              rssSource: rssData
            }
          });
        }
      }
    })

  }

  const deleteRssSource = async (rssSource) => {
    const confirmResult = await confirm({
      header: "Deletion",
      message: `Are you sure you want to delete source "${rssSource.name}"?`
    })
    if (!confirmResult) {
      return;
    }
    deleteRss({
      variables: { id: rssSource.id },
    })
  }

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
      <h3>RSS Sources <Button variant="primary" onClick={() => editRssSource(null)}> <PlusLg /> Add</Button></h3>
      <ListGroup>
        {data.rssSources.map((rss) => <ListGroup.Item key={rss.id}>
          <Button variant="link" onClick={() => deleteRssSource(rss)}><Trash /></Button>
          <Button variant="link" onClick={() => editRssSource(rss)}><PencilSquare /></Button>
          {rss.name}
        </ListGroup.Item>)}

      </ListGroup>
    </>
  )
}

export default RssSources