import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

const features = [
    {
        name: 'Step 1: Create Your Profile',
        description:
            'Sign up and fill in your personal details, education, and work experience',

    },
    {
        name: 'Step 2: Choose a Template',
        description:
            'Select from a variety of professionally designed CV templates tailored to different roles',

    },
    {
        name: 'Step 3: Customize Your CV',
        description:
            'Add your personal touch by editing sections, highlighting your skills, and tailoring your CV for specific job roles.',

    },
    {
        name: 'Step 4: Export and Apply',
        description:
            'Download your CV in PDF format and start applying to your dream jobs directly from the platform.',

    },
]

export default function Example() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <h2 className="col-span-2 text-pretty text-4xl font-semibold  text-gray-900 sm:text-5xl">
                         4 Simple Steps to Build Your Professional CV and Land Your Dream Job!
                    </h2>


                    <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div key={feature.name}>
                                <dt className="text-base/7 font-semibold text-gray-900">

                                    {feature.name}
                                </dt>
                                <dd className="mt-1 text-base/7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
