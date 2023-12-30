import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
// import { NavLink } from 'react-router-dom';

const ResendEmailActivationLink: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }

        // TODO: Add your resend activation link endpoint URL
        const resendEndpoint = 'http://localhost:5025/api/Authentication/resendConfirm';

        try {
            // Send email to the resend activation link endpoint using Axios
            const response = await axios.post(resendEndpoint, { email });

            // Handle the response from the server
            if (response.status === 200) {
                // Resend successful, you can redirect or perform other actions
                console.log('Resend successful');
            } else {
                // Resend failed, handle errors
                console.error('Resend failed');
            }
        } catch (error) {
            console.error('Error during resend:', error);
        }
    };

    return (
        <div className="mt-4">
            <section className="h-screen">
                <div className="container flex flex-col items-center justify-center md:flex-row">
                    <div className="md:w-6/12 w-full">
                        <form onSubmit={handleSubmit} className="mx-4">
                            {/* email input */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <label htmlFor="resend-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="resend-email"
                                    name="resend-email"
                                    className={`bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'
                                        } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="inline-block w-full mt-3 rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Resend Activation Link
                            </button>

                            {/* Divider */}
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                    OR
                                </p>
                            </div>
                        </form>

                        {/* Social login buttons */}
                        {/* ... (you can reuse the social login buttons from the Register component) */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResendEmailActivationLink;