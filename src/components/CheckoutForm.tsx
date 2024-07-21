import {useStripe,useElements,PaymentElement} from '@stripe/react-stripe-js'


const CheckoutForm=()=>{
  const stripe=useStripe();
  const elements=useElements();
  const handleSubmit=async(event)=>{
    event.preventDefault();
    if(!stripe||!elements){
      return;
    }
    const result=await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:`http://localhost:5173/user/${userId}/appointment`
      }
    })
    if(result.error){
      console.log(result.error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement/>
      <button disabled={!stripe}>Submit</button>
    </form>
  )

}
export default CheckoutForm;