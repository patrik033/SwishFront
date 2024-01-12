import React, { useState } from 'react';

interface NumberSelectorProps {
    min: number;
    max: number;
    onChangeValue: (value: number) => void;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({ min, max, onChangeValue }) => {
    const [selectedNumber, setSelectedNumber] = useState(min);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(event.target.value, 10);

        // Ensure the value is within the specified range
        value = Math.max(min, Math.min(value, max));

        setSelectedNumber(value);
        onChangeValue(value);
    };

    const handleIncrement = () => {
        const newValue = Math.min(selectedNumber + 1, max);
        setSelectedNumber(newValue);
        onChangeValue(newValue);
    };

    const handleDecrement = () => {
        const newValue = Math.max(selectedNumber - 1, min);
        setSelectedNumber(newValue);
        onChangeValue(newValue);
    };

    return (
        <div className="flex items-center space-x-2 mt-2">
            <button
                className="px-2 py-1 border rounded transition-colors duration-300 ease-in-out bg-blue-500 text-white hover:bg-green-700 focus:outline-none focus:border-green-700"
                onClick={handleDecrement}
            >
                -
            </button>
            <input
                type="number"
                className="w-16 px-2 py-1 border border-gray-300 rounded-full text-center bg-gray-100 "
                value={selectedNumber}
                onChange={handleInputChange}
                min={min}
                max={max}

            />
            <button
                className="px-2 py-1 border rounded transition-colors duration-300 ease-in-out bg-blue-500 text-white hover:bg-green-700 focus:outline-none focus:border-green-700"
                onClick={handleIncrement}
            >
                +
            </button>
        </div>
    );
};

export default NumberSelector;