import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
        question: "How does JobSnap help me customize my CV?",
        answer:
            "JobSnap provides tailored CV templates for various industries. Based on your chosen job role, the platform suggests the most relevant skills, experience, and education fields to include. This ensures that your CV highlights the right information for the job you're applying for.",
    },
    {
        question: "Can employers search for students on JobSnap?",
        answer:
            "Absolutely! Employers can search for student profiles on JobSnap, view their CVs, and contact them directly for job opportunities. The platform helps streamline the connection between students and employers, making the recruitment process more efficient.",
    },
    {
        question: "Are the CV templates in JobSnap free to use?",
        answer:
            "Yes, JobSnap offers a variety of free CV templates that can be customized according to your needs. Premium templates are also available for more advanced designs and additional features.",
    },
    {
        question: "Can I update my CV after I've created it?",
        answer:
            " Yes, you can update your CV at any time. JobSnap allows you to edit your profile, add new experiences, skills, or education, and re-download or share your updated CV as needed.",
    },
    {
        question: "Is my data secure on JobSnap?",
        answer:
            " Yes, JobSnap takes your privacy and data security very seriously. We use industry-standard encryption to protect your personal information and ensure that your CV and profile are only accessible to you and employers you choose to share them with.",
    },


]

export default function Example() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-4 sm:py-4 lg:px-8 lg:py-4">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        Frequently asked questions
                    </h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq) => (
                            <Disclosure key={faq.question} as="div" className="pt-6">
                                <dt>
                                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                                        <span className="text-base/7 font-semibold">{faq.question}</span>
                                        <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                    </span>
                                    </DisclosureButton>
                                </dt>
                                <DisclosurePanel as="dd" className="mt-2 pr-12">
                                    <p className="text-base/7 text-gray-600">{faq.answer}</p>
                                </DisclosurePanel>
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
