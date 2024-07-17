import { axiosInstanceWithCredentials } from "./axiosConfig";

class PaymentService {
    constructor() { }
    async makePaymentByRazorPay(amount: number, doctorId: string) {
        try {
            const response = await axiosInstanceWithCredentials.post('/payment/make-payment-by-razor-pay', {
                amount: amount,
                doctorId: doctorId
            },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/payment.service.ts :: makePaymentByRazorPay', error);
            throw error;
        }
    }
    async verifyPaymentByRazorPay(razorpay_payment_id: string, razorpay_signature: string) {
        try {
            const response = await axiosInstanceWithCredentials.post('/payment/verify-payment-by-razor-pay', {
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature
            },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/payment.service.ts :: verifyPaymentByRazorPay', error);
            throw error;
        }
    }
    async makePaymentByStripe(amount: number, stripeTokenId: string, appointmentId: string, doctorId: string) {
        try {
            const response = await axiosInstanceWithCredentials.post('/payment/make-payment-by-stripe', {
                amount: amount,
                stripeTokenId: stripeTokenId,
                appointmentId: appointmentId,
                doctorId: doctorId
            },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            return response;
        } catch (error) {
            console.error('There was an error in utils/payment.service.ts :: makePaymentByStripe', error);
            throw error;
        }
    }
}


export const paymentService = new PaymentService();