import React from "react";

export default function CVTemplate({ formData, image }) {
        return (
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl mx-auto">
                    {/* Image Display */}
                    {image && (
                        <div className="flex justify-center mb-6">
                                <img
                                    src={image}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                        </div>
                    )}

                    {/* Full Name */}
                    <h1 className="text-3xl font-bold text-gray-900">
                            {formData.fullName || "Your Full Name"}
                    </h1>

                    {/* Contact */}
                    <p className="text-sm text-gray-600">
                            {formData.email || "your.email@example.com"} | {formData.phone || "+123 456 7890"}
                    </p>

                    {/* Summary */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Profile</h2>
                    <p className="text-gray-700">
                            {formData.summary}
                    </p>

                    {/* Technical Skills */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Technical Skills</h2>
                    <ul className="list-disc list-inside">
                            {formData.skills
                                ? formData.skills.split(",").map((skill, index) => (
                                    <li key={index} className="text-gray-700">
                                            {skill.trim()}
                                    </li>
                                ))
                                : "Add your technical skills here."}
                    </ul>

                    {/* Technologies */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Technologies</h2>
                    <ul className="list-disc list-inside">
                            {formData.technologies
                                ? formData.technologies.split(",").map((tech, index) => (
                                    <li key={index} className="text-gray-700">
                                            {tech.trim()}
                                    </li>
                                ))
                                : "Add the technologies you're experienced with."}
                    </ul>

                    {/* Work Experience */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Work Experience</h2>
                    <p className="text-gray-700">
                            {formData.workExperience}
                    </p>

                    {/* Education */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Education</h2>
                    <p className="text-gray-700">
                            {formData.education}
                    </p>

                    {/* Certifications */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Certifications</h2>
                    <ul className="list-disc list-inside">
                            {formData.certifications
                                ? formData.certifications.split(",").map((cert, index) => (
                                    <li key={index} className="text-gray-700">
                                            {cert.trim()}
                                    </li>
                                ))
                                : "Add your certifications here."}
                    </ul>

                    {/* Projects */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Projects</h2>
                    <p className="text-gray-700">
                            {formData.projects }
                    </p>

                    {/* References */}
                    {formData.references && (
                        <>
                                <h2 className="mt-6 text-xl font-semibold text-gray-900">References</h2>
                                <p className="text-gray-700">{formData.references}</p>
                        </>
                    )}
            </div>
        );
}
