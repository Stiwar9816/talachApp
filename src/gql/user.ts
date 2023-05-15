import gql from 'graphql-tag'

export const ALL_USERS = gql`
query {
  users {
    id
    fullName
    phone
    email
    roles
    isActive
  }
}
`

export const USER_BY_ID = gql`
query ($userId: Int!) {
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
mutation ($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    id
    fullName
    phone
    email
    roles
    isActive
  }
}
`

export const BLOCK_USER = gql`
mutation ($blockUserId: Int!) {
  blockUser(id: $blockUserId) {
    id
    isActive
  }
}
`