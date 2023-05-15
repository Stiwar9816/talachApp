import gql from 'graphql-tag'

export const ALL_ORDERS = gql`
query {
  orders {
    id
    createdAt
    user {
      fullName
    }
    companies {
      name_company
    }
    payments {
      card_type
      total
    }
    status
  }
}
`