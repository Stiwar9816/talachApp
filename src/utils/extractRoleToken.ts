import { ref } from "vue"

const role = ref('')

export const extractRoleFromToken = (token: any) => {
  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const roles = decodedToken.roles
  if (roles && roles.length > 0) {
    role.value = roles[0]
  }

  return role.value === 'superAdmin' ? true : false
}