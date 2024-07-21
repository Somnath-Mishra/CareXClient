import { authService } from "./auth.service";
import { axiosInstanceWithCredentials } from "./axiosConfig";


interface appointmentInterface {
    doctorId: string,
    scheduleId: string,
    paymentId: string,
    timeZone: string,
    country: string
}
enum appointmentStatus {
    "Scheduled" = "scheduled",
    "Cancelled" = "cancelled",
    "Completed" = "completed",
    "Pending" = "pending"
}
interface updateAppointmentStatusInterface {
    appointmentId: string,
    appointmentStatus: appointmentStatus
}


class AppointmentService {
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
    async createAppointment(appointmentDetails: appointmentInterface) {
        try {
            const response = await axiosInstanceWithCredentials.post('/appointment/create-appointment', appointmentDetails, {
                headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${this.getTokens()}` }
            })
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: createAppointment', error);
            throw error;
        }
    }
    async cancelAppointment(appointmentId: string) {
        try {
            console.log(appointmentId);
            const response = await axiosInstanceWithCredentials.delete(`/appointment/cancel-appointment`,
                {
                    data: {
                        appointmentId
                    },
                    headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${this.getTokens()}` }
                },

            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: cancelAppointment', error);
            throw error;
        }
    }
    async getUpcomingAppointmentDetails() {
        try {
            const response = await axiosInstanceWithCredentials.get('/appointment/get-appointment-details', {
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${this.getTokens()}` }
            });
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: getUpcomingAppointmentDetails', error);
            throw error;
        }
    }
    async addPrescription(appointmentId: string, prescription: File) {
        try {
            const formData = new FormData();
            formData.append('prescription', prescription);
            formData.append('appointmentId', appointmentId);
            const response = await axiosInstanceWithCredentials.post('/appointment/add-prescription', formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${this.getTokens()}` }
            });
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: addPrescription', error);
            throw error;
        }
    }
    async addPaymentDetails(appointmentId: string, paymentId: string) {
        try {
            const response = await axiosInstanceWithCredentials.post('/appointment/add-payment-details', {
                appointmentId: appointmentId,
                paymentId: paymentId
            },
                {
                    headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${this.getTokens()}` }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: addPaymentDetails', error);
            throw error;
        }
    }
    async updateAppointmentStatus(data: updateAppointmentStatusInterface) {
        try {
            const response = await axiosInstanceWithCredentials.post('/appointment/update-appointment-status',
                data,
                {
                    headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${this.getTokens()}` }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: updateAppointmentStatus', error);
            throw error;
        }
    }
    async getPrescription(appointmentId: string) {
        try {
            const response = await axiosInstanceWithCredentials.get(`/appointment/get-prescription?appointmentId=${appointmentId}`, {
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${this.getTokens()}` }
            });
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: getPrescription', error);
            throw error;
        }
    }
    async getAppointmentHistory() {
        try {
            const response = await axiosInstanceWithCredentials.get('/appointment/get-appointment-history', {
                headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${this.getTokens()}` }
            });
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: getAppointmentHistory', error);
            throw error;
        }
    }

}

export const appointmentService = new AppointmentService();