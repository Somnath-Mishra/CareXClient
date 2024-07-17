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

interface loginData {
    userName: string
    password: string
    confirmPassword: string
}

class AuthService {
    constructor() {

    }
    async register(data: registerData) {
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
            const response = await axiosInstanceWithCredentials.post('/user/logout');
            return response;
        } catch (error) {
            console.error('There was an error in utils/auth.service.ts :: logout', error);
            throw error;
        }
    }
    async refreshAccessToken(refreshToken:string) {
        try {
            const response = await axiosInstanceWithCredentials.post('/user/refresh-token',
                { refreshToken },
                { headers: { 'Content-Type': 'application/json' } }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/auth.service.ts :: refreshAccessToken', error);
            throw error;
        }
    }
}

export const authService = new AuthService();