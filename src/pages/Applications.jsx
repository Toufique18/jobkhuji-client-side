import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Applications = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCoverLetter, setSelectedCoverLetter] = useState(null); // For showing the modal
    const location = useLocation();

    // Extract query params from the URL
    const queryParams = new URLSearchParams(location.search);
    const jobPostName = queryParams.get('jobPostName');

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/applicantInfo/${jobId}`);
                const data = await response.json();
                setApplicants(data);
            } catch (error) {
                console.error('Error fetching applicants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId]);

    const handleToggle = async (applicantId, status) => {
        // Create the message based on status
        const message = status === 'Accepted' 
            ? 'Further information check your email' 
            : 'Sorry, Your application was unsuccessful';

            console.log(applicantId)

        try {
            const response = await fetch(`http://localhost:5000/api/applicantsInfo/${applicantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status, message })
            });

            if (response.ok) {
                const updatedApplicant = await response.json();
                // Update the applicant's status locally in the state
                setApplicants(prevApplicants => 
                    prevApplicants.map(applicant => 
                        applicant._id === applicantId ? { ...applicant, status, message } : applicant
                    )
                );
            } else {
                console.error('Failed to update applicant status');
            }
        } catch (error) {
            console.error('Error updating applicant status:', error);
        }
    };

    if (loading) {
        return <p>Loading applicants...</p>;
    }

    // Count total applicants
    const totalApplicants = applicants.length;

    const handleDelete = (applicantId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this application?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Call backend API to delete the application
                fetch(`http://localhost:5000/api/applicantInfodel/${applicantId}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.message === 'Application deleted successfully') {
                        Swal.fire('Deleted!', 'The application has been deleted.', 'success');
                        // Remove the applicant from the state
                        setApplicants(prev => prev.filter(applicant => applicant._id !== applicantId));
                    } else {
                        Swal.fire('Error!', 'Failed to delete the application.', 'error');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting application:', error);
                    Swal.fire('Error!', 'Something went wrong.', 'error');
                });
            }
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                Applications for {jobPostName} ({totalApplicants} Applicants)
            </h2>
            {applicants.length === 0 ? (
                <p>No applicants have applied for this job yet.</p>
            ) : (
                <div>
                    {applicants.map((applicant) => (
                        <div key={applicant._id} className="bg-white shadow-md p-4 mb-4 flex">
                            <div>
                                <p><strong>Name:</strong> {applicant.user?.displayName || 'N/A'}</p>
                                <p>
                                    <strong>Email: </strong>
                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${applicant.applicantEmail}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {applicant.applicantEmail}
                                    </a>
                                </p>

                                <p><strong>Submission Date:</strong> {new Date(applicant.submissionDate).toLocaleDateString()}</p>
                                <button
                                    onClick={() => setSelectedCoverLetter(applicant.coverLetter)}
                                    className="text-blue-500 underline pr-2"
                                >
                                    View Cover Letter
                                </button>

                                <a href={applicant.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                    View CV
                                </a>

                                {/* Toggle buttons for Accepting or Rejecting */}
                                <div className="flex mt-4">
                                    <button 
                                        onClick={() => handleToggle(applicant._id, 'Accepted')}
                                        className="mr-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Accept
                                    </button>
                                    <button 
                                        onClick={() => handleToggle(applicant._id, 'Rejected')}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Reject
                                    </button>
                                </div>

                                {/* Display the current status and message */}
                                {applicant.status && (
                                    <p className="mt-2">
                                        Status:<strong> {applicant.status} - message sent to applicant</strong>
                                    </p>
                                )}
                            </div>
                            <div className='grid grid-cols-1'>
                                 {/* Delete button */}
                            <button 
                                onClick={() => handleDelete(applicant._id)} 
                                className="btn mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete Application
                            </button>
                            <Link to={`/dashboard/profileApp/${applicant.user?._id}`}><button className="btn mr-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Applicant Profile</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for displaying the cover letter */}
            {selectedCoverLetter && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
                    <div className="bg-white rounded-lg p-6 w-1/2">
                        <h3 className="text-xl font-semibold mb-4">Cover Letter</h3>
                        <p>{selectedCoverLetter}</p>
                        <button
                            onClick={() => setSelectedCoverLetter(null)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Applications;
