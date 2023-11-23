import React from 'react';
import TestProduct, { TestProductDetails } from './TestProduct';

const MainComponent: React.FC = () => {
    const makePayment = async (testProduct: TestProductDetails) => {
        try {
            // Make the API request to send the test product details
            const response = await fetch('https://your-api-url/api/payment/make-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testProduct),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error making payment:', error.message);
            } else {
                console.error('An unknown error occurred.');
            }
        }
    };

    return (
        <div>
            <TestProduct makePayment={makePayment} />
        </div>
    );
};

export default MainComponent;