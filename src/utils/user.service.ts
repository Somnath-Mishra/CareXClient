import { axiosInstanceWithCredentials } from "./axiosConfig";
// import {authService} from "./auth.service";

export interface changePasswordInterface{
    oldPassword: string,
    newPassword: string,
    confirmPassword:string
}
export interface updateAccountDetailsInterface{
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phoneNumber:number
}
export interface updateAvatarInterface{
    avatar: File
}
export interface updateCoverImageInterface{
    coverImage: File
}

class UserService{
    constructor() { }
    async changePassword(data:changePasswordInterface) {
        try {
            const response = await axiosInstanceWithCredentials.post('/user/change-password', data, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/user.service.ts :: changePassword', error);
            throw error;
        }
    }
    async getCurrentUserDetails() {
        try {
            const response = await axiosInstanceWithCredentials.get('/user/current-user',{
                headers: { 'Content-Type': 'application/json' }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/user.service.ts :: getCurrentUserDetails', error);
            throw error;
        }
    }
    async updateAccountDetails(data:updateAccountDetailsInterface) {
        try {
            const response = await axiosInstanceWithCredentials.patch('/user/update-account-details', data, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/user.service.ts :: updateAccountDetails', error);
            throw error;
        }
    }
    async updateAvatar(data:any) {
        try {
            const formData = new FormData();
            formData.append('avatar', data);
            const response = await axiosInstanceWithCredentials.patch('/user/update-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/user.service.ts :: updateAvatar', error);
            throw error;
        }
    }
    async updateCoverImage(data:any) {
        try {
            const formData = new FormData();
            formData.append('coverImage', data);
            const response = await axiosInstanceWithCredentials.patch('/user/update-cover-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/user.service.ts :: updateCoverImage', error);
            throw error;
        }
    }
    async getDoctorDetailsByPatientProblems(patientProblems: string) {
        try {
            const response = await axiosInstanceWithCredentials.post('/user/get-doctor-details-to-solve-problem', { patientProblems }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/user.service.ts :: getDoctorDetailsByPatientProblems', error);
            throw error;
        }
    }
    async getAllDiseaseList() {
        try {
            const response = await axiosInstanceWithCredentials.get('/user/get-all-disease-list',{
                headers: { 'Content-Type': 'application/json' }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/user.service.ts :: getAllDiseaseList', error);
            throw error;
        }
    }
}

export const userService = new UserService();