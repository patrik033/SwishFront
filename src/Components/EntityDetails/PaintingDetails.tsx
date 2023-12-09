interface PaintingDetailsProps {
    painterName?: string;
}

const PaintingDetails: React.FC<PaintingDetailsProps> = ({ painterName }) => {

    return (
        <div>
            <p>Painter: {painterName}</p>
            {/* Add other Painting-specific details */}
        </div>
    );
}

export default PaintingDetails;