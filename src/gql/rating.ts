import gql from 'graphql-tag'


export const ALL_RATINGS = gql`
  query {
    scores {
      id
      quality
      rank
      createdAt
      user {
        fullName
      }
    }
  }
`

export const SUBSCRIBE_SCORE = gql`
  subscription NewScore {
    newScore {
      id
      quality
      rank
      createdAt
      user {
        fullName
      }
    }
  }
`
