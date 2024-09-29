import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const PostJob = () => {
    const { user } = useContext(AuthContext);
    const userEmail = user ? user.email : '';
    
    

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

   

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
    
        const jobPostName = form.jobPostName.value;
        const companyName = form.companyName.value;
        const categoryName = form.categoryName.value;
        const jobDescription = form.jobDescription.value;
        
        // Collect the responsibilities into an array
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
        const companyLogo = form.image.files[0]; // Assuming this is an image file
        const posterEmail = userEmail; // Use the authenticated user's email
        const vacancyPostedDate = new Date();
    
        try {
            // Step 1: Upload image to image hosting service
            const image_url = await uploadImage(companyLogo);
    
            // Step 2: Prepare job post data with jobResponsibilities as an array
            const jobPostData = {
                jobPostName,
                companyName,
                categoryName,
                jobDescription,
                jobResponsibilities, // This is an array now
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
                vacancyPostedDate
            };
    
            const response = await fetch("http://localhost:5000/postcollection", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobPostData),
            });
    
            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Job posted successfully",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                form.reset();
            } else {
                throw new Error("Failed to post job");
            }
        } catch (error) {
            console.error("Error posting job:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while posting the job",
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
                return data.data.display_url; // Return the hosted image URL
            } else {
                throw new Error("Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

  

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Post a Job</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div>
                    <label className="block font-medium mb-2">Job Post Name</label>
                    <input
                        type="text"
                        name="jobPostName"
                        placeholder="Job Post Name"
                       
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Category</label>
                    <select
                        name="categoryName"
                        
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

                {/* Column 2 */}
                <div className="col-span-1 md:col-span-2">
                    <label className="block font-medium mb-2">Job Description</label>
                    <textarea
                        name="jobDescription"
                        placeholder="Job Description"
                        
                        className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 1</label>
                    <input
                        type="text"
                        placeholder="Responsibility 1"
                        name='Responsibility1'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 2</label>
                    <input
                        type="text"
                        placeholder="Responsibility 2"
                        name='Responsibility2'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 3</label>
                    <input
                        type="text"
                        placeholder="Responsibility 3"
                        name='Responsibility3'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 4</label>
                    <input
                        type="text"
                        placeholder="Responsibility 4"
                        name='Responsibility4'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Responsibility 5</label>
                    <input
                        type="text"
                        placeholder="Responsibility 5"
                        name='Responsibility5'
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Job Type</label>
                    <select
                        name="jobType"

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
                        placeholder="Salary"

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Education Qualification</label>
                    <input
                        type="text"
                        name="educationQualification"
                        placeholder="Education Qualification"

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Experience</label>
                    <input
                        type="text"
                        name="experience"
                        placeholder="Experience"

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Vacancy Count</label>
                    <input
                        type="number"
                        name="vacancyCount"
                        placeholder="Vacancy Count"

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Vacancy Expire Date</label>
                    <input
                        type="datetime-local"
                        name="vacancyExpireDate"

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div>
                    <label className="block font-medium mb-2">Company Website</label>
                    <input
                        type="url"
                        name="companyWebsite"
                        placeholder="Company Website"

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Email Address</label>
                    <input
                        type="email"
                        name="emailAddress"
                        placeholder="Email Address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="col-span-1 md:col-span-3">
                    <label className="block font-medium mb-2">Company Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="col-span-1 md:col-span-3">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Post Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostJob;
