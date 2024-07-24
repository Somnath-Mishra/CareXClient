import { axiosInstanceWithCredentials, axiosInstanceWithoutCredentials } from "./axiosConfig";

export interface registerData {
    userName: string
    email: string
    phoneNumber: number
    firstName: string
    lastName: string
    address: string
    password: string
    confirmPassword: string
    avatar: File
    coverImage: File,
}

export interface loginData {
    email: string
    password: string
    confirmPassword: string
}

class AuthService {
    constructor() {

    }
    async getTokens() {
        let accessToken = authService.getAccessToken();
        if (!accessToken) {
            accessToken = await authService.refreshAccessToken();
        }
        if (!accessToken) {
            throw new Error('Failed to get access token');
        }
        return accessToken;
    }
    async register(data: any) {
        try {
            const response = await axiosInstanceWithoutCredentials.post('/user/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response;
        } catch (error) {
            console.error('There was an error in utils/auth.service.ts :: register', error);
            throw error;
        }
    }
    async login(data: loginData) {
        try {
            const response = await axiosInstanceWithCredentials.post('/user/login', data, {
                headers: { 'Content-Type': 'application/json' }
            })
            return response;
        } catch (error) {
            console.error('There was an error in utils/auth.service.ts :: login', error);
            throw error;
        }
    }
    async logout() {
        try {
            const response = await axiosInstanceWithCredentials.post('/user/logout',{},{
                headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${this.getTokens()}`}
            });
            return response;
        } catch (error) {
            console.error('There was an error in utils/auth.service.ts :: logout', error);
            throw error;
        }
    }
    async refreshAccessToken() {
        try {
            const refreshToken = this.getRefreshToken();
            if(!refreshToken){
                throw new Error('No refresh token available');
            }
            const response = await axiosInstanceWithCredentials.post('/user/refresh-token',
                { refreshToken },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if(response.status===200){
                this.setAccessToken(response.data.data.accessToken);
                return response.data.data.accessToken;
            }
            else{
                this.removeTokens();
                throw new Error(response.data.message || 'Failed to refresh access token');
            }
        } catch (error) {
            console.error('There was an error in utils/auth.service.ts :: refreshAccessToken', error);
            throw error;
        }
    }
    getAccessToken=()=>localStorage.getItem('accessToken');
    getRefreshToken=()=>localStorage.getItem('refreshToken');
    setAccessToken=(token:string)=>localStorage.setItem('accessToken',token);
    setRefreshToken=(token:string)=>localStorage.setItem('refreshToken', token);
    removeTokens=()=>{localStorage.removeItem('accessToken');localStorage.removeItem('refreshToken');}
    
}

export const authService = new AuthService();