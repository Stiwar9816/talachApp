import gql from 'graphql-tag'

export const CREATE_PRICE = gql`
  mutation CreatePrice($createPriceInput: CreatePriceInput!,$idCompany: Int!) {
    createPrice(createPriceInput: $createPriceInput,idCompany: $idCompany) {
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
  query ($priceId: Int!) {
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
export const SUBSCRIBE_PRICE = gql`
subscription NewPrice {
  newPrice {
    id
    name
    price
    stock
    description
    user {
     fullName
    }
    companies {
      id
      name_company
      isActive
    }
  }
}
`