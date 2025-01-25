import React from "react";


export default function CVTemplate({ formData, image, cvType }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl mx-auto border border-gray-200">
            {/* Image Display */}
            {image && (
                <div className="flex justify-center mb-6">
                    <img
                        src={image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                    />
                </div>
            )}

            {/* Full Name */}
            <h1 className="text-4xl font-bold text-gray-800 tracking-wide mb-2">
                {formData.fullName || "Your Full Name"}
            </h1>

            {/* Contact */}
            <p className="text-sm text-gray-600">
                {formData.email || "your.email@example.com"} | {formData.phone || "+123 456 7890"}
            </p>

            {/* Summary */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Profile</h2>
                <p className="text-gray-700 mt-2">{formData.summary || "Write a brief summary about yourself."}</p>
            </section>

            {/* Education */}
            <section className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Education</h2>
                <p className="text-gray-700 mt-2">{formData.education || "Add your education details here."}</p>

                {cvType === "education" && (
                    <>
                        <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Degree</h3>
                        <p className="text-gray-700">{formData.degree || "e.g., Bachelor of Marketing"}</p>

                        <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Awards</h3>
                        <p className="text-gray-700">{formData.awards || "e.g., Dean's List, Top Graduate"}</p>
                    </>
                )}
            </section>

            {/* Experience */}
            {cvType !== "education" && (
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Experience</h2>
                    <p className="text-gray-700 mt-2">{formData.experience || "Describe your work experience here."}</p>
                </section>
            )}

            {/* Specific fields based on CV type */}
            {cvType === 'it' && (
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Technical Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills ? formData.skills.split(",").map((skill, index) => (
                            <li key={index} className="text-gray-700">{skill.trim()}</li>
                        )) : "Add your technical skills here."}
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Technologies</h2>
                    <ul className="list-disc list-inside">
                        {formData.technologies ? formData.technologies.split(",").map((tech, index) => (
                            <li key={index} className="text-gray-700">{tech.trim()}</li>
                        )) : "Add the technologies you're experienced with."}
                    </ul>
                </section>
            )}

            {cvType === 'business' && (
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Business Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills ? formData.skills.split(",").map((skill, index) => (
                            <li key={index} className="text-gray-700">{skill.trim()}</li>
                        )) : "Add your business skills here."}
                    </ul>
                </section>
            )}

            {cvType === 'marketing' && (
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Marketing Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills ? formData.skills.split(",").map((skill, index) => (
                            <li key={index} className="text-gray-700">{skill.trim()}</li>
                        )) : "Add your marketing skills here."}
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Marketing Tools</h2>
                    <ul className="list-disc list-inside">
                        {formData.tools ? formData.tools.split(",").map((tool, index) => (
                            <li key={index} className="text-gray-700">{tool.trim()}</li>
                        )) : "Add the marketing tools you're proficient in."}
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Campaign Experience</h2>
                    <p className="text-gray-700">{formData.campaignExperience || "Add your campaign experience here."}</p>

                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Target Audience</h2>
                    <p className="text-gray-700">{formData.targetAudience || "Add the target audience for your campaigns."}</p>
                </section>
            )}

            {cvType === 'healthcare' && (
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Healthcare Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills ? formData.skills.split(",").map((skill, index) => (
                            <li key={index} className="text-gray-700">{skill.trim()}</li>
                        )) : "Add your healthcare skills here."}
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Healthcare Tools</h2>
                    <ul className="list-disc list-inside">
                        {formData.tools ? formData.tools.split(",").map((tool, index) => (
                            <li key={index} className="text-gray-700">{tool.trim()}</li>
                        )) : "Add healthcare tools you're proficient in."}
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Clinical Experience</h2>
                    <p className="text-gray-700">{formData.clinicalExperience || "Describe your clinical experience here."}</p>
                </section>
            )}

            {cvType === 'graphicdesign' && (
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Graphic Design Skills</h2>
                    <ul className="list-disc list-inside">
                        {formData.skills ? formData.skills.split(",").map((skill, index) => (
                            <li key={index} className="text-gray-700">{skill.trim()}</li>
                        )) : "Add your graphic design skills here."}
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Design Tools</h2>
                    <ul className="list-disc list-inside">
                        {formData.tools ? formData.tools.split(",").map((tool, index) => (
                            <li key={index} className="text-gray-700">{tool.trim()}</li>
                        )) : "Add design tools you're familiar with."}
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Portfolio</h2>
                    <p className="text-gray-700">{formData.portfolio || "Provide a link to your design portfolio."}</p>
                </section>
            )}

            {/* Certifications */}
            {formData.certifications && (
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Certifications</h2>
                    <ul className="list-disc list-inside">
                        {formData.certifications.split(",").map((cert, index) => (
                            <li key={index} className="text-gray-700">{cert.trim()}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Projects */}
            {formData.projects && (
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 pb-2">Projects</h2>
                    <p className="text-gray-700">{formData.projects}</p>
                </section>
            )}

        </div>
    );
}
