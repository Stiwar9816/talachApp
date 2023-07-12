import { ref } from 'vue'

const fullName = ref('')

export const extractFullNameFromToken = (token: any) => {
  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const name = decodedToken.name
  if (name && name.length > 0) {
    fullName.value = name
  }

  return fullName.value
}