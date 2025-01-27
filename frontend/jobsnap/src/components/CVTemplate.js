import React from "react";

export default function CVTemplate({ formData, image, cvType }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto border border-gray-200">
            {/* Image display */}
            <div className="flex flex-col items-center">
                {image && (
                    <img
                        src={image}
                        alt="Profile"
                        className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md mb-4"
                    />
                )}
                <h2 className="text-3xl font-bold text-gray-800 text-center">{formData.fullName || "Your Full Name"}</h2>
                <p className="text-gray-600 text-center">{formData.email || "your.email@example.com"}</p>
                <p className="text-gray-600 text-center">{formData.phone || "+123 456 7890"}</p>
            </div>

            <div className="grid grid-cols-5 gap-8 mt-8">
                {/* Left Section */}
                <div className="col-span-1">
                    {cvType === "it" && (formData.skills || formData.technologies) && (
                        <>
                            {formData.skills && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800">Technical Skills</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.skills.split(",").map((skill, index) => (
                                            <li key={index} className="mt-1">• {skill.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {formData.technologies && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Technologies</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.technologies.split(",").map((tech, index) => (
                                            <li key={index} className="mt-1">• {tech.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </>
                    )}

                    {cvType === "business" && (formData.skills || formData.certifications) && (
                        <>
                            {formData.skills && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800">Business Skills</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.skills.split(",").map((skill, index) => (
                                            <li key={index} className="mt-1">• {skill.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {formData.certifications && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Certifications</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.certifications.split(",").map((cert, index) => (
                                            <li key={index} className="mt-1">• {cert.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </>
                    )}

                    {cvType === "marketing" && (formData.skills || formData.tools || formData.certifications) && (
                        <>
                            {formData.skills && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800">Marketing Skills</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.skills.split(",").map((skill, index) => (
                                            <li key={index} className="mt-1">• {skill.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {formData.tools && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Marketing Tools</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.tools.split(",").map((tool, index) => (
                                            <li key={index} className="mt-1">• {tool.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {formData.certifications && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Certifications</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.certifications.split(",").map((cert, index) => (
                                            <li key={index} className="mt-1">• {cert.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </>
                    )}

                    {cvType === "graphicdesign" && (formData.skills || formData.tools || formData.portfolio || formData.certifications) && (
                        <>
                            {formData.skills && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800">Design Skills</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.skills.split(",").map((skill, index) => (
                                            <li key={index} className="mt-1">• {skill.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {formData.tools && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Design Tools</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.tools.split(",").map((tool, index) => (
                                            <li key={index} className="mt-1">• {tool.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {formData.portfolio && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Portfolio</h3>
                                    <p className="text-gray-700 mt-2">{formData.portfolio}</p>
                                </>
                            )}
                            {formData.certifications && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Certifications</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.certifications.split(",").map((cert, index) => (
                                            <li key={index} className="mt-1">• {cert.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </>
                    )}

                    {cvType === "education" && (formData.degree || formData.awards) && (
                        <>
                            {formData.degree && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800">Degree</h3>
                                    <p className="text-gray-700 mt-2">{formData.degree}</p>
                                </>
                            )}
                            {formData.awards && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Awards</h3>
                                    <p className="text-gray-700 mt-2">{formData.awards}</p>
                                </>
                            )}
                        </>
                    )}

                    {cvType === "healthcare" && (formData.skills || formData.tools || formData.clinicalExperience || formData.certifications) && (
                        <>
                            {formData.skills && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800">Healthcare Skills</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.skills.split(",").map((skill, index) => (
                                            <li key={index} className="mt-1">• {skill.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {formData.tools && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Healthcare Tools</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.tools.split(",").map((tool, index) => (
                                            <li key={index} className="mt-1">• {tool.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {formData.clinicalExperience && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Clinical Experience</h3>
                                    <p className="text-gray-700 mt-2">{formData.clinicalExperience}</p>
                                </>
                            )}
                            {formData.certifications && (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-8">Certifications</h3>
                                    <ul className="text-gray-700 mt-2">
                                        {formData.certifications.split(",").map((cert, index) => (
                                            <li key={index} className="mt-1">• {cert.trim()}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Vertical Separator */}
                <div className="col-span-1 flex justify-center">
                    <div className="border-l border-gray-400 h-full"></div>
                </div>

                {/* Right Section */}
                <div className="col-span-3">
                    <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
                    <p className="text-gray-700 mt-2">{formData.summary || "Write a brief summary about yourself."}</p>

                    {formData.education && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
                            <p className="text-gray-700 mt-2">{formData.education}</p>
                        </div>
                    )}

                    {formData.experience && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800">Work Experience</h2>
                            <p className="text-gray-700 mt-2">{formData.experience}</p>
                        </div>
                    )}

                    {formData.projects && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
                            <pre className="text-gray-700 mt-2 whitespace-pre-wrap">
                                {formData.projects}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
