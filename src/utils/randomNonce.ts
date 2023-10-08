export const randomNonce = () => {
  const letters = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVXYZabcdefghijklmnñopqrtuvwxyz*-/!#$%&_+¡'
  let nonce = ''

  for (let i = 0; i < 8; i++) {
    nonce += letters[Math.floor(Math.random() * 73)]
  }
  return nonce
}