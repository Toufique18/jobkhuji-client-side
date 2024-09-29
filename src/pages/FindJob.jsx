import { useEffect, useState } from "react";
import Card from "../components/Card";

const FindJob = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJobType, setselectedJobType] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [salaryRange, setsalaryRange] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch(`http://localhost:5000/jobs?page=${currentPage}&limit=12&search=${searchTerm}&jobtype=${selectedJobType.join(',')}&categories=${selectedCategories.join(',')}&salaryRange=${salaryRange}&sort=${sortOption}`);
            const data = await response.json();
            setJobs(data.jobs);
            setTotalPages(data.totalPages);
        };

        fetchJobs();
    }, [currentPage, searchTerm, selectedJobType, selectedCategories, salaryRange, sortOption]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleJobTypeChange = (e) => {
        const { value, checked } = e.target;
        setselectedJobType((prev) =>
            checked ? [...prev, value] : prev.filter((jobtypes) => jobtypes !== value)
        );
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories((prev) =>
            checked ? [...prev, value] : prev.filter((category) => category !== value)
        );
    };

    const handleSalaryRangeChange = (e) => {
        setsalaryRange(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const applyFilters = () => {
        setIsModalOpen(false);
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
                <button
                    className="btn ml-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    Filter Jobs
                </button>
                <select
                    className="select select-bordered ml-2"
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option value="">Sort By</option>
                    <option value="salary-asc">Salary: Low to High</option>
                    <option value="salary-desc">Salary: High to Low</option>
                    <option value="date-desc">Date Added: Newest First</option>
                </select>
                
                
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
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h2 className="text-xl font-bold mb-4">Filter Jobs</h2>

                        <div className="flex justify-around">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold pb-3">Job Type</h3>
                            <div className="flex flex-col">
                                {["Full Time", "Part Time", "Internship", "Remote", "Contract Base"].map((jobtypes) => (
                                    <label key={jobtypes} className="flex items-center pb-2">
                                        <input
                                            type="checkbox"
                                            value={jobtypes}
                                            checked={selectedJobType.includes(jobtypes)}
                                            onChange={handleJobTypeChange}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">{jobtypes}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold pb-3">Categories</h3>
                            <div className="flex flex-col">
                                {["Software Development", "Marketing and Sales", "Data Science and Analytics", "Design and Creative", "Customer Support", "Human Resources", "Finance and Accounting", "Operations and Management"].map((category) => (
                                    <label key={category} className="flex items-center pb-2">
                                        <input
                                            type="checkbox"
                                            value={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={handleCategoryChange}
                                            className="checkbox"
                                        />
                                        <span className="ml-2">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold pb-3">Salary Range</h3>
                            <select
                                value={salaryRange}
                                onChange={handleSalaryRangeChange}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Salary Range(All)</option>
                                <option value="0-15000">0 - 15000 BDT</option>
                                <option value="15001-25000">15001 - 25000 BDT</option>
                                <option value="25001-50000">25001 - 50000 BDT</option>
                                <option value="50000+">50000+ BDT</option>
                            </select>
                        </div>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn"
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>
                            <button
                                className="btn text-white bg-blue-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindJob;