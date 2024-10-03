import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const UpdateJob = () => {
    const { user } = useContext(AuthContext);
    const { jobId } = useParams();  // jobId from the URL parameters
    console.log('Job ID:', jobId);
    const userEmail = user ? user.email : '';

    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true);

    const categories = [
        "Software Development",
        "Marketing and Sales",
        "Data Science and Analytics",
        "Design and Creative",
        "Customer Support",
        "Human Resources",
        "Finance and Accounting",
        "Operations and Management"
    ];

    const jobTypes = [
        "Full Time",
        "Part Time",
        "Internship",
        "Remote",
        "Contract Base"
    ];

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
        return formattedDate;
    };

    // Fetch the existing job data by ID when the component mounts
    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/postcollections/${jobId}`);
                const data = await response.json();
                setJobData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job data:', error);
                setLoading(false);
            }
        };

        fetchJobData();
    }, [jobId]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const form = event.target;

        const jobPostName = form.jobPostName.value;
        const companyName = form.companyName.value;
        const categoryName = form.categoryName.value;
        const jobDescription = form.jobDescription.value;
        const jobResponsibilities = [
            form.Responsibility1.value,
            form.Responsibility2.value,
            form.Responsibility3.value,
            form.Responsibility4.value,
            form.Responsibility5.value
        ];
        const jobType = form.jobType.value;
        const salary = Number(form.salary.value);
        const location = form.location.value;
        const educationQualification = form.educationQualification.value;
        const experience = form.experience.value;
        const vacancyCount = Number(form.vacancyCount.value);
        const vacancyExpireDate = form.vacancyExpireDate.value;
        const companyWebsite = form.companyWebsite.value;
        const phoneNumber = form.phoneNumber.value;
        const emailAddress = form.emailAddress.value;
        const companyLogo = form.image.files[0];
        const posterEmail = jobData.posterEmail;
        const vacancyPostedDate = jobData.vacancyPostedDate; 

        // if no new image, use the old one
        try {
            let image_url = jobData.companyLogo;
            if (companyLogo) {

                image_url = await uploadImage(companyLogo);
            }

            const updatedJobData = {
                jobPostName,
                companyName,
                categoryName,
                jobDescription,
                jobResponsibilities,
                jobType,
                salary,
                location,
                educationQualification,
                experience,
                vacancyCount,
                vacancyExpireDate,
                companyWebsite,
                phoneNumber,
                emailAddress,
                companyLogo: image_url,
                posterEmail,
                vacancyPostedDate,
            };

            const response = await fetch(`http://localhost:5000/updatecollection/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedJobData),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Job updated successfully",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                form.reset();
            } else {
                throw new Error('Failed to update job');
            }
        } catch (error) {
            console.error('Error updating job:', error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while updating the job",
                icon: "error",
                confirmButtonText: "Close",
            });
        }
    };

    const uploadImage = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const response = await fetch(`https://api.imgbb.com/1/upload?key=e04b2c2c85ddbc2b9379722536771dca`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                return data.data.display_url; // Return hosted image URL
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Update Job</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pre-fill form fields with jobData */}
                <div>
                    <label className="block font-medium mb-2">Job Post Name</label>
                    <input
                        type="text"
                        name="jobPostName"
                        defaultValue={jobData.jobPostName}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        defaultValue={jobData.companyName}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Category</label>
                    <select
                        name="categoryName"
                        defaultValue={jobData.categoryName}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label className="block font-medium mb-2">Job Description</label>
                    <textarea
                        name="jobDescription"
                        defaultValue={jobData.jobDescription}
                        className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                {/* Job responsibilities */}
                <div>
                    <label className="block font-medium mb-2">Responsibility 1</label>
                    <input
                        type="text"
                        placeholder="Responsibility 1"
                        defaultValue={jobData.jobResponsibilities && jobData.jobResponsibilities[0]}
                        name='Responsibility1'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 2</label>
                    <input
                        type="text"
                        placeholder="Responsibility 2"
                        defaultValue={jobData.jobResponsibilities && jobData.jobResponsibilities[1]}
                        name='Responsibility2'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 3</label>
                    <input
                        type="text"
                        placeholder="Responsibility 3"
                        defaultValue={jobData.jobResponsibilities && jobData.jobResponsibilities[2]}
                        name='Responsibility3'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 4</label>
                    <input
                        type="text"
                        placeholder="Responsibility 4"
                        defaultValue={jobData.jobResponsibilities && jobData.jobResponsibilities[3]}
                        name='Responsibility4'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 5</label>
                    <input
                        type="text"
                        placeholder="Responsibility 5"
                        defaultValue={jobData.jobResponsibilities && jobData.jobResponsibilities[4]}
                        name='Responsibility5'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Job Type</label>
                    <select
                        name="jobType"
                        defaultValue={jobData.jobType}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Job Type</option>
                        {jobTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-2">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        defaultValue={jobData.salary}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        defaultValue={jobData.location}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Education Qualification</label>
                    <input
                        type="text"
                        name="educationQualification"
                        defaultValue={jobData.educationQualification}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Experience</label>
                    <input
                        type="text"
                        name="experience"
                        defaultValue={jobData.experience}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Vacancy Count</label>
                    <input
                        type="number"
                        name="vacancyCount"
                        defaultValue={jobData.vacancyCount}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Vacancy Expiry Date</label>
                    <input
                        type="datetime-local"
                        name="vacancyExpireDate"
                        defaultValue={formatDateForInput(jobData.vacancyExpireDate)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Company Website</label>
                    <input
                        type="text"
                        name="companyWebsite"
                        defaultValue={jobData.companyWebsite}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        defaultValue={jobData.phoneNumber}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Email Address</label>
                    <input
                        type="email"
                        name="emailAddress"
                        defaultValue={jobData.emailAddress}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Upload Company Logo</label>

                    {/* Display the current logo if it exists */}
                    {jobData.companyLogo && (
                        <div className="mb-4">
                            <p>Current Logo:</p>
                            <img
                                src={jobData.companyLogo}
                                alt="Company Logo"
                                className="h-24 w-24 object-cover border rounded"
                            />
                        </div>
                    )}

                    {/* File input to upload a new logo */}
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="col-span-1 md:col-span-3">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update Job
                    </button>
                    
                </div>
            </form>
        </div>
    );
};

export default UpdateJob;
