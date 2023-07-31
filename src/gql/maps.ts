import gql from 'graphql-tag'

export const ALL_GEOFENCE = gql`
  query {
    companies {
      geofence
    }
  }
`

export const ALL_GEOFENCE_WORKER = gql`
  query {
    workers {
      geofence
    }
  }
`

export const ALL_LOCATION_WORKER = gql`
  query {
    workers {
      fullName
      lat
      lng
    }
  }
`

export const ALL_LOCATION = gql`
  query {
    companies {
      name_company
      lat
      lng
    }
  }
`

export const SUBSCRIBE_GEOFENCE = gql`
  subscription NewCompany {
    newCompany {
      geofence
    }
  }
`

export const SUBSCRIBE_GEOFENCE_WORKER = gql`
  subscription NewWorker {
    newWorker {
      geofence
    }
  }
`

export const SUBSCRIBE_LOCATION_WORKER = gql`
  subscription NewWorker {
    newWorker {
      lat
      lng
    }
  }
`

export const SUBSCRIBE_LOCATION = gql`
  subscription NewCompany {
    newCompany {
      lat
      lng
    }
  }
`
