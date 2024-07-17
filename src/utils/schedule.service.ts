import { axiosInstanceWithCredentials } from "./axiosConfig";

enum modeEnum{
    online,
    offline
}

class ScheduleService{
    constructor() { }
    async createSchedule(startTime:string, endTime:string, mode:modeEnum, location:string) {
        try {
            const response = await axiosInstanceWithCredentials.post('/schedule/create-schedule',
                {
                    startTime, endTime, mode, location
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            )
            return response;
        } catch (error) {
            console.error('There was an error in services/schedule.service.ts :: createSchedule', error);
            throw error;
        }
    }
    async updateScheduleDetails(scheduleId:string,startTime:string,endTime:string,mode:modeEnum,location:string) {
        try {
            const response = await axiosInstanceWithCredentials.patch('/schedule/update-schedule',
                {
                    scheduleId, startTime, endTime, mode, location
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            )
            return response;
        } catch (error) {
            console.error('There was an error in services/schedule.service.ts :: updateScheduleDetails', error);
            throw error;
        }
    }
    async deleteSchedule(scheduleId:string) {
        try {
            const response = await axiosInstanceWithCredentials.delete(`/schedule/delete-schedule`, 
                {
                    headers: { "Content-Type": "application/json" },
                    data:{
                        scheduleId
                    }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in services/schedule.service.ts :: deleteSchedule', error);
            throw error;
        }
    }
    async getSchedules(doctorId:string) {
        try {
            const response = await axiosInstanceWithCredentials.get('/schedule/get-schedule', {
                headers: { "Content-Type": "application/json" },
                params:{
                    doctorId
                }
            });
            return response;
        } catch (error) {
            console.error('There was an error in services/schedule.service.ts :: getSchedules', error);
            throw error;
        }
    }
}

export const scheduleService = new ScheduleService();