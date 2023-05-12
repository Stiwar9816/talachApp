import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation ($signinInput: SigninInput!) {
    signin(signinInput: $signinInput) {
      token
      user {
        id
        fullName
      }
    }
  }
`
