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
  query Workers {
    workers {
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

export const UPDATE_WORKER = gql`
  mutation UpdatedWorker($updateWorkerInput: UpdateWorkerInput!) {
    updatedWorker(updateWorkerInput: $updateWorkerInput) {
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

export const SUBCRIBE_WORKER = gql`
  subscription NewWorker {
    newWorker {
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
