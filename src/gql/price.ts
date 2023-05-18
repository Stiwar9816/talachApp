import gql from 'graphql-tag'

export const ALL_PRICES_BY_TYPE = gql`
query ($priceType: String!) {
  priceByType(priceType: $priceType) {
    id
    name
    price
    stock
  }
}
`

export const PRICE_BY_ID = gql`
query ($priceId: Int!) {
  price(id: $priceId) {
    id
    name
    price
    stock
  }
}
`

export const UPDATE_PRICE = gql`
mutation ($updatePriceInput: UpdatePriceInput!) {
  updatePrice(updatePriceInput: $updatePriceInput) {
    id
    name
    price
  }
}
`

export const REMOVE_PRICE = gql`
mutation ($removePriceId: Int!) {
  removePrice(id: $removePriceId) {
    id
  }
}
`
