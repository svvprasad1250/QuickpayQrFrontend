import { useState } from "react";
import api from "../../api/api";
import { PaymentContext } from "./paymentContext";

function PaymentProvider({children}){
    const [payments,setPayments] = useState([]);

    const newPayment = async(newpay)=>{
        try{
            const res = await api.post("/api/payments/create",newpay);
            setPayments(prev=>[...prev,res.data])
            return res.data;
        }catch(err){
            console.log(err)
        }
    }
    return(
        <PaymentContext.Provider
        value={{
            newPayment,
            payments
        }}
        >
            {children}
        </PaymentContext.Provider>
    )
}
export default PaymentProvider;