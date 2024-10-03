import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Applications = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
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

    if (loading) {
        return <p>Loading applicants...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Applications for {jobPostName}</h2>
            {applicants.length === 0 ? (
                <p>No applicants have applied for this job yet.</p>
            ) : (
                <div>
                    {applicants.map((applicant) => (
                        <div key={applicant._id} className="bg-white shadow-md p-4 mb-4">
                            <p><strong>Name:</strong> {applicant.user?.displayName || 'N/A'}</p>
                            <p>
                                <strong>Email:</strong>
                                <a
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${applicant.applicantEmail}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    {applicant.applicantEmail}
                                </a>
                            </p>


                            <p><strong>Cover Letter:</strong> {applicant.coverLetter}</p>
                            <p><strong>Submission Date:</strong> {new Date(applicant.submissionDate).toLocaleDateString()}</p>
                            <a href={applicant.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                View CV
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Applications;
