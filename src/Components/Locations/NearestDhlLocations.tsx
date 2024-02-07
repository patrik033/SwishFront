import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const NearestDHLLocations: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    const fetchDataFromAPI = async (): Promise<void> => {
        try {
            // Simulated sample address for testing
            const sampleAddress = {
                streetAddress: '',
                streetNumber: '',
                zipCode: '',
                city: ''
            };

            const response = await axios.post<any>('https://localhost:7232/api/Dhl', sampleAddress);

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
        <div>
        <h2>Nearest DHL Locations</h2>
        {error && <p>Error: {error}</p>}
        
       
        <ul>
          {locations.map(location => (
            <li key={location.id}>
              <h3>{location.name}</h3>
              <p>City: {location.deliveryAddress.city}</p>
              <p>Street: {location.deliveryAddress.streetName}</p>
              <p>Postal Code: {location.deliveryAddress.postalCode}</p>
              <p>Latitude: {location.geo ? location.geo.latitude : 'N/A'}</p>
              <p>Longitude: {location.geo ? location.geo.longitude : 'N/A'}</p>
              <p>Opening Hours:</p>
              <ul>
                {location.openingHours.postalServices.map(service => (
                  <li key={`${service.openDay}-${service.closeDay}`}>
                    {service.openDay} - {service.closeDay}: {service.openTime} - {service.closeTime}
                  </li>
                ))}
              </ul>
              <br></br>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default NearestDHLLocations;