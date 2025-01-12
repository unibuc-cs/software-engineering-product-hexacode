import React from "react";

export default function CVTemplate({ formData }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl mx-auto">
            {/* Numele complet */}
            <h1 className="text-3xl font-bold text-gray-900">
                {formData.fullName || "Your Full Name"}
            </h1>

            {/* Contact */}
            <p className="text-sm text-gray-600">
                {formData.email || "your.email@example.com"} | {formData.phone || "+123 456 7890"}
            </p>

            {/* Despre utilizator */}
            <h2 className="mt-6 text-xl font-semibold text-gray-900">Profile</h2>
            <p className="text-gray-700">
                {formData.summary || "Write a brief summary about yourself."}
            </p>

            {/* Skills */}
            <h2 className="mt-6 text-xl font-semibold text-gray-900">Skills</h2>
            <ul className="list-disc list-inside">
                {formData.skills
                    ? formData.skills.split(",").map((skill, index) => (
                        <li key={index} className="text-gray-700">
                            {skill.trim()}
                        </li>
                    ))
                    : "Add your skills here."}
            </ul>

            {/* Work Experience */}
            <h2 className="mt-6 text-xl font-semibold text-gray-900">Work Experience</h2>
            <p className="text-gray-700">
                {formData.experience || "Describe your work experience here."}
            </p>

            {/* Education */}
            <h2 className="mt-6 text-xl font-semibold text-gray-900">Education</h2>
            <p className="text-gray-700">
                {formData.education || "Add your educational background here."}
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
