import gql from 'graphql-tag'

export const ALL_GEOFENCE = gql`
query {
  companies {
    geofence
  }
}
`
export const ALL_LOCATION = gql`
query {
  companies {
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

export const SUBSCRIBE_LOCATION = gql`
subscription NewCompany {
  newCompany {
    lat
    lng
  }
}
`