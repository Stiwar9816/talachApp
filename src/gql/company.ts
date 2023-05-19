import gql from 'graphql-tag'

export const ALL_COMPANIES = gql`
query Companies {
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
mutation CreateCompany($createCompanyInput: CreateCompanyInput!) {
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
mutation UpdateCompany($updateCompanyInput: UpdateCompanyInput!) {
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