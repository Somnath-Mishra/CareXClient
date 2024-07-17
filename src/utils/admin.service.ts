import { axiosInstanceWithCredentials } from "./axiosConfig";

class AdminService{
    constructor() { }
    async verifyDoctorDetails(doctorId: string, isActivate:boolean) {
        try {
            const response = await axiosInstanceWithCredentials.patch('/admin/verify-doctor-details',
                {
                    doctorId, isActivate
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/admin.service.ts :: verifyDoctorDetails', error);
            throw error;
        }
    }
}

export const adminService = new AdminService();