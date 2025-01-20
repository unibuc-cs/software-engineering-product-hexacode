import React from 'react';

import { DocumentCheckIcon, IdentificationIcon , BeakerIcon } from '@heroicons/react/20/solid'

const features = [
    {
        name: 'Role-Specific Field Suggestions',
        description:
            'Get personalized field suggestions based on your chosen job role, ensuring that you showcase the most relevant skills, experience, and qualifications to potential employers.',
        href: '#',
        icon: IdentificationIcon,
    },
    {
        name: ' See Your CV Take Shape in Real Time',
        description:
            'Instantly visualize how your CV evolves as you update your information. The real-time preview ensures your CV always looks professional and aligned with your career goals.',
        href: '#',
        icon:BeakerIcon  ,
    },
    {
        name: 'Easy Employer Access to Your Profile',
        description:
            'Employers can easily browse and access your customized CV. Share your profile directly with employers, making the job search process smoother for both sides.',
        href: '#',
        icon: DocumentCheckIcon,
    },
]

export default function Example() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="mt-2 text-pretty text-4xl font-semibold text-gray-900 sm:text-5xl lg:text-balance">
                        Customizable CV Templates for Every Role
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                        Choose from a wide range of professional CV templates designed specifically for various industries and job roles. Ensure your CV stands out with a format that’s tailored to the position you're applying for.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
                                    <feature.icon aria-hidden="true" className="size-5 flex-none text-indigo-600" />
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}


