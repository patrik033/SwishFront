import NumberSelector from "../Pickers/NumberSelector";
import { Link } from "react-router-dom";

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

interface GetProductsProps {
    products: Product[];
}



let sek = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    //minimumFractionDigits: 0
});


const GetProducts: React.FC<GetProductsProps> = ({ products }) => {

    return (
        <div className="flex flex-wrap justify-around">
            {products.map((product, index) => (
                <div>
                    <div key={product.id} className="max-w-xs mx-auto mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
                        <Link to={`/product/${product.id}`} className="text-blue-500 hover:text-blue-800">
                            <img src={product.image || ''} alt={`Product ${index}`} className="w-full h-48 object-cover" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{product.name}</div>
                                <p className="text-gray-700 text-base">Price: {sek.format(product.price)}</p>
                                <p className="text-gray-700 text-base">Stock: {product.stock}</p>
                            </div>
                            <div className="mb-3 px-6">
                                <NumberSelector min={0} max={product.stock} onChange={() => { }} />
                            </div>
                            <Link to={`/product/${product.id}`} className="text-blue-500 hover:text-blue-800">View Details</Link>
                        </Link>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default GetProducts;