'use client';
import React, { useState } from 'react';

export default function CVBuilder() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        summary: '',
        skills: '',
        experience: '',
        education: '',
        references: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl mt-20 font-extrabold text-gray-900 mb-4">
                Start Building Your CV
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                Fill in the details below to generate your perfect CV.
            </p>

            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
                {/* Form Section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2 space-y-6"
                >
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="+1 234 567 890"
                            required
                        />
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Summary/About You
                        </label>
                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="A short introduction about yourself..."
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Skills
                        </label>
                        <textarea
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="e.g., JavaScript, React, Problem Solving..."
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Work Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Work Experience
                        </label>
                        <textarea
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Describe your previous job roles, achievements, and responsibilities..."
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Education
                        </label>
                        <textarea
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="e.g., Bachelor of Computer Science, XYZ University, 2020"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* References */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            References (Optional)
                        </label>
                        <textarea
                            name="references"
                            value={formData.references}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Provide references if any..."
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                    >
                        Save and Preview
                    </button>
                </form>

                {/* Preview Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        CV Preview
                    </h2>
                    <div className="space-y-4">
                        <p><strong>Full Name:</strong> {formData.fullName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>Summary:</strong> {formData.summary}</p>
                        <p><strong>Skills:</strong> {formData.skills}</p>
                        <p><strong>Work Experience:</strong> {formData.experience}</p>
                        <p><strong>Education:</strong> {formData.education}</p>
                        <p><strong>References:</strong> {formData.references}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
