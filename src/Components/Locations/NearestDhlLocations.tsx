import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapsDhl from './Google/GoogleMapsDhl';

interface Address {
    streetAddress: string;
    streetNumber: string;
    zipCode: string;
    city: string;
}

interface Location {
    id: string;
    name: string;
    deliveryAddress: {
        city: string;
        streetName: string;
        postalCode: string;
    };
    openingHours: {
        postalServices: {
            openDay: string;
            closeDay: string;
            openTime: string;
            closeTime: string;
        }[];
    };
    geo: {
        latitude: number | null;
        longitude: number | null;
    } | null;
}

interface NearestDHLLocationsProps {
    address: Address;
}

const NearestDHLLocations: React.FC<NearestDHLLocationsProps> = ({ address }) => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showOpeningHours, setShowOpeningHours] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        fetchDataFromAPI();
    }, [address]);

    const toggleOpeningHours = (locationId: string) => {
        setShowOpeningHours(prevState => ({
            ...prevState,
            [locationId]: !prevState[locationId]
        }));
    };


    const chooseLocation = (location: Location) => {
        console.log(location);
    }

    const fetchDataFromAPI = async (): Promise<void> => {
        try {
            const response = await axios.post<any>('http://localhost:5035/api/Dhl', address);

            if (response.data && Array.isArray(response.data)) {
                if (response.data.length === 0) {
                    setError('No locations found for the provided address.');
                } else {
                    setLocations(response.data);
                    setError(null); // Clear any previous error
                }
            } else {
                setError('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Nearest DHL Locations</h2>
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map(location => (
                    <div key={location.id} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                        <p>City: {location.deliveryAddress.city}</p>
                        <p>Street: {location.deliveryAddress.streetName}</p>
                        <p>Postal Code: {location.deliveryAddress.postalCode}</p>
                        <button
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                            onClick={() => toggleOpeningHours(location.id)}
                        >
                            {showOpeningHours[location.id] ? 'Hide Opening Hours' : 'Show Opening Hours'}
                        </button>
                        {showOpeningHours[location.id] && (
                            <div className="mt-2">
                                <p className="font-semibold">Opening Hours:</p>
                                <ul className="list-disc pl-6">
                                    {location.openingHours.postalServices.map(service => (
                                        <li key={`${service.openDay}-${service.closeDay}`}>
                                            {service.openDay} - {service.closeDay}: {service.openTime} - {service.closeTime}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                            onClick={() => chooseLocation(location)}
                        >
                            Select Delivery Point
                        </button>
                    </div>
                ))}
            </div>
            <div>



                <GoogleMapsDhl
                    zoom={12}
                    center={{ lat: 59.3918515, lng: 16.4921697 }}
                    locations={locations}
                />
            </div>
        </div>
    );
};

export default NearestDHLLocations;