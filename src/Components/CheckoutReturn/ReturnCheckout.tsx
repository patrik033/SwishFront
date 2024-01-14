import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnCheckout = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [amountTotal, setAmountTotal] = useState(0);
    const navigate = useNavigate();



    const fetchData = async () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        try {

            const response = await axios.get(`http://localhost:5056/api/Stripe/${sessionId}`)
            console.log(response.data);
            const data = response.data;
            setStatus(data.status);
            setCustomerEmail(data.customerEmail);
            setAmountTotal(data.amountTotal);
        }
        catch (error) {
            console.error('Error during checkout:', error);
        }
    }

    useEffect(() => {

        fetchData();

    }, []);

    useEffect(() => {
        if (status === 'open') {
            navigate('/checkout')
        }
    }, [status])

    return (

        <div>
            {status === 'complete' &&
                <section id="success" className="bg-green-200 p-8 rounded-md shadow-md">
                    <div className="flex items-center justify-center">
                        <img
                            src="success-icon.png" // Add the path to your success icon
                            alt="Success Icon"
                            className="w-12 h-12 mr-4"
                        />
                        <div>
                            <h2 className="text-2xl font-bold mb-2 text-green-800">Thank You for Your Purchase!</h2>
                            <p className="text-gray-700">
                                A confirmation email will be sent to {customerEmail}. You paid: {amountTotal / 100}.
                                If you have any questions, please email{' '}
                                <a href="mailto:orders@example.com" className="text-blue-500">
                                    orders@example.com
                                </a>
                                .
                            </p>
                        </div>
                    </div>
                </section>
            }
        </div>
    )

}

export default ReturnCheckout;