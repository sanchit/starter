import Link from 'next/link';

export const DesignWork = () => {
    return (
        <div className="design-work-container">
            <div className="design-work-content">
                <p className="page-description">A timeline of my design work</p>

                <section className="work-section">
                    <h2 className="employer-title">Coursera</h2>
                    <p className="work-dates">2022 - present</p>
                    <p className="work-description">
                        I currently lead end to end design for our mobile apps. In just three years,
                        I&apos;ve shipped more projects here than in the previous seven combined. That&apos;s
                        been possible thanks to minimal red tape, a high level of trust, and the freedom
                        to improve the experience wherever I and the team see a need.
                    </p>
                    <div className="mockups-container">
                        <img
                            src="/portfolio-images/1 coursera mobile dark.png"
                            alt="Coursera Native Apps - Dark Theme"
                            className="mockup-image"
                        />
                        <img
                            src="/portfolio-images/2 coursera mobile light.png"
                            alt="Coursera Native Apps - Light Theme"
                            className="mockup-image"
                        />
                    </div>
                </section>

                <section className="work-section">
                    <h2 className="employer-title">Bld.ai</h2>
                    <p className="work-dates">2020 - 2022</p>
                    <p className="work-description">
                        Agencies are hard to run even if you don&apos;t join one 3 months before a global pandemic.
                        But I&apos;m still proud of the work I did there.
                    </p>
                    <div className="mockups-container">
                        <img
                            src="/portfolio-images/5 bld.png"
                            alt="Bld.ai - Design Work"
                            className="mockup-image"
                        />
                    </div>
                </section>

                <section className="work-section">
                    <h2 className="employer-title">YouTube</h2>
                    <p className="work-dates">2016 - 2019</p>
                    <p className="work-description">
                        I consider YouTube my real start. Great people, awesome product, but I was still a
                        small cog in a big machine. I worked on double tap to seek, player improvements,
                        queuing, the mini-player, playlists, the library tab, and Shorts.
                    </p>
                    <div className="mockups-container">
                        <img
                            src="/portfolio-images/7 Youtube.png"
                            alt="YouTube - Mobile App Features"
                            className="mockup-image"
                        />
                    </div>
                </section>

                <section className="work-section">
                    <h2 className="employer-title">Google Search / Maps</h2>
                    <p className="work-dates">2015 - 2016</p>
                    <p className="work-description">
                        First job out of college. Learned a ton about users, but also the negatives of how large companies function.
                        I left the team quickly because I wanted to work on teams where I could have a larger impact.
                    </p>
                    <div className="mockups-container">
                        <img
                            src="/portfolio-images/8 google.png"
                            alt="Google Search / Maps - Design Work"
                            className="mockup-image"
                        />
                    </div>
                </section>
                
                <div className="back-to-portfolio">
                    <Link href="/portfolio" className="back-link">
                        ← Back to Portfolio
                    </Link>
                </div>
            </div>
        </div>
    );
};