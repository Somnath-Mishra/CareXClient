import { authService, registerData } from "./auth.service";
import { axiosInstanceWithCredentials, axiosInstanceWithoutCredentials } from "./axiosConfig";

interface uploadDoctorSpecificDetailsInterface{
    degree: string,
    instituteName: string,
    specialization: string[],
    visitFees: number,
    avaliableTimeIds:string[]
}
interface doctorRegisterInterface extends registerData{
    role: 'doctor',
    licence: File,
    visitFees: number,
    degree: string,
    instituteName: string,
    specialization:string[]
}

class DoctorService{
    constructor() { }
    async uploadDoctorSpecificDetails(data:uploadDoctorSpecificDetailsInterface) {
        try {
            const response = await axiosInstanceWithCredentials.post('/doctor/upload-doctor-specific-details',
                {
                    degree: data.degree,
                    instituteName: data.instituteName,
                    specialization: data.specialization,
                    visitFees: data.visitFees,
                    avaliableTimeIds: data.avaliableTimeIds
                },
                {
                    headers: { "Content-Type": "application/json",'Authorization': `Bearer ${authService.getTokens()}` }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in services/doctor.service.ts :: uploadDoctorSpecificDetails', error);
            throw error;
        }
    }
    async register(data:doctorRegisterInterface) {
        try {
            // const formData = new FormData();
            // formData.append('avatar', data.avatar);
            // formData.append('coverImage', data.coverImage);
            // formData.append('userName', data.userName);
            // formData.append('email', data.email);
            // formData.append('password', data.password);
            // formData.append('confirmPassword', data.confirmPassword);
            // formData.append('firstName', data.firstName);
            // formData.append('lastName', data.lastName);
            // formData.append('address', data.address);
            // formData.append('role', data.role);
            // formData.append('email', data.email);
            // formData.append('password', data.password);
            // formData.append('licence', data.licence);
            // formData.append('degree', data.degree);
            // formData.append('instituteName', data.instituteName);
            // formData.append('specialization', JSON.stringify(data.specialization));
            // formData.append('visitFees', JSON.stringify(data.visitFees));
            const response = await axiosInstanceWithoutCredentials.post('/doctor/doctor-register', data);
            return response;
        } catch (error) {
            console.error('There was an error in services/doctor.service.ts :: register', error);
            throw error;
        }
    }
    async getPatientDetails(patientId:string) {
        try {
            const response = await axiosInstanceWithCredentials.get('/doctor/get-patient-details', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authService.getTokens()}` },
                params: { patientId: patientId }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/doctor.service.ts :: getPatientDetails', error);
            throw error;
        }
    }
}

export const doctorService = new DoctorService();