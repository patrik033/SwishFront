import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { useUser } from "../Auth/User/UserContext";



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

        connection.start().then(() => {
            connection.on('order', (order: OrderObject) => {
                console.log(order)
                setItemCount(order.count);
                setUserEmail(order.email);
            });
        });

        return () => {
            connection.stop();
        };
    }, []);

    useEffect(() => {
        if (userEmail === user?.email) {
            setIsValid(true);
        }
    }, [userEmail]);

    return (
        <div>
            {/* Render your cart icon with the itemCount */}
            {isValid &&
                <span>Cart: {itemCount > 10 ? '10+' : itemCount}</span>
            }
        </div>
    );
};

export default CartIcon;