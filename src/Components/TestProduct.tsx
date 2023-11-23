import React from "react";

interface TestProductProps {
    makePayment: (product: TestProductDetails) => void;
}

export interface TestProductDetails {
    painter: string;
    painterName: string;
    purchasePrice: number;
    phoneNumber: string;
    image: string;
    stock: number;
}


const TestProduct: React.FC<TestProductProps> = ({ makePayment }) => {
    const testProduct: TestProductDetails = {
        painter: "Test Painter",
        painterName: "Test Painting",
        purchasePrice: 100,
        phoneNumber: "1234567890",
        image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        stock: 10,
    };

    const handlePurchase = () => {
        makePayment(testProduct);
    };

    return (
        <>
            <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={testProduct.image} alt="Test Painting" className="w-full h-48 object-cover" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{testProduct.painterName}</div>
                    <p className="text-gray-700 text-base">{testProduct.painter}</p>
                    <p className="text-gray-700 text-base">Price: ${testProduct.purchasePrice}</p>
                    <p className="text-gray-700 text-base">Stock: {testProduct.stock}</p>
                </div>
                <div className="px-6 py-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handlePurchase}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </>
    );
}

export default TestProduct;