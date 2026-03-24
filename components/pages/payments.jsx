import React, { useState } from 'react'
import { usePayment } from '../../context/paymentContext/paymentContext'
import "./payments.css";

function Payments() {
    const {newPayment} = usePayment()
    const [qr,setQr] = useState(null)
    const [paymentId,setPaymentId] = useState(null);
    const [formfeilds,setFormfeilds]=useState({
        name:"",
        amount:0,
        email:"",
    });
    const [loading,setLoading] = useState(false);
    const handleSubmit = async()=>{
        const {name,email,amount} = formfeilds;
        if(!name || !email || !amount){
            alert("Please enter the Fields");
            return;
        }
        setLoading(true)
        const res = await newPayment(formfeilds)
        console.log(res)
        setQr(res.qrCode);
        setPaymentId(res._id);
        setLoading(false)
        setFormfeilds({
            name:"",
            amount:0,
            email:""
        })
    }
    const downloadQR = ()=>{
        if(!qr) return;
        const link = document.createElement("a")
        link.href = qr
        link.download = "payment-qr.png"
        document.body.append(link)
        link.click()
        document.body.removeChild(link)
    }
    const shareWhatsApp = (paymentId) => {
        const payUrl = `https://quickpayqrbackend.onrender.com/api/payments/pay/${paymentId}`;

        const text = encodeURIComponent(
            `Pay securely using this link:\n${payUrl}`
        );

        window.open(`https://wa.me/?text=${text}`, "_blank");
    };

    return (
        <div className='container'>
            <div className='maindiv'>
                <div className='inputField'>
                    <input
                    placeholder='Name'
                    type='text'
                    value={formfeilds.name}
                    onChange={(e)=>setFormfeilds((prev)=>({...prev,name:e.target.value}))}
                    />
                </div>
                <div>
                    <input
                    placeholder='Amount'
                    type='number'
                    value={formfeilds.amount === 0 ? "" : formfeilds.amount}
                    onChange={(e)=>setFormfeilds((prev)=>({...prev,amount:Number(e.target.value)}))}
                    />
                </div>
                <div>
                    <input
                    placeholder='Email'
                    type='email'
                    value={formfeilds.email}
                    onChange={(e)=>setFormfeilds((prev)=>({...prev,email:e.target.value}))}
                    />
                </div>
                <div>
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
            {
                qr &&(
                    <div className='maindivscanner'>
                        <div>
                            <img src={qr} alt="" />
                        </div>
                        <button onClick={downloadQR} className='downloadbutton'>
                            Download QR
                        </button>
                        <button onClick={()=>shareWhatsApp(paymentId)} className='sharebutton'>
                            Share on WhatsApp Link
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Payments
