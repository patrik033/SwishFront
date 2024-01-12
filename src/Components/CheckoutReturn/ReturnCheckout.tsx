import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnCheckout = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

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
            setCustomerEmail(data.customer_email);
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
                <section id="success">
                    <p>
                        We appreciate your business! A confirmation email will be sent to {customerEmail}.

                        If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                    </p>
                </section>
            }
        </div>
    )

}

export default ReturnCheckout;