import { useEffect, useState } from "react";
import Card from "../components/Card";

const FindJob = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch(`http://localhost:5000/jobs?page=${currentPage}&limit=12&search=${searchTerm}`);
            const data = await response.json();
            setJobs(data.jobs);
            setTotalPages(data.totalPages);
        };

        fetchJobs();
    }, [currentPage, searchTerm]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto lg:px-12 px-5 py-5">
            <h1 className="text-2xl font-bold mb-4">Find Jobs</h1>
            <div>
            <div className="mb-4 lg:flex flex-1">
                <input
                    type="text"
                    className="input input-bordered w-full mb-2"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                
                
            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((card) => (
                    <Card key={card._id} card={card} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <div className="btn-group">
                    <button
                        className="btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page + 1}
                            className={`btn ${page + 1 === currentPage ? "btn-active" : ""}`}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </button>
                    ))}
                    <button
                        className="btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FindJob;