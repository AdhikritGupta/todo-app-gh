import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService, executeDeleteAccount, executeRegister } from "../api/AuthenticationApiService";
import { retrieveAllTodosForUsernameApi } from "../api/TodoApiService";

//1: Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const useAuthenticated = () => {
    return useAuth().isAuthenticated
}

export const useUsername = () => {
    return useAuth().username
}
//2: Share the created context with other components
export default function AuthProvider({ children }) {

    //3: Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [token, setToken] = useState(null)

    const [todos, setTodos] = useState(false);

    useEffect(() => {
        if(isAuthenticated && username) {
            refreshTodos();
        }
    }, [isAuthenticated, username]);

    async function refreshTodos() {
        try {
            const response = await retrieveAllTodosForUsernameApi(username);
            const todosPresent = response.data.length > 0;
            setTodos(todosPresent);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    

    async function refreshTodosDirect() {
        try {
            const response = await retrieveAllTodosForUsernameApi(username);
            const todosPresent = response.data.length > 0;
            setTodos(todosPresent); // Update state for consistency
            return todosPresent;
        } catch (error) {
            console.error('Error refreshing todos:', error);
            return false;
        }
    }
    
    

    async function login(username, password) {

        try {

            const response = await executeJwtAuthenticationService(username, password, token)

            if(response.status==200){
                
                const jwtToken = 'Bearer ' + response.data.token
                
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        // console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }

    async function register(username, password) {
        try {
            const response = await executeRegister(username, password);
            if (response.status === 200) {
                return await login(username, password);
            } else {
                console.error('Failed to register user');
                return false;
            }
        } catch (error) {
            console.error('Error registering user:', error);
            return false;
        }
    }


    async function deleteAccount() {
        // Refresh todos and retrieve the result directly
        const todosPresent = await refreshTodosDirect();
    
        console.log('Todos:', todosPresent);
    
        if (!token || !username) {
            console.error('User is not authenticated or username is missing');
            return false;
        }
    
        const password = prompt('Please enter your password to confirm account deletion:', '');
        if (!password) {
            console.error('Password is required to delete the account');
            return false;
        }
    
        try {
            if (todosPresent) {
                alert('Please delete all the todos before deleting the account');
                throw new Error('Please delete all the todos before deleting the account');
            }
            const response = await executeDeleteAccount(username, password);
            if (response.status === 200) {
                console.log('Account deleted successfully');
                logout(); // Clear authentication state after account deletion
                return true;
            } else {
                console.error('Failed to delete account');
                return false;
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            return false;
        }
    }
    
    

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, deleteAccount,register , username, token}  }>
            {children}
        </AuthContext.Provider>
    )
} 