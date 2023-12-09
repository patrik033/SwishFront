import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CarDetails from "../EntityDetails/CarDetails";
import PaintingDetails from "../EntityDetails/PaintingDetails";
import NumberSelector from "../Pickers/NumberSelector";



interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
    stock: number;
    type: string;
    horsePower?: number;
    year?: number;
    painterName?: string;
}



const ProductDetails: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [productDetails, setProductDetails] = useState<Product | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:5222/api/products/${id}`)
            .then(response => {
                setProductDetails(response.data)
            })
            .catch(err => console.log(err));
    }, [id]);



    const getTypeSpecificComponent = (product: Product) => {
        console.log(product)
        switch (product.type) {
            case "Car":
                return <CarDetails {...product} />;
            case "Painting":
                return <PaintingDetails {...product} />;
            default:
                return null;
        }
    }

    let sek = new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
        //minimumFractionDigits: 0
    });

    return (
        <>
            <h2>Product Details</h2>
            <div className="flex flex-wrap justify-around">
                {productDetails && (
                    <div key={productDetails.id} className="max-w-xs mx-auto mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={productDetails.image || ''} alt={`Product `} className="w-full h-48 object-cover" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{productDetails.name}</div>
                            <p className="text-gray-700 text-base">Price: {sek.format(productDetails.price)}</p>
                            <p className="text-gray-700 text-base">Stock: {productDetails.stock}</p>
                            {getTypeSpecificComponent(productDetails)}
                        </div>
                        <div className="mb-3 px-6">
                            <NumberSelector min={0} max={productDetails.stock} onChange={() => { }} />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center text-gray-900 mb-2">
                            <button
                                className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
                                to cart</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetails;