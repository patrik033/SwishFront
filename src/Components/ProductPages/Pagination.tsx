import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    pagination: {
        CurrentPage: number;
        TotalPages: number;
        HasPrevious: boolean;
        HasNext: boolean;
    };
    onPageChange: (pageNumber: number) => void;
}
const PaginationComponent: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
    return (
        <ReactPaginate
            nextLabel="Next"
            previousLabel="Previous"
            onPageChange={(data) => onPageChange(data.selected)}
            pageCount={pagination.TotalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            breakLabel="..."
            breakClassName="break-me"

            containerClassName="flex justify-center mt-4" // Center items horizontally
            pageClassName="mx-2" // Adjust the margin between page items
            previousClassName="bg-blue-500 text-white px-4 py-2 rounded mr-2" // Styling for the Previous button
            nextClassName="bg-blue-500 text-white px-4 py-2 rounded ml-2" // Styling for the Next button
            activeClassName="bg-blue-500 text-white px-4 py-2 rounded" // Styling for active page
            pageLinkClassName="bg-white text-blue-500 px-4 py-2 rounded" // Styling for inactive pages
            breakLinkClassName="text-blue-500 px-4 py-2" // Styling for the break
            disabledClassName="text-gray-400" // Styling for disabled items (e.g., ellipsis)
        />
    );
};

export default PaginationComponent;