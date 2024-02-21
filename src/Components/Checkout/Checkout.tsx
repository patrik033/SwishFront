import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from 'react-router-dom';

interface CheckoutPageProps {


}

const stripePromise = loadStripe('pk_test_51L17hRG6o6awavjH08zfVTOUK48EoSekCcFfHksrFTXjdZp8Rk066iO0XweUv2XPSXisnDNDMpfDEzrHJ4QiYkjc00SfMpcWii');

const Checkout: React.FC<CheckoutPageProps> = () => {
    const location = useLocation();
    const clientSecret = location.state && location.state.clientSecret;

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >

                    <EmbeddedCheckout />

                </EmbeddedCheckoutProvider>
            )}
        </div>
    )
}

export default Checkout;
