'use client';
import React, { useState } from 'react';
import CVTemplate from '../components/CVTemplate';
import html2pdf from 'html2pdf.js'; // Importăm biblioteca pentru export PDF

export default function CVBuilder() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        summary: '',
        skills: '',
        technologies: '',
        workExperience: '',
        education: '',
        certifications: '',
        projects: '',
        references: '',
    });
    const [image, setImage] = useState(null); // State for the uploaded image

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Store the image URL in state
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle PDF download
    const handleDownloadPDF = () => {
        const element = document.getElementById('cv-preview'); // Selectăm div-ul pentru export
        const options = {
            filename: `${formData.fullName || 'My-CV'}.pdf`, // Numele fișierului descărcat
            jsPDF: { unit: 'pt', format: 'a4' }, // Setăm formatul paginii
        };

        html2pdf().set(options).from(element).save();
    };

    return (
        <div className="min-h-screen py-32 bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Start Building Your IT CV</h1>

            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
                {/* Form Section */}
                <form className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="example@email.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="+123 456 7890"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Summary</label>
                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Write a brief summary about yourself."
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Relevant IT Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
                        <textarea
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="e.g., Problem Solving, Communication, Project Management"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Technologies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Technologies</label>
                        <textarea
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="e.g., JavaScript, React, Node.js, Python"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Work Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Work Experience</label>
                        <textarea
                            name="workExperience"
                            value={formData.workExperience}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Describe your work experience here."
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Education</label>
                        <textarea
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Add your educational background here."
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Certifications */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Certifications</label>
                        <textarea
                            name="certifications"
                            value={formData.certifications}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="e.g., AWS Certified Developer, Microsoft Certified"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Projects */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Projects</label>
                        <textarea
                            name="projects"
                            value={formData.projects}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Describe any relevant personal or work-related projects."
                            rows="3"
                        ></textarea>
                    </div>

                    {/* References (Optional) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">References (Optional)</label>
                        <textarea
                            name="references"
                            value={formData.references}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Provide references if any..."
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Your Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>
                </form>

                {/* Preview Section */}
                <div id="cv-preview" className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                    <CVTemplate formData={formData} image={image} />
                </div>
            </div>

            {/* Download PDF Button */}
            <button
                onClick={handleDownloadPDF}
                className="mt-8 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
            >
                Download CV as PDF
            </button>
        </div>
    );
}
