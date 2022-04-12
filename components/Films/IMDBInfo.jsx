import Image from 'next/image'
import classnames from 'classnames'
import { gql, useQuery } from "@apollo/client"
import styles from './IMDBInfo.module.scss'

const GQL_FETCH_RATING = gql`
query imdbTitle($id: ID!) {
  title(id: $id) {
    id
    ratingsSummary {
      aggregateRating
      voteCount
    }
  }
}
`

const IMDBInfo = ({ id, className }) => {
  const { loading, error, data } = useQuery(GQL_FETCH_RATING, {
    variables: { id },
    context: {
      //uri: 'http://127.0.0.1:8080/imdb',
      uri: 'http://192.168.1.5:8080/imdb',
    }
  })

  if (loading || error != null)
    return <Image src="/imdb.png" width="37" height="18" className={className} />

  const { title } = data;

  return <span className={classnames(styles.rating, className)}>
    {title.ratingsSummary.aggregateRating}
    <span className={styles.votes}>
      {title.ratingsSummary.voteCount}
    </span>
  </span>
}

export default IMDBInfo