import { ChangeEvent } from "react";

interface InputProps {
    headingValue: string;
    value: string;
    error: string;
    htmlObject: string;
    type: string;
    addressName: string;
    id: string;
    placeholder: string;
    required: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const AddressInputFields: React.FC<InputProps> = ({ headingValue, value, error, htmlObject, type, addressName, id, placeholder, required, onChange, onBlur }) => {
    return (
        <div className="relative mb-6" data-te-input-wrapper-init>
            <label
                htmlFor={htmlObject}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">

                {headingValue}
            </label>
            <input
                type={type}
                name={addressName}
                id={id}
                className={`bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-300'
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required={required}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export default AddressInputFields;