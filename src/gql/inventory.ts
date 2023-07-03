import gql from 'graphql-tag'

export const ALL_INVENTORY = gql`
query ($priceType: String!) {
  priceByType(priceType: $priceType) {
    id
    name
    price
    stock
    description
    user {
      fullName
    }
  }
}
`

export const INVENTORY_BY_ID = gql`
query ($priceId: Int!) {
  price(id: $priceId) {
    id
    name
    price
    stock
    description
    user {
      fullName
    }
  }
}
`

export const UPDATE_INVENTORY = gql`
mutation ($updatePriceInput: UpdatePriceInput!) {
  updatePrice(updatePriceInput: $updatePriceInput) {
    id
    name
    price
    stock
    description
    user {
      fullName
    }
  }
}
`

export const REMOVE_INVENOTRY = gql`
mutation ($removePriceId: Int!) {
  removePrice(id: $removePriceId) {
    id
  }
}
`
