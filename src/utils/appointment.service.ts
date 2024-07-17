import { axiosInstanceWithCredentials } from "./axiosConfig";

interface appointmentInterface {
    doctorUserName: string,
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
    async createAppointment(appointmentDetails: appointmentInterface) {
        try {
            const response = await axiosInstanceWithCredentials.post('/appointment/create-appointment', appointmentDetails, {
                headers: { "Content-Type": "application/json" }
            })
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: createAppointment', error);
            throw error;
        }
    }
    async cancelAppointment(appointmentId: string) {
        try {
            const response = await axiosInstanceWithCredentials.post(`/appointment/cancel-appointment`,
                {
                    appointmentId: appointmentId
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: cancelAppointment', error);
            throw error;
        }
    }
    async getUpcomingAppointmentDetails() {
        try {
            const response = await axiosInstanceWithCredentials.get('/appointment/get-appointment-details');
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
                headers: { 'Content-Type': 'multipart/form-data' }
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
                    headers: { "Content-Type": "application/json" }
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
                    headers: { "Content-Type": "application/json" }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: updateAppointmentStatus', error);
            throw error;
        }
    }
    async getPrescription(appointmentId:string) {
        try {
            const response = await axiosInstanceWithCredentials.get(`/appointment/get-prescription?appointmentId=${appointmentId}`);
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: getPrescription', error);
            throw error;
        }
    }
    async getAppointmentHistory() {
        try {
            const response = await axiosInstanceWithCredentials.get('/appointment/get-appointment-history');
            return response;
        } catch (error) {
            console.error('There was an error in utils/appointment.service.ts :: getAppointmentHistory', error);
            throw error;
        }
    }
}

export const appointmentService = new AppointmentService();