import gql from 'graphql-tag'

export const CREATE_WORKER = gql`
  mutation CreateWorker($createWorkerInput: CreateWorkerInput!, $idCompany: String) {
    createWorker(createWorkerInput: $createWorkerInput, idCompany: $idCompany) {
      id
      fullName
      email
      phone
      companies {
        name_company
      }
      lat
      lng
      geofence
      isActive
    }
  }
`

export const ALL_WORKERS = gql`
  query Users($roles: [UserRoles!]) {
    users(roles: $roles) {
      id
      fullName
      email
      phone
      lat
      lng
      geofence
      isActive
      companies {
        name_company
      }
    }
  }
`

export const UPDATE_WORKER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      fullName
      email
      phone
      lat
      lng
      geofence
      isActive
      companies {
        name_company
      }
    }
  }
`

export const SUBCRIBE_WORKER = gql`
  subscription NewUser {
    newUser {
      user {
        id
        fullName
        email
        phone
        lat
        lng
        geofence
        isActive
        companies {
          name_company
        }
      }
    }
  }
`
