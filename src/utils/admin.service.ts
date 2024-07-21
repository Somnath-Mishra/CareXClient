import { axiosInstanceWithCredentials } from "./axiosConfig";
import { authService } from "./auth.service";

class AdminService{
    constructor() { }
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
    async verifyDoctorDetails(doctorId: string, isActivate:boolean) {
        try {
            const response = await axiosInstanceWithCredentials.patch('/admin/verify-doctor-details',
                {
                    doctorId, isActivate
                },
                {
                    headers: { "Content-Type": "application/json" ,'Authorization': `Bearer ${await this.getTokens()}`}
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