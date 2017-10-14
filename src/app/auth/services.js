import http from '@/http'

export const postLogin = (username, password) => {
  return http.get('https://uinames.com/api/?ext')
             .then(response => response.data)
}
