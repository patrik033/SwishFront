import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useUser } from "../Auth/User/UserContext";
import axios from 'axios';

interface OrderObject {
    count: number;
    userId: string;
    email: string;
}

const CartIcon = () => {
    const [itemCount, setItemCount] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5198/productHub')
            .build();

        const fetchInitialCartCount = async () => {
            try {
                const response = await axios.get<OrderObject>(`http://localhost:5056/current/${user?.email}`);
                if (response.status === 200) {
                    console.log("Message sent")
                }
            } catch (error) {
                console.error('Error fetching initial cart count', error);
            }
        };

        connection.start().then(() => {
            connection.on('order', (order: OrderObject) => {
                console.log(order);
                setItemCount(order.count);
                setUserEmail(order.email);
            });

            if (user?.email) {
                fetchInitialCartCount();
            }
        });

        return () => {
            connection.stop();
        };
    }, [user?.email]); // Include user?.email in the dependency array

    useEffect(() => {
        if (userEmail === user?.email) {
            setIsValid(true);
        }
    }, [userEmail, user?.email]); // Include userEmail and user?.email in the dependency array


    return (
        <div>
            {/* Render your cart icon with the itemCount */}
            {isValid && (
                <span>Cart: {itemCount > 10 ? '10+' : itemCount}</span>
            )}
        </div>
    );
};

export default CartIcon;