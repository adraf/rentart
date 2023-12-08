const tokenName = 'SEI-76-BREADBORED-TOKEN'
export function setToken(token){
  localStorage.setItem(tokenName, token)
}

export function getToken(){
  return localStorage.getItem(tokenName)
}