import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../Auth/User/UserContext';

interface CartDetailsResponse {
    totalAmount: number;
    totalCount: number;
    shoppingCartItems: CartItem[];
}

interface CartItem {
    Id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    categoryName: string;
    image: string;
    stock: number;
}

interface AddressDetails {
    streetAddress: string;
    city: string;
    zipCode: string;
}

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartDetails] = useState<CartDetailsResponse | null>(
        location.state?.cartDetails || null
    );
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [addressDetails, setAddressDetails] = useState<AddressDetails | null>(null);
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [inputValues, setInputValues] = useState<AddressDetails>({ streetAddress: '', zipCode: '', city: '' });
    const { user } = useUser();
    console.log(cartDetails);

    useEffect(() => {
        if (!location.state || !location.state.cartDetails) {
            // Redirect back to CartDetails page if cartDetails data is not available
            navigate('/cart-details');
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (clientSecret !== null) {
            navigate('/checkout', { state: { clientSecret } });
        }
    }, [clientSecret])

    useEffect(() => {
        if (user?.email) {
            fetchAddressDetails();
        }
    }, [user?.email]);

    const handleCheckout = async () => {
        try {

            console.log(addressDetails)
            const data = addressDetails
            const response = await axios.post(`http://localhost:5056/api/Stripe/${user?.email}`, data)
            const responseData = response.data;
            console.log(responseData)
            setClientSecret(responseData.clientSecret);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };




    const fetchAddressDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5025/api/Authentication/address/${user?.email}`);
            setAddressDetails(response.data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    // Address not found, set addressDetails to null
                    setAddressDetails(null);
                } else if (error.response?.status === 400) {
                    // Bad Request, handle as necessary (e.g., log the error)
                    console.error('Bad Request:', error);
                } else {
                    // Other errors, log the error
                    console.error('Error fetching address details', error);
                }
            }
        }
    }

    let sek = new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
        //minimumFractionDigits: 0
    });

    const renderProducts = (products: CartItem[]) => {
        return (
            <ul className='mb-4'>
                {products.map((item, index) => (
                    <li key={index}>
                        <div key={index} className="max-w-xs mx-auto mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={item.image || ''} alt={`Product `} className="w-full h-32 object-cover" />
                            <div className="px-6 py-4">
                                <div className='flex justify-between items-center'>
                                    <div className="font-bold text-xl mb-2">{item.name}</div>
                                </div>
                                <p className="text-gray-700 text-base">Price: {sek.format(item.price)}</p>
                                <p className="text-gray-700 text-base">Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    const handleAddressChange = (field: keyof AddressDetails, value: string) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleSaveAddress = () => {
        setAddressDetails(inputValues);
    };
    const renderAddressForm = () => (
        <div>
            <h2 className="text-2xl font-bold mb-4">Address Information</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Street Address:</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={inputValues.streetAddress}
                    onChange={(e) => handleAddressChange('streetAddress', e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code:</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={inputValues.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={inputValues.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                />
            </div>
            <button
                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700 focus:outline-none"
                onClick={handleSaveAddress}
            >
                Save Address
            </button>
        </div>
    );

    const handleDeliveryOptionChange = (value: string) => {
        setSelectedDeliveryOption(value);
    };

    const handlePaymentOptionChange = (value: string) => {
        setSelectedPaymentOption(value);
    };
    console.log(selectedDeliveryOption)
    console.log(selectedPaymentOption)
    // Additional logic for carrier, payment method, and checkout process goes here

    return (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start items-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #13432</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st March 2021 at 10:34 PM</p>
            </div>

            <div className="mt-10 flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                {/* Products Section - Always on Top */}
                <div className="flex-1 p-4">
                    <h2 className="text-2xl font-bold mb-4">Products</h2>
                    {cartDetails ? (
                        <div>
                            {renderProducts(cartDetails.shoppingCartItems)}

                            <div className=" text-white py-2 px-4 mb-4">
                                <p className="bg-blue-500 text-xl font-bold mb-2">Total Amount: {sek.format(cartDetails.totalAmount)}</p>
                                <p className="bg-blue-500 text-lg font-bold mb-2">Total Count: {cartDetails.totalCount}</p>


                            </div>
                        </div>
                    ) : (
                        <p>Loading cart details...</p>
                    )}
                    {/* Render products as in the CartDetails component */}
                </div>

                {/* Left Section - User Information */}
                <div className="flex-1 p-4">
                    <h2 className="text-2xl font-bold mb-4">User Information</h2>
                    <p>Email: {user?.email}</p>

                    {/* Delivery Options Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Delivery Options</h2>
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="postnord"
                                name="deliveryOption"
                                value="postnord"
                                // Handle the change event
                                onChange={(e) => handleDeliveryOptionChange(e.target.value)}
                            />
                            <label htmlFor="postnord" className="ml-2 cursor-pointer">
                                <img src="postnord-image-url" alt="PostNord" className="w-8 h-8" />
                                PostNord
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="dhl"
                                name="deliveryOption"
                                value="dhl"
                                onChange={(e) => handleDeliveryOptionChange(e.target.value)}
                            />
                            <label htmlFor="dhl" className="ml-2 cursor-pointer">
                                <img src="dhl-image-url" alt="DHL" className="w-8 h-8" />
                                DHL
                            </label>
                        </div>
                    </div>

                    {/* Payment Options Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Payment Options</h2>
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="swish"
                                name="paymentOption"
                                value="swish"
                                onChange={(e) => handlePaymentOptionChange(e.target.value)}
                            />
                            <label htmlFor="swish" className="ml-2 cursor-pointer">
                                <img src="swish-image-url" alt="Swish" className="w-8 h-8" />
                                Swish
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="card"
                                name="paymentOption"
                                value="card"
                                onChange={(e) => handlePaymentOptionChange(e.target.value)}
                            />
                            <label htmlFor="card" className="ml-2 cursor-pointer">
                                <img src="card-image-url" alt="Card" className="w-8 h-8" />
                                Card
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Section - Address Information */}
                <div className="flex-1 p-4">
                    {addressDetails && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Address Information</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Street Address:</label>
                                <p>{addressDetails.streetAddress}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code:</label>
                                <p>{addressDetails.zipCode}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">City:</label>
                                <p>{addressDetails.city}</p>
                            </div>
                        </div>
                    )}
                    {!addressDetails && renderAddressForm()}
                </div>
            </div>

            {/* Checkout Button - Always at the Bottom */}
            <div className="flex justify-center items-center">
                <button
                    className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800  w-96 2xl:w-full text-base font-medium leading-4 text-gray-800"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;