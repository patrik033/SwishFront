import axios from 'axios';
import { useUser } from '../Auth/User/UserContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import NumberSelector from '../Pickers/NumberSelector';

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

interface CartDetailsResponse {
    totalAmount: number;
    totalCount: number;
    shoppingCartItems: CartItem[];
}

const CartDetails: React.FC = () => {
    const [cartDetails, setCartDetails] = useState<CartDetailsResponse | null>(null);
    const { user } = useUser();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartDetails = async () => {
            try {
                const response = await axios.get<CartDetailsResponse>(`http://localhost:5056/listItems/${user?.email}`);
                setCartDetails(response.data);
            } catch (error) {
                console.error('Error fetching cart details', error);
            }
        };

        if (user?.email) {
            fetchCartDetails();
        }
    }, [user?.email]);


    let sek = new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
        //minimumFractionDigits: 0
    });

    const handleDecrease = async (userEmail: string | undefined, productId: string) => {
        try {
            // Make API call for decrease logic
            const response = await axios.post(`http://localhost:5056/api/Order/${userEmail}/${productId}`);

            // Check if the decrease was successful (status code 200)
            if (response.status === 200) {
                // Optionally, you can update your component state or perform any other actions
                console.log('Decrease successful');
                const responseData = await axios.get<CartDetailsResponse>(`http://localhost:5056/listItems/${user?.email}`);
                setCartDetails(responseData.data);
            } else {
                console.error('Decrease failed:', response.data);
            }
        } catch (error) {
            console.error('Error while decreasing:', error);
        }
    };

    const handleIncrease = async (userName: string | undefined, productId: string, quantity: number) => {
        try {
            const data = { userName, productId, quantity }
            const response = await axios.post(`http://localhost:5056/api/Order`, data);
            if (response.status === 200) {
                console.log('Increase successful');
                const responseData = await axios.get<CartDetailsResponse>(`http://localhost:5056/listItems/${user?.email}`);
                setCartDetails(responseData.data);
            }
            else {
                console.error('Increase failed:', response.data);
            }
        } catch (error) {
            console.error('Error while decreasing:', error);
        }
    };

    const handleRemove = async (userName: string | undefined, productId: string) => {
        try {

            const response = await axios.delete(`http://localhost:5056/api/Order/${userName}/${productId}`);
            if (response.status === 200) {
                console.log('Remove successful');
                const responseData = await axios.get<CartDetailsResponse>(`http://localhost:5056/listItems/${user?.email}`);
                setCartDetails(responseData.data);
            }
            else {
                console.error('Remove failed:', response.data);
            }
        } catch (error) {
            console.error('Error while decreasing:', error);
        }
    };

    const handleCheckout = async () => {
        try {

            const response = await axios.post(`http://localhost:5056/api/Stripe/${user?.email}`)
            const data = response.data;
            console.log(data)
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    useEffect(() => {
        if (clientSecret !== null) {
            navigate('/checkout', { state: { clientSecret } });
        }
    }, [clientSecret])


    return (
        <div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Cart Details</h2>
                {cartDetails ? (
                    <div>
                        <ul className='mb-4'>
                            {cartDetails.shoppingCartItems.map((item, index) => (
                                <li key={index}>
                                    <div key={index} className="max-w-xs mx-auto mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
                                        <img src={item.image || ''} alt={`Product `} className="w-full h-32 object-cover" />
                                        <div className="px-6 py-4">
                                            <div className='flex justify-between items-center'>
                                                <div className="font-bold text-xl mb-2">{item.name}</div>
                                                <button
                                                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none"
                                                    onClick={() => handleRemove(user?.email, item.category)}>
                                                    Remove
                                                </button>
                                            </div>
                                            <p className="text-gray-700 text-base">Price: {sek.format(item.price)}</p>
                                            <p className="text-gray-700 text-base">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="mb-3 px-6 flex justify-between items-center">
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none"
                                                disabled={item.quantity >= item.stock}
                                                onClick={() => handleIncrease(user?.email, item.category, 1)}
                                            >
                                                Increase
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none"
                                                disabled={item.quantity <= 1}
                                                onClick={() => handleDecrease(user?.email, item.category)}
                                            >
                                                Decrease
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className=" text-white py-2 px-4 mb-4">
                            <p className="bg-blue-500 text-xl font-bold mb-2">Total Amount: {sek.format(cartDetails.totalAmount)}</p>
                            <p className="bg-blue-500 text-lg font-bold mb-2">Total Count: {cartDetails.totalCount}</p>
                            <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700 focus:outline-none"
                                onClick={handleCheckout}>
                                Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Loading cart details...</p>
                )}
            </div>

        </div>
    );
};

export default CartDetails;