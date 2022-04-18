import React from 'react'
import { Alert, Button, Container, ListGroup, Placeholder } from 'react-bootstrap'
import { PlusLg, Trash, PencilSquare } from 'react-bootstrap-icons';
import showEditor from './RssSourcesEdit'
import { confirm } from 'components/Confirmation';
import { injectStore } from 'stores/Store';

const RssSources = ({ store }) => {
  const rssSources = store.rssSources

  const editRssSource = async (rssSource) => {

    await showEditor({
      rssSource: { ...rssSource },
      onSave: async (rssData) => {
        if (rssSource == null) {
          //new record
          await rssSources.createRssSource(rssData);
        } else {
          //existing record
          await rssSources.updateRssSource(rssSource.id, rssData);
        }
        return true;
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
    rssSources.deleteRssSource(rssSource.id)
  }

  if (rssSources.loading) {
    return <Placeholder animation="glow">
      <Placeholder sm={7} />
    </Placeholder>
  }
  if (rssSources.error) {
    return <Alert variant="warning">
      {rssSources.error.message}
    </Alert>
  }

  return (
    <Container fluid className="overflow-auto">
      <h3>RSS Sources <Button variant="primary" onClick={() => editRssSource(null)}> <PlusLg /> Add</Button></h3>
      <ListGroup>
        {rssSources.list.map((rss) => <ListGroup.Item key={rss.id}>
          <Button variant="link" onClick={() => deleteRssSource(rss)}><Trash /></Button>
          <Button variant="link" onClick={() => editRssSource(rss)}><PencilSquare /></Button>
          {rss.name}
        </ListGroup.Item>)}

      </ListGroup>
    </Container>
  )
}

export default injectStore(RssSources)