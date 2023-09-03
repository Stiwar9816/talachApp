import gql from 'graphql-tag'

export const ALL_COMPANIES = gql`
  query Companies {
    companies {
      id
      name_company
      rfc
      phone
      bussiness_name
      address
      department
      city
      postal_code
      isActive
      geofence
      lat
      lng
      tax_regime
      user {
        id
        fullName
      }
    }
  }
`
export const ALL_COMPANIES_NAME = gql`
  query Companies {
    companies {
      id
      name_company
      isActive
    }
  }
`

export const COMPANY_BY_ID = gql`
  query ($companyId: String!) {
    company(id: $companyId) {
      id
      name_company
      phone
      bussiness_name
      address
      department
      city
      postal_code
      isActive
    }
  }
`
export const CREATE_COMPANY = gql`
  mutation CreateCompany($createCompanyInput: CreateCompanyInput!, $idTalachero: String!) {
    createCompany(createCompanyInput: $createCompanyInput, idTalachero: $idTalachero) {
      id
      name_company
      rfc
      phone
      bussiness_name
      address
      department
      city
      postal_code
      isActive
      geofence
      lat
      lng
      tax_regime
      user {
        id
        fullName
      }
    }
  }
`
export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($updateCompanyInput: UpdateCompanyInput!, $idTalachero: String) {
    updateCompany(updateCompanyInput: $updateCompanyInput, idTalachero: $idTalachero) {
      id
      name_company
      rfc
      phone
      bussiness_name
      address
      department
      city
      postal_code
      isActive
      geofence
      lat
      lng
      tax_regime
      user {
        id
        fullName
      }
    }
  }
`

export const WORKER_COUNT_BY_COMPANY = gql`
  query Query($companyId: String!) {
    workerCountByCompany(companyId: $companyId)
  }
`

export const SUBSCRIBE_COMPANY = gql`
  subscription NewCompany {
    newCompany {
      id
      name_company
      rfc
      phone
      bussiness_name
      address
      department
      city
      postal_code
      isActive
      geofence
      lat
      lng
      tax_regime
      user {
        id
        fullName
      }
    }
  }
`
