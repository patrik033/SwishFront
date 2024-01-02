import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, ToastItem, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterConfirmation: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const { search } = location;
        const params = new URLSearchParams(search);
        const email = params.get('email');
        const activationToken = params.get('activationToken');

        if (email && activationToken) {
            // You can now send a POST request with Axios or perform any other actions
            // Here's an example with Axios:
            axios
                .get(`http://localhost:5025/api/Authentication/confirm?email=${email}&activationToken=${activationToken}`)
                .then((response) => {
                    // Handle success
                    if (response.status === 200) {
                        console.log(response);
                        // Show success toaster
                        toast.success('Email has been confirmed!', {
                            position: 'top-right',
                            autoClose: 3000, // 3 seconds
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined
                            // onClose: () => {
                            //     // Redirect to another page after confirmation
                            //     navigate('/login'); // Adjust the path to your success page
                            // },
                        });
                        toast.onChange((payLoad: ToastItem) => {
                            if (payLoad.status === "removed") {
                                navigate('/login');

                            }
                        })


                    }
                })
                .catch((error) => {
                    // Handle error
                    console.error(error);

                    // Show error toaster
                    toast.error(error, {
                        position: 'top-right',
                        autoClose: 3000, // 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    // Redirect to an error page or handle accordingly
                    //navigate('/errorPage'); // Adjust the path to your error page
                });
        } else {
            // Redirect to some error page or handle accordingly
            console.error('Invalid email or activationToken');
            // navigate('/errorPage'); // Adjust the path to your error page
        }
    }, [location, navigate]);

    return (
        <div>
            <h1>Email Confirmation Page</h1>
            <ToastContainer />
            {/* You can add content or redirect the user to another page after confirmation */}
        </div>
    );
};

export default RegisterConfirmation;