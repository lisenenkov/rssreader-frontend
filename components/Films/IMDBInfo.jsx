import Image from 'next/image'
import classnames from 'classnames'
import styles from './IMDBInfo.module.scss'
import { useState, useEffect } from 'react'
import { gql, request } from 'graphql-request'

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
const grphql_imdb_url = process.env.NEXT_PUBLIC_API_IMDB_URL

const IMDBInfo = ({ id, className }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const fetchRating = async () => {
    try {
      const response = await request(grphql_imdb_url, GQL_FETCH_RATING, { id })
      setData(response)
      setLoading(false)
    } catch {
    }
  }

  useEffect(() => {
    fetchRating()
  }, [id])

  if (loading)
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