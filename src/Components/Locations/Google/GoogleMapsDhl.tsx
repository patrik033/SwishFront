import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface DhlLocation {
    id: string;
    name: string;
    geo: {
        latitude: number | null;
        longitude: number | null;
    } | null;
}


interface GoogleMapsProps {
    locations: DhlLocation[];
    center: { lat: number, lng: number };
    zoom: number;
}



const containerStyle = {
    width: '100%',
    height: '500px'
};


const GoogleMapsDhl: React.FC<GoogleMapsProps> = ({ locations, center, zoom }) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAdiJOpOLFtKBSqFbYq6AZ1X0nl9VTu5No"
    })

    const [, setMap] = React.useState(null)

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
                        location.geo && (
                            <Marker
                                key={location.id}
                                position={{ lat: location.geo.latitude || 0, lng: location.geo.longitude || 0 }}
                                title={location.name}
                            />
                        )
                    ))}
                </GoogleMap>
            )}
        </div>
    )
}

export default GoogleMapsDhl