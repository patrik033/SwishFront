import React from 'react';
import Navbar from './Navbar/Navbar';
import axios from 'axios';
import RenderProducts from './RenderProducts';
import * as signalR from '@microsoft/signalr';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
    stock: number;
}

interface DeletedProduct {
    id: string;
}



const MainComponent: React.FC = () => {
    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5198/productHub')
            .build();

        connection.start()
            .then(() => console.log('SignalR Connected'))
            .catch(err => console.error('SignalR Connection Error: ', err));

        connection.on('ProductCreated', (newProduct: Product) => {
            setProducts(prevProducts => [...prevProducts, newProduct]);
        });

        connection.on('ProductUpdated', (updatedProduct: Product) => {
            setProducts(prevProducts => {
                const updatedProducts = prevProducts.map(product => {
                    if (product.id === updatedProduct.id) {
                        console.log({ product, updatedProduct });
                        return { ...product, ...updatedProduct };
                    }
                    return product;
                });

                return updatedProducts;
            });
        });

        connection.on('ProductDeleted', (deletedProduct: DeletedProduct) => {
            setProducts(prevProducts => {
                const updatedProducts = prevProducts.filter(product => product.id !== deletedProduct.id);
                console.log(updatedProducts)
                return updatedProducts;
            });
        });

        return () => {
            connection.stop();
        };
    }, [setProducts]);



    React.useEffect(() => {
        axios.get<Product[]>('http://localhost:5222/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, []);

    return (
        <>
            <Navbar />
            {products.length > 0 && (
                <div className='mt-20'>
                    <RenderProducts products={products} />
                </div>
            )}
        </>
    );
};


export default MainComponent;