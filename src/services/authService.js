import { requestFactory } from './requester'


export const authService = (token) => {
    const baseUrl = 'http://localhost:3030/users'
    let result = requestFactory(token)
    return ({
        login: (data) => result.post(`${baseUrl}/login`, data),
        register: (data) => result.post(`${baseUrl}/register`, data),
        logout: () => result.get(`${baseUrl}/logout`),
    })
}
