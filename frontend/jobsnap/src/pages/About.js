'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import students_1 from '../assets/students_1.png'
import students_2 from '../assets/students_2.png'
import cover from '../assets/cover.jpg'
import React from 'react';
const stats = [
    { label: 'Recruiters use social media to find candidates', value: '77%' },
    { label: 'Students feel unprepared for the job market', value: '63%' },
    { label: 'New users joining JobSnap annually', value: '46,000' },
]


export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">
            <main className="isolate">
                {/* Hero section */}
                <div className="relative isolate -z-10">
                    <svg
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                    >
                        <defs>
                            <pattern
                                x="50%"
                                y={-1}
                                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                                width={200}
                                height={200}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
                    </svg>
                    <div
                        aria-hidden="true"
                        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                            }}
                            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                        />
                    </div>
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-6xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-0">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <h1 className="text-pretty text-5xl font-semibold text-gray-900 sm:text-6xl">
                                        Simplifying your job application journey.
                                    </h1>
                                    <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                                        At JobSnap, our mission is to empower students to showcase their skills and experiences through tailored professional profiles and dynamic CVs. We strive to bridge the gap between education and employment.
                                    </p>
                                </div>
                                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <img
                                                alt=""
                                                src={students_1}
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <img
                                                alt=""
                                                src={students_2}
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                alt=""
                                                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Our Vision</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl/8 text-gray-600">
                                    We strive to be the leading platform that transforms how students approach job applications, ultimately leading to successful careers in their chosen fields.
                                </p>
                                <p className="mt-10 max-w-xl text-base/7 text-gray-700">
                                    Our vision is to support students in their continuous growth and learning journey. We recognize that the job market is constantly evolving, and we are committed to helping students adapt their profiles and CVs to meet these changes. Through personalized resources and ongoing support, we aim to equip students with the skills and knowledge they need to thrive in their chosen fields. Our ultimate goal is to see students succeed in their career aspirations and build fulfilling professional lives.
                                </p>
                            </div>
                            <div className="lg:flex lg:flex-auto lg:justify-center">
                                <dl className="w-64 space-y-8 xl:w-80">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                                            <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                                            <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image section */}
                <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
                    <img
                        alt=""
                        src={cover}
                        className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
                    />
                </div>

                {/* Testimonials section */}
                <section className="bg-white py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <div className="flex flex-col pb-10 sm:pb-16 lg:pb-0 lg:pr-8 xl:pr-20">
                                <figure className="mt-10 flex flex-auto flex-col justify-between">
                                    <blockquote className="text-lg/8 text-gray-900">
                                        <p>
                                            "JobSnap has completely transformed the way I present my skills and experiences. I was able to create an attractive professional profile, which helped me receive job offers that I wouldn't have gotten otherwise. I highly recommend this platform to all students!"
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-10 flex items-center gap-x-6">
                                        <div className="text-base">
                                            <div className="font-semibold text-gray-900">Maria Popescu</div>
                                            <div className="mt-1 text-gray-500">Graduate from University of Economics</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                            <div className="flex flex-col border-t border-gray-900/10 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:pl-20">
                                <figure className="mt-10 flex flex-auto flex-col justify-between">
                                    <blockquote className="text-lg/8 text-gray-900">
                                        <p>
                                            "Using JobSnap, I was able to enhance my resume and highlight my achievements. The assistance I received was crucial in successfully navigating my job search. I am very grateful for the support provided, and I am now employed in a field that I love!"
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-10 flex items-center gap-x-6">
                                        <div className="text-base">
                                            <div className="font-semibold text-gray-900">Andrei Ionescu</div>
                                            <div className="mt-1 text-gray-500">Student at Technical University</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    )
}
