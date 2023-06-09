import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { useErrorsStore } from '../stores/useErrors'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})
const errorHandler = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    useErrorsStore().$state = {
      message: graphQLErrors[0].message,
      // category: graphQLErrors[0].extensions.category,
      // fields: graphQLErrors[0].extensions.validation ?? { input: {} }
    }
})


const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
// HTTP connection to the API
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_GRAPHQL_URL,
  credentials: 'include'
})
const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_URL_WS,
    lazy: true,
    connectionParams() {
      return  headers 
    },
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  authLink.concat(wsLink),
  authLink.concat(errorHandler.concat(httpLink))
)



// Cache implementation
const cache = new InMemoryCache({
  addTypename: false
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: splitLink,
  cache
})

export default apolloClient
