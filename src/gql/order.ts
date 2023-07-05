import gql from 'graphql-tag'

export const ALL_ORDERS = gql`
query {
  orders {
    id
    user {
      fullName
    }
    createdAt
    companies {
      name_company
    }
    total
  }
}
`
export const SUBSCRIBE_ORDER = gql`
subscription NewOrder {
  newOrder {
    id
    user {
      fullName
    }
    createdAt
    companies {
      name_company
    }
    total
  }
}
`