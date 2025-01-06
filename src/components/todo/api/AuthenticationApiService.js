import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService
    = (token) => apiClient.get(`/basicauth`
    ,{
        headers: {
            Authorization: token
        }
    }
    )

export const executeJwtAuthenticationService
    = (username, password) => 
        apiClient.post(`/authenticate`,{username,password})

    export const executeDeleteAccount = (username, password, token) => {
        return apiClient.delete('/delete-user', {
            headers: {
                Authorization: token,
            },
            data: {
                username,
                password,
            },
        });
    };

export const executeRegister = (username, password) =>
    apiClient.post(`/create-user`, { username, password })


