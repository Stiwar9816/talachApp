import gql from 'graphql-tag'

export const ALL_COMPANIES = gql`
query {
  companies {
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

export const COMPANY_BY_ID = gql`
query ($companyId: Int!) {
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
mutation ($createCompanyInput: CreateCompanyInput!) {
  createCompany(createCompanyInput: $createCompanyInput) {
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
export const UPDATE_COMPANY = gql`
mutation ($updateCompanyInput: UpdateCompanyInput!) {
  updateCompany(updateCompanyInput: $updateCompanyInput) {
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