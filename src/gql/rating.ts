import gql from 'graphql-tag'

export const ALL_RATINGS = gql`
query {
  scores {
    id
    quality
    rank
  }
}
`