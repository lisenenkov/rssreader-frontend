import FilmActions from 'components/Films/FilmActions'
import FilmInfo from 'components/Films/FilmInfo'
import Films from 'components/Films/Films'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'

const IndexPage = () => (
  <>
    <Container fluid className="flex-grow-1 d-flex gap-4 overflow-hidden">
      <Col sm="4" className='overflow-auto'>
        <Films />
      </Col>
      <Col className='overflow-auto'>
        <FilmActions />
        <FilmInfo />
      </Col>
    </Container>
  </>
)

export default IndexPage
