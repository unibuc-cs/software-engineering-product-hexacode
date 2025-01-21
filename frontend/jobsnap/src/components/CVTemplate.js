import React from "react";

export default function CVTemplate({ formData, image, cvType }) {
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

            <h2 className="mt-6 text-xl font-semibold text-gray-900">Education</h2>
            <p className="text-gray-700">
                {formData.education || "Add your education details here."}
            </p>
            
            {/* Education */}
            {cvType === "education" && (
                <>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Degree</h2>
                    <p className="text-gray-700">
                        {formData.degree || "e.g., Bachelor of Marketing"}
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Institution</h2>
                    <p className="text-gray-700">
                        {formData.institution || "e.g., XYZ University"}
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Graduation Year</h2>
                    <p className="text-gray-700">
                        {formData.graduationYear || "e.g., 2021"}
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Additional Education</h2>
                    <p className="text-gray-700">
                        {formData.additionalEducation || "Any other relevant educational qualifications."}
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Awards</h2>
                    <p className="text-gray-700">
                        {formData.awards || "e.g., Dean's List, Top Graduate"}
                    </p>
                </>
            )}

            {/* Work Experience */}
            {cvType !== "education" && (
                <h2 className="mt-6 text-xl font-semibold text-gray-900">Work Experience</h2>
            )}
            <p className="text-gray-700">
                {formData.workExperience || "Describe your work experience here."}
            </p>

            {/* Render fields based on cvType */}
            {cvType === 'it' && (
                <>
                    {/* IT Specific Fields */}
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
                </>
            )}

            {cvType === 'business' && (
                <>

                    {/* Business Specific Fields */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Business Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills
                            ? formData.skills.split(",").map((skill, index) => (
                                <li key={index} className="text-gray-700">
                                    {skill.trim()}
                                </li>
                            ))
                            : "Add your business skills here."}
                    </ul>
                </>
            )}

            {cvType === 'marketing' && (
                <>
                    {/* Marketing Specific Fields */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Marketing Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills
                            ? formData.skills.split(",").map((skill, index) => (
                                <li key={index} className="text-gray-700">
                                    {skill.trim()}
                                </li>
                            ))
                            : "Add your marketing skills here."}
                    </ul>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Marketing Tools</h2>
                    <ul className="list-disc list-inside">
                        {formData.tools
                            ? formData.tools.split(",").map((tool, index) => (
                                <li key={index} className="text-gray-700">
                                    {tool.trim()}
                                </li>
                            ))
                            : "Add the marketing tools you're proficient in."}
                    </ul>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Campaign Experience</h2>
                    <p className="text-gray-700">
                        {formData.campaignExperience || "Add your campaign experience here."}
                    </p>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Target Audience</h2>
                    <p className="text-gray-700">
                        {formData.targetAudience || "Add the target audience for your campaigns."}
                    </p>
                </>
            )}

            {cvType === 'healthcare' && (
                <>
                    {/* Healthcare Specific Fields */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Healthcare Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills
                            ? formData.skills.split(",").map((skill, index) => (
                                <li key={index} className="text-gray-700">
                                    {skill.trim()}
                                </li>
                            ))
                            : "Add your healthcare skills here."}
                    </ul>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Healthcare Tools</h2>
                    <ul className="list-disc list-inside">
                        {formData.tools
                            ? formData.tools.split(",").map((tool, index) => (
                                <li key={index} className="text-gray-700">
                                    {tool.trim()}
                                </li>
                            ))
                            : "Add healthcare tools you're proficient in."}
                    </ul>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Clinical Experience</h2>
                    <p className="text-gray-700">
                        {formData.clinicalExperience || "Describe your clinical experience here."}
                    </p>
                </>
            )}

            {/* Render fields based on cvType */}
            {cvType === 'graphicdesign' && (
                <>
                    {/* Graphic Designer Specific Fields */}
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Graphic Design Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills
                            ? formData.skills.split(",").map((skill, index) => (
                                <li key={index} className="text-gray-700">
                                    {skill.trim()}
                                </li>
                            ))
                            : "Add your graphic design skills here."}
                    </ul>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Design Software</h2>
                    <ul className="list-disc list-inside">
                        {formData.software
                            ? formData.software.split(",").map((tool, index) => (
                                <li key={index} className="text-gray-700">
                                    {tool.trim()}
                                </li>
                            ))
                            : "Add the design software you're proficient in (e.g., Photoshop, Illustrator)."}
                    </ul>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Portfolio</h2>
                    <p className="text-gray-700">
                        {formData.portfolio || "Provide a link to your design portfolio."}
                    </p>


                </>
            )}

            {/* Certifications */}
            {formData.certifications && (
                <>
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
                </>
            )}

            {/* Projects */}
            {formData.projects && (
                <>
                    <h2 className="mt-6 text-xl font-semibold text-gray-900">Projects</h2>
                    <p className="text-gray-700">
                        {formData.projects}
                    </p>
                </>
            )}
        </div>
    );
}
