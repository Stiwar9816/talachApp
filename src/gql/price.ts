import gql from 'graphql-tag'

export const CREATE_PRICE = gql`
  mutation CreatePrice($createPriceInput: CreatePriceInput!, $idCompany: String) {
    createPrice(createPriceInput: $createPriceInput, idCompany: $idCompany) {
      id
      name
      price
      stock
      type
      description
      user {
        fullName
      }
      companies {
        id
        name_company
      }
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
      image
      user {
        fullName
      }
      companies {
        id
        name_company
      }
    }
  }
`

export const PRICE_BY_ID = gql`
  query ($priceId: String!) {
    price(id: $priceId) {
      id
      name
      price
      stock
      user {
        fullName
      }
      companies {
        name_company
      }
    }
  }
`

export const UPDATE_PRICE = gql`
  mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {
    updatePrice(updatePriceInput: $updatePriceInput) {
      id
      name
      price
      user {
        fullName
      }
      companies {
        name_company
      }
    }
  }
`

export const REMOVE_PRICE = gql`
  mutation RemovePrice($removePriceId: String!) {
    removePrice(id: $removePriceId) {
      name
    }
  }
`
export const SUBSCRIBE_PRICE = gql`
  subscription NewPrice {
    newPrice {
      id
      name
      price
      stock
      description
      companies {
        id
        name_company
        isActive
      }
    }
  }
`
