import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapsPostNord from './Google/GoogleMapsPostNord';


interface Address {
    streetAddress: string;
    streetNumber: string;
    zipCode: string;
    city: string;
}

interface Location {
    name: string;
    deliveryAddress: {
        city: string;
        streetName: string;
        streetNumber: string;
        postalCode: string;

    };
    openingHours: {
        postalServices: {
            openDay: string;
            closeDay: string;
            openTime: string;
            closeTime: string;
            openingHoursId: number;
            openingHours: any; // Update the type if needed
        }[];
    };
    coordinates: {
        countryCode: string;
        northing: number;
        easting: number;
        srId: string;
    }[];
    geo: null; // No longer used, set to null
}

interface NearestPostNordLocationsProps {
    address: Address;
}

const NearestPostNordLocations: React.FC<NearestPostNordLocationsProps> = ({ address }) => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState<string | null>(null);
    //const [showOpeningHours, setShowOpeningHours] = useState<{ [key: number]: boolean }>({});
    const [expandedIndex, setExpandedIndex] = useState(null);
    useEffect(() => {
        fetchDataFromAPI();
    }, []);


    const toggleOpeningHours = (index: any) => {
        if (expandedIndex === index) {
            setExpandedIndex(null); // Collapse if already expanded
        } else {
            setExpandedIndex(index); // Expand the clicked item
        }
    };

    const chooseLocation = (location: Location) => {
        console.log(location);
    }

    const fetchDataFromAPI = async (): Promise<void> => {
        try {


            const response = await axios.post<any>('http://localhost:5035/api/PostNord', address);

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
        <div className='container mx-auto'>
            <h2 className="text-2xl font-bold mb-4">Nearest PostNord Locations</h2>
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((location, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                        <p>City: {location.deliveryAddress.city}</p>
                        <p>Street: {location.deliveryAddress.streetName}</p>
                        <p>Postal Code: {location.deliveryAddress.postalCode}</p>
                        <button
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                            onClick={() => toggleOpeningHours(index)}
                        >
                            {expandedIndex === index ? 'Hide Opening Hours' : 'Show Opening Hours'}
                        </button>
                        {expandedIndex === index && (
                            <div className='mt-2'>
                                <p className='font-semibold'>Opening Hours:</p>
                                <ul className='list-disc pl-6'>
                                    {location.openingHours.postalServices.map((service, serviceIndex) => (
                                        <li key={serviceIndex}>
                                            {service.openDay} - {service.closeDay}: {service.openTime} - {service.closeTime}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <button
                            onClick={() => chooseLocation(location)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Select Delivery Point
                        </button>

                    </div>
                ))}
            </div>

            <div>
                <GoogleMapsPostNord
                    zoom={12}
                    center={{ lat: 59.3918515, lng: 16.4921697 }}
                    locations={locations.map(location => ({
                        id: crypto.randomUUID(),
                        name: location.name,
                        coordinates: {
                            latitude: location.coordinates[0].northing,
                            longitude: location.coordinates[0].easting
                        }
                    }))
                    }
                />
            </div>



        </div>
    );
};

export default NearestPostNordLocations;