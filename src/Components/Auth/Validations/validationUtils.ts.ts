interface FormData {
    email: string;
    role: string;
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

export interface ReturnState {
    validateAndReturn: (formData: FormData) => void;
}




const formData: FormData = {
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
}

export function validateEmail(email: string, handleValidation: (fieldName: keyof FormData, errorMessage: string) => void) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        handleValidation('email', 'Email is required');
    }
    else if (!emailRegex.test(email)) {
        handleValidation('email', 'Invalid email address');
    }

}

export function validatePassword(password: string, handleValidation: (fieldName: keyof FormData, errorMessage: string) => void) {
    const minLength = 6;
    if (!password.trim()) {
        handleValidation('password', 'Password is required');
    }
    else if (password.length < minLength) {
        handleValidation('password', `Password must be at least ${minLength} characters`);
    }
}


export function validateCity(city: string, handleValidation: (fieldName: keyof FormData, errorMessage: string) => void) {
    const minLength = 3;
    if (!city.trim()) {
        handleValidation('city', 'City is required');
    }
    else if (city.length < minLength) {
        handleValidation('city', `City must be at least ${minLength} characters`);
    }
}

export function validateStreetAddress(streetAddress: string, handleValidation: (fieldName: keyof FormData, errorMessage: string) => void) {

    const minLength = 4;
    if (!streetAddress.trim()) {
        handleValidation('streetAddress', 'Street Address is required');
    }
    else if (streetAddress.length < minLength) {
        handleValidation('streetAddress', `Street Address must be at least ${minLength} characters`);
    }

}

export function validateStreetNumber(streetNumber: string, handleValidation: (fieldName: keyof FormData, errorMessage: string) => void) {
    const minLength = 1;
    if (!streetNumber.trim()) {
        handleValidation('streetNumber', 'Street number is required');
    }
    else if (streetNumber.length < minLength) {
        formData.streetNumber = `Street number must be at least ${minLength} characters`;
        handleValidation('streetNumber', `Street number must be at least ${minLength} characters`);
    }

}

export function validateZipCode(zipCode: string, handleValidation: (fieldName: keyof FormData, errorMessage: string) => void) {
    const minLength = 4;
    if (!zipCode.trim()) {
        formData.zipCode = 'Zip code is required';
        handleValidation('zipCode', 'Zip code is required');

    }
    else if (zipCode.length < minLength) {
        handleValidation('zipCode', `Zip code must be at least ${minLength} characters`);
    }
}

