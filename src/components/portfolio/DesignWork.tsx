import Link from 'next/link';

export const DesignWork = () => {
    return (
        <div className="design-work-container">
            <div className="design-work-content">
                <p className="page-description">Maybe like a page showing broad strokes of your designs?</p>

                <section className="work-section">
                    <h2 className="employer-title">Coursera</h2>
                    <p className="work-dates">dates?</p>
                    <p className="work-description">
                        Some designs I did that I'm super proud of.
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
                    <h2 className="employer-title">YouTube</h2>
                    <p className="work-dates">2016 - 2019</p>
                    <p className="work-description">
                        An old png I pulled from when I applied to Coursera.
                    </p>
                    <div className="mockups-container">
                        <img
                            src="/portfolio-images/3 Youtube.png"
                            alt="YouTube - Mobile App Features"
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
