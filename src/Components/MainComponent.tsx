import React from 'react';
import axios from 'axios';
//import RenderProducts from './RenderProducts';
import * as signalR from '@microsoft/signalr';
import PaginationComponent from './ProductPages/Pagination';
import GetProducts from './ProductPages/RenderProducts';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
    stock: number;
    type: string;
    horsePower: number;
    year: number;
    painterName: string;
}

interface DeletedProduct {
    id: string;
}

interface Pagination {
    CurrentPage: number;
    TotalPages: number;
    PageSize: number;
    TotalCount: number;
    HasPrevious: boolean;
    HasNext: boolean;
}



const MainComponent: React.FC = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [pagination, setPagination] = React.useState<Pagination | null>(null);

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




    const fetchProducts = (pageNumber: number) => {
        axios.get<Product[]>(`http://localhost:5222/paged?PageNumber=${pageNumber}&PageSize=5`)
            .then(response => {
                setProducts(response.data);

                // Extract pagination information from headers
                const paginationHeader = response.headers['x-pagination'];
                const paginationData: Pagination = JSON.parse(paginationHeader);
                setPagination(paginationData);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    };

    const handlePageChange = (selected: number) => {
        fetchProducts(selected + 1); // Adding 1 because the page numbers are 1-based
    };



    React.useEffect(() => {
        fetchProducts(1);
    }, []);


    return (
        <div className='mb-3'>
            {products.length > 0 && (
                <div className='mt-20'>
                    <GetProducts products={products} />

                </div>
            )}
            {pagination && (
                <PaginationComponent
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};


export default MainComponent;