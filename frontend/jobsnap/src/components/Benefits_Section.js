import { ArrowDownTrayIcon, ClipboardDocumentCheckIcon, PresentationChartBarIcon } from '@heroicons/react/20/solid'
import cover2 from "../assets/cover2.jpg";

const features = [
    {
        name: 'Effortless Profile Creation',
        description:
            'Build your professional profile in minutes, highlighting your education, skills, and experience.',
        href: '#',
        icon: ClipboardDocumentCheckIcon,
    },
    {
        name: 'Tailored CVs for Specific Jobs',
        description:
            'Generate job-specific CVs to present the most relevant information for each role.',
        href: '#',
        icon: PresentationChartBarIcon,
    },
    {
        name: 'Easy Export and Sharing',
        description:
            'Download your CV in multiple formats and share it with employers seamlessly.',
        href: '#',
        icon: ArrowDownTrayIcon,
    },
]

export default function Example() {
    return (
        <div className="bg-white -mt-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="mt-2 text-pretty text-4xl font-semibold text-gray-900 sm:text-5xl lg:text-balance">
                        Why Use JobSnap?
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                        Your journey to the perfect job starts with a standout CV!
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-12 lg:mt-20 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
                                    <feature.icon aria-hidden="true" className="size-5 flex-none text-indigo-600"/>
                                    {feature.name}
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="mt-10 sm:mt-20 xl:mx-auto xl:max-w-7xl xl:px-8">
                    <img
                        alt=""
                        src={cover2}
                        className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
                    />
                </div>
            </div>
        </div>
    )
}
