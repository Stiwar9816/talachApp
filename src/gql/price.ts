import gql from 'graphql-tag'

export const CREATE_PRICE = gql`
  mutation CreatePrice($createPriceInput: CreatePriceInput!) {
    createPrice(createPriceInput: $createPriceInput) {
      id
      name
      price
      stock
      type
      description
    }
  }
`

export const ALL_PRICES_BY_TYPE = gql`
  query ($priceType: String!) {
    priceByType(priceType: $priceType) {
      id
      name
      price
      stock
      user{
        fullName
      }
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
  mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {
    updatePrice(updatePriceInput: $updatePriceInput) {
      id
      name
      price
      user{
        fullName
      }
    }
  }
`

export const REMOVE_PRICE = gql`
  mutation RemovePrice($removePriceId: Int!) {
    removePrice(id: $removePriceId) {
      name
    }
  }
`
