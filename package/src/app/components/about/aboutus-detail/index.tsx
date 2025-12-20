const AboutusDetail = () => {
    return (
        <section className="py-10 md:py-20 xl:py-40 dark:bg-secondary">
            <div className='container'>
                <div className='flex flex-col xl:flex-row gap-8'>
                    <div className='max-w-xl w-full'>
                        <h2 className='text-56'>Umira Sinergi Global.</h2>
                    </div>
                    <div className='flex flex-col gap-12'>
                        <p className="text-secondary dark:text-white"> <strong className="block mb-2">Vision :</strong> "To become a globally competitive company that prioritizes quality and sustainability, brings broad benefits to society, and
                            upholds Islamic principles as the foundation of success and blessings."</p>
                        <div className='text-secondary dark:text-white'>
                            <strong className="block mb-2">Mission:</strong>
                            <ul className="list-disc list-outside pl-6 space-y-3">
                                <li>
                                    Integrating the principles of honesty, trustworthiness (Amanah), and transparency into all aspects of the business to build trust
                                    with customers, partners, and the wider community.
                                </li>
                                <li>
                                    Delivering high-quality services and products with cost efficiency and on-time delivery, guided by the values of excellence (Ihsan)
                                    and blessings in every business process.
                                </li>
                                <li>
                                    Creating a positive social impact, including through community empowerment programs and corporate social responsibility.
                                </li>
                                <li>
                                    Managing the business with a strong focus on occupational health and safety, environmental friendliness, and sustainability, in
                                    line with the concept of public benefit (Maslahah).
                                </li>
                                <li>
                                    Complying with Sharia principles in all business activities to uphold integrity and spiritual consciousness (Taqwa).
                                </li>
                            </ul>
                        </div>
                        <div className='text-secondary dark:text-white '>
                            <strong className="block mb-2">Company Value:</strong>
                            <ul className="list-disc list-outside pl-6 space-y-3">
                                <li>
                                    Ukhuwah: Brotherhood and Compassion
                                </li>
                                <li>
                                    Mashlahat: Bringing the Greatest Benefit
                                </li>
                                <li>
                                    Ikhlas, Istiqomah, Ihsan: Sincerity in seeking Allah's pleasure, consistency in truth and goodness, excellence and
                                    wholeheartedness in every endeavor
                                </li>
                                <li>
                                    Rahmah: Mercy and Kindness of Heart
                                </li>
                                <li>
                                    Amanah: Responsibility and Trustworthiness
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutusDetail