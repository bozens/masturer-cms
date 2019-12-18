import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  const tokenBase = `Basic ${Base64.encode(`${token}:randomPassword`)}`
  console.log('tokenBase', tokenBase)
  return Cookies.set(TokenKey, tokenBase)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
