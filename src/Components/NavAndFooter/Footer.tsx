const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-auto ">
            <div className="container mx-auto text-center">
                <div className="flex flex-wrap justify-center space-x-4">
                    <div>
                        <h4 className="text-lg font-semibold mb-2">About Us</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
                        <p>Email: info@example.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;