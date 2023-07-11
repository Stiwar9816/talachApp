import gql from 'graphql-tag'


export const ALL_RATINGS = gql`
  query {
    scores {
      id
      quality
      rankClient
      rankTalachero
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
      rankClient
      rankTalachero
      createdAt
      user {
        fullName
      }
    }
  }
`
