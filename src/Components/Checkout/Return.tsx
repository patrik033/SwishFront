import axios from 'axios';
import { useState, useEffect } from 'react';
import {
    Navigate
} from "react-router-dom";


const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [amountTotal, setAmountTotal] = useState(0);
    const fetchData = async (sessionId: string | null) => {
        const response = await axios.get(`/session-status?session_id=${sessionId}`);
        const data = response.data;
        setCustomerEmail(data.customerEmail);
        setAmountTotal(data.amountTotal);
        setStatus(data.status);

        console.log(data);
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        fetchData(sessionId);
    }, []);

    if (status === 'open') {
        return (
            <Navigate to="/checkout" />
        )
    }

    if (status === 'complete') {
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be sent to {customerEmail}.
                    You paid: {amountTotal / 100}
                    If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        )
    }

    return null;
}
export default Return;
