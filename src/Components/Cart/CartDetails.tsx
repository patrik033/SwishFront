import axios from 'axios';
import { useUser } from '../Auth/User/UserContext';
import { useEffect, useState } from 'react';

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    category: string;
    categoryName: string;
}

interface CartDetailsResponse {
    totalAmount: number;
    totalCount: number;
    shoppingCartItems: CartItem[];
}

const CartDetails: React.FC = () => {
    const [cartDetails, setCartDetails] = useState<CartDetailsResponse | null>(null);
    const { user } = useUser();

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

    return (
        <div>
            <h2>Cart Details</h2>
            {cartDetails ? (
                <div>
                    <p>Total Amount: ${cartDetails.totalAmount}</p>
                    <p>Total Count: {cartDetails.totalCount}</p>
                    <ul>
                        {cartDetails.shoppingCartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - Quantity: {item.quantity} - Price: ${item.price} - Category: {item.categoryName}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading cart details...</p>
            )}
        </div>
    );
};

export default CartDetails;