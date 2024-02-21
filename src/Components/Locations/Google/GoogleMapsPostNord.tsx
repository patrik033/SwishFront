import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface Location {
    id: string;
    name: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

interface GoogleMapsProps {
    locations: Location[];
    center: { lat: number, lng: number };
    zoom: number;
}

const containerStyle = {
    width: '100%',
    height: '500px'
};

const GoogleMapsPostNord: React.FC<GoogleMapsProps> = ({ locations, center, zoom }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAdiJOpOLFtKBSqFbYq6AZ1X0nl9VTu5No"
    });

    const [, setMap] = React.useState<any>(null);

    const onLoad = React.useCallback(function callback(map: any) {
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    return (
        <div>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={zoom}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {locations.map((location) => (
                        <Marker
                            key={location.id}
                            position={{ lat: location.coordinates.latitude, lng: location.coordinates.longitude }}
                            title={location.name}
                        />
                    ))}
                </GoogleMap>
            )}
        </div>
    );
};

export default GoogleMapsPostNord;