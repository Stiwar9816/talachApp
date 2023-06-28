import { gql } from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation Signin($signinInput: SigninInput!) {
    signin(signinInput: $signinInput) {
      token
      user {
        id
        fullName
        phone
        email
        roles
        isActive
      }
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation ($resetPassword: String!) {
  resetPassword(resetPassword: $resetPassword) {
    email
  }
}
`

export const RESET_PASSWORD_AUTH = gql`
  mutation ($newPassword: String!) {
  resetPasswordAuth(newPassword: $newPassword) {
    email
  }
}
`