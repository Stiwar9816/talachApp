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