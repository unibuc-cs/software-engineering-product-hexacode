import { useState } from 'react';

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6">
                <div className="hidden lg:flex lg:gap-x-24 px-56">
                    {['Home', 'About', 'Features', 'Login/Sign in'].map((item) => (
                        <a key={item} href="#" className="text-sm font-semibold text-white">
                            {item}
                        </a>
                    ))}
                </div>
                <div className="lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                    >
                        <span className="sr-only">Open main menu</span>
                        ☰
                    </button>
                </div>
            </nav>
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-10 bg-gray-900 p-6">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                        >
                            <span className="sr-only">Close menu</span>
                            ✖
                        </button>
                    </div>
                    <div className="mt-6">
                        {['Product', 'Features', 'Marketplace', 'Company'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-gray-800"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
