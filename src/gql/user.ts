import gql from 'graphql-tag'

export const ALL_USERS = gql`
  query ($roles: [UserRoles!]) {
    users(roles: $roles) {
      id
      fullName
      rfc
      phone
      email
      roles
      isActive
    }
  }
`

export const CREATE_USER = gql`
  mutation Signup($signupInput: SignupInput!, $idCompany: String) {
    signup(signupInput: $signupInput, idCompany: $idCompany) {
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

export const USER_BY_ID = gql`
  query ($userId: String!) {
    user(id: $userId) {
      id
      fullName
      phone
      email
      roles
      isActive
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      fullName
      rfc
      phone
      email
      roles
      isActive
    }
  }
`

export const BLOCK_USER = gql`
  mutation ($blockUserId: String!) {
    blockUser(id: $blockUserId) {
      id
      isActive
    }
  }
`

export const SUBSCRIBE_USER = gql`
  subscription NewUser {
    newUser {
      user {
        id
        fullName
        rfc
        phone
        email
        roles
        isActive
      }
    }
  }
`
