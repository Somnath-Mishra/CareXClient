import { axiosInstanceWithCredentials } from "./axiosConfig";
import { authService } from "./auth.service";

class AvaliableTimeService{
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
    async createAvaliableTime(dateTime: string, frequency:number) {
        try {
            const response = await axiosInstanceWithCredentials.post('/avaliableTime/create-avaliable-time', {
                dateTime: dateTime,
                frequency: frequency
            }, {
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${await this.getTokens()}` }
            });
            return response.data;
        } catch (error) {
            console.error('There was an error in services/avaliable-time.service.ts :: createAvaliableTime', error);
            throw error;
        }
    }
    async getAvaliableTime() {
        try {
            const response = await axiosInstanceWithCredentials.get('/avaliableTime/get-avaliable-time', {
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${await this.getTokens()}` },
                
            });
            return response.data;
        } catch (error) {
            console.error('There was an error in services/avaliable-time.service.ts :: getAvaliableTime', error);
            throw error;
        }
    }
    async deleteAvaliableTime(avaliableTimeId:string) {
        try {
            const response = await axiosInstanceWithCredentials.delete('/avaliableTime/delete-avaliable-time', {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await this.getTokens()}` },
                params:{
                    avaliableTimeId:avaliableTimeId
                }
            });
            return response.data;
        } catch (error) {
            console.error('There was an error in services/avaliable-time.service.ts :: deleteAvaliableTime', error);
            throw error;
        }
    }
}

export const avaliableTimeService = new AvaliableTimeService();