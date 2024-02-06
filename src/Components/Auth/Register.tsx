import { NavLink, useNavigate } from "react-router-dom";
import React, { ChangeEvent, FormEvent } from "react";
import { useTrail, a } from '@react-spring/web';
import axios from "axios";
import { validateEmail, validatePassword, validateCity, validateStreetAddress, validateStreetNumber, validateZipCode } from "./Validations/validationUtils.ts";
import AddressInputFields from "./FormInputs/AddressInputFields.tsx";

const Register: React.FC = () => {

    interface FormData {
        email: string;
        password: string;
        role: string;
        city: string;
        streetAddress: string;
        streetNumber: string;
        zipCode: string;
        billingCity: string | null;
        billingStreetAddress: string | null;
        billingStreetNumber: string | null;
        billingZipCode: string | null;
    }

    interface Errors {
        email: string;
        password: string;
        city: string;
        streetAddress: string;
        streetNumber: string;
        zipCode: string;
        billingCity: string | null;
        billingStreetAddress: string | null;
        billingStreetNumber: string | null;
        billingZipCode: string | null;
    }


    // State to store form data and validation errors
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<FormData>({
        email: '',
        password: '',
        role: 'User',
        city: '',
        streetAddress: '',
        streetNumber: '',
        zipCode: '',
        billingCity: null,
        billingStreetAddress: null,
        billingStreetNumber: null,
        billingZipCode: null,
    });

    const [errors, setErrors] = React.useState<Errors>({
        email: '',
        password: '',
        city: '',
        streetAddress: '',
        streetNumber: '',
        zipCode: '',
        billingCity: null,
        billingStreetAddress: null,
        billingStreetNumber: null,
        billingZipCode: null,
    });




    const [billingEnabled, setBillingEnabled] = React.useState<boolean>(false);
    const [useSameAddress, setUseSameAddress] = React.useState(false);
    const toggleBillingFields = () => {
        setBillingEnabled(prevState => !prevState);
    }


    React.useEffect(() => {
        if (useSameAddress) {
            setFormData((prevData) => ({
                ...prevData,
                billingStreetAddress: formData.streetAddress,
                billingCity: formData.city,
                billingStreetNumber: formData.streetNumber,
                billingZipCode: formData.zipCode,
            }));
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                billingStreetAddress: null,
                billingCity: null,
                billingStreetNumber: null,
                billingZipCode: null,
            }));
        }
    }, [useSameAddress, formData.streetAddress, formData.city, formData.streetNumber, formData.zipCode]);



    const handleUseSameAddressChange = (event: any) => {
        const { checked } = event.target;
        setUseSameAddress(checked);
    };

    const billingFields = [
        {
            label: 'Billing Address',
            name: 'billingStreetAddress',
            value: formData.billingStreetAddress || '',
            error: errors.billingStreetAddress,
        },
        {
            label: 'Billing City',
            name: 'billingCity',
            value: formData.billingCity || '',
            error: errors.billingCity,
        },
        {
            label: 'Billing Street Number',
            name: 'billingStreetNumber',
            value: formData.billingStreetNumber || '',
            error: errors.billingStreetNumber,
        },
        {
            label: 'Billing Zip Code',
            name: 'billingZipCode',
            value: formData.billingZipCode || '',
            error: errors.billingZipCode,
        },
    ];

    const trail = useTrail(billingFields.length, {
        config: { mass: 5, tension: 2000, friction: 300 },
        opacity: billingEnabled ? 1 : 0,
        x: billingEnabled ? 0 : 20,
        height: billingEnabled ? 'auto' : 0,
        from: { opacity: 0, x: 20, height: 0 },
    });


    // Function to handle form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Reset validation error for the changed field
        setErrors({
            ...errors,
            [name]: '',
        });

    };

    const handleFieldValidation = (fieldName: keyof FormData, errorMessage: string) => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: errorMessage,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // If there are validation errors, prevent form submission
        const hasErrors = Object.values(errors).some(error => !!error);
        // Check if there are any validation errors
        if (hasErrors) {
            return; // Prevent form submission if there are validation errors
        }

        const registerEndpoint = 'http://localhost:5025/api/Authentication/register';

        try {
            // Send email and password to the authentication register endpoint using Axios
            const response = await axios.post(registerEndpoint, formData);

            // Handle the response from the server
            if (response.status === 200) {
                // Registration successful, you can redirect or perform other actions
                console.log('Registration successful');
                navigate("/")
            } else {
                // Registration failed, handle errors
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


    return (
        <div className="mt-4 flex flex-col min-h-screen">
            <section className="flex-grow">
                <div className="container  flex flex-col items-center justify-center md:flex-row">

                    <div className="mt-4 mb-12 md:mb-0 md:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image" />
                    </div>


                    <div className="md:w-6/12 w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="mx-4">
                                <AddressInputFields
                                    headingValue="Your email"
                                    value={formData.email}
                                    error={errors.email}
                                    htmlObject="email"
                                    type="email"
                                    addressName="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    required={true}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateEmail(e.target.value, handleFieldValidation)}
                                />

                                <AddressInputFields
                                    headingValue="Your password"
                                    value={formData.password}
                                    error={errors.password}
                                    htmlObject="password"
                                    type="password"
                                    addressName="password"
                                    id="password"
                                    placeholder="name@company.com"
                                    required={true}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validatePassword(e.target.value, handleFieldValidation)}
                                />

                                <AddressInputFields
                                    headingValue="Address"
                                    value={formData.streetAddress}
                                    error={errors.streetAddress}
                                    htmlObject="streetAddress"
                                    type="streetAddress"
                                    addressName="streetAddress"
                                    id="streetAddress"
                                    placeholder="Street Address"
                                    required={true}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateStreetAddress(e.target.value, handleFieldValidation)}
                                />

                                <AddressInputFields
                                    headingValue="City"
                                    value={formData.city}
                                    error={errors.city}
                                    htmlObject="city"
                                    type="city"
                                    addressName="city"
                                    id="city"
                                    placeholder="City"
                                    required={true}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateCity(e.target.value, handleFieldValidation)}
                                />

                                <AddressInputFields
                                    headingValue="Street Number"
                                    value={formData.streetNumber}
                                    error={errors.streetNumber}
                                    htmlObject="streetNumber"
                                    type="streetNumber"
                                    addressName="streetNumber"
                                    id="streetNumber"
                                    placeholder="Street Number"
                                    required={true}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateStreetNumber(e.target.value, handleFieldValidation)}
                                />


                                <AddressInputFields
                                    headingValue="Zip Code"
                                    value={formData.zipCode}
                                    error={errors.zipCode}
                                    htmlObject="zipCode"
                                    type="zipCode"
                                    addressName="zipCode"
                                    id="zipCode"
                                    placeholder=""
                                    required={true}
                                    onChange={handleInputChange}
                                    onBlur={(e) => validateZipCode(e.target.value, handleFieldValidation)}
                                />

                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={useSameAddress}
                                            onChange={handleUseSameAddressChange}
                                        />
                                        Use Address as Billing Address
                                    </label>
                                </div>

                                {!useSameAddress &&
                                    <div>
                                        <button
                                            onClick={() => {
                                                toggleBillingFields();
                                            }}
                                            className="transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1) inline-block w-full mt-3 rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                        >
                                            {billingEnabled ? "Hide Billing Fields" : "Show Billing Fields"}
                                        </button>
                                    </div>
                                }


                                {/* billing address fields */}

                                {!useSameAddress && billingEnabled && (
                                    <div className={` `}>
                                        {trail.map((style, index) => (
                                            <a.div key={index} style={style}>
                                                <div className="relative mb-6" data-te-input-wrapper-init>
                                                    <label
                                                        htmlFor={billingFields[index].name}
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        {billingFields[index].label}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name={billingFields[index].name}
                                                        id={billingFields[index].name}
                                                        className={`bg-gray-50 border ${billingFields[index].error ? 'border-red-500' : 'border-gray-300'}
                                                         text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                                        placeholder="Enter your address"
                                                        onChange={handleInputChange}
                                                        value={billingFields[index].value}
                                                    />
                                                    {billingFields[index].error && (
                                                        <p className="mt-1 text-xs text-red-500">{billingFields[index].error}</p>
                                                    )}
                                                </div>
                                            </a.div>
                                        ))}
                                    </div>
                                )}

                                {/* <!-- Terms and conditions --> */}
                                <div className="flex items-start mt-4">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={false} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="terms"
                                            className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-start mt-4">
                                    <div className="flex items-center h-5">
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                            Already have an account?
                                            <NavLink
                                                to="/login"
                                                className={"font-medium text-primary-600 hover:underline dark:text-primary-500"}
                                            >Login here</NavLink>
                                            {/* <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a> */}
                                        </p>
                                    </div>
                                </div>



                                {/* <!-- Submit button --> */}
                                <button
                                    type="submit"
                                    className="inline-block w-full mt-3 rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Register
                                </button>

                                {/* <!-- Divider --> */}
                                <div
                                    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p
                                        className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                        OR
                                    </p>
                                </div>
                                {/* <!-- Social login buttons --> */}
                                <a
                                    className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    style={{ backgroundColor: "#3b5998" }}
                                    href="#!"
                                    role="button"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">

                                    {/* <!-- Facebook --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-3.5 w-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                    Continue with Facebook
                                </a>
                                <a
                                    className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                                    style={{ backgroundColor: "#55acee" }}
                                    href="#!"
                                    role="button"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    {/* <!-- Twitter --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-3.5 w-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                    Continue with Twitter
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register;