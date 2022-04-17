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
      uri: process.env.NEXT_PUBLIC_API_IMDB_URL,
    }
  })

  if (loading || error != null)
    return <Image src="/imdb.png" width="37" height="18" className={className} />

  const { title: { ratingsSummary: { aggregateRating, voteCount } } } = data;

  return <span className={classnames(styles.rating, className)}>
    {aggregateRating}
    <span className={styles.votes}>
      {voteCount}
    </span>
  </span>
}

export default IMDBInfo