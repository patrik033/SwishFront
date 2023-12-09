interface CarDetailsProps {
    horsePower?: number | undefined;
    year?: number | undefined;
}


const CarDetails: React.FC<CarDetailsProps> = ({ horsePower, year }) => {

    return (
        <div>
            <p>Horsepower: {horsePower}</p>
            <p>Year: {year}</p>
            {/* Add other Car-specific details */}
        </div>
    );
}

export default CarDetails;