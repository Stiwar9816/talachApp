import gql from 'graphql-tag'

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
      roles
      companiesWorker {
        name_company
      }
    }
  }
`

export const UPDATE_WORKER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!, $idCompany: String) {
    updateUser(updateUserInput: $updateUserInput, idCompany: $idCompany) {
      id
      fullName
      email
      phone
      lat
      lng
      geofence
      isActive
      companiesWorker {
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
        companiesWorker {
          name_company
        }
      }
    }
  }
`
