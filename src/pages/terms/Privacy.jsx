import Navbar from "@components/Navbar";
export default function Privacy() {
    return (
        <main className="flex flex-col min-h-screen text-white p-8 gap-8 max-w-[80ch] mx-auto">
            <Navbar></Navbar>

            <h1 className="font-primary-font text-8xl" id="header">Privacy Policy</h1>

            <p>At Utools, accessible from <a className=" text-pink" href="https://utools-agt.vercel.app/">https://utools-agt.vercel.app</a>, the privacy of our users is a priority. This Privacy Policy explains how we collect, use, and protect personal information.</p>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">1. Information we collect</h2>

                <div>
                    <p>When you use our web app, we may collect:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Your email address, username, and profile picture if you log in via Google, GitHub, or Twitch.</li>
                        <li>Basic navigation data (e.g., IP address, country, browser type).</li>
                    </ul>
                </div>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">2. How We Use the Information</h2>

                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>To allow users to sign in and submit posts.</li>
                    <li>To moderate the content submitted by users.</li>
                    <li>To manage user access and display approved content.</li>
                </ul>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">3. Cookies</h2>

                <div>
                    <p>We only use essential cookies necessary for:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>User authentication (login and session management)</li>
                    </ul>
                </div>
                <div>
                    <p>We do not use cookies for:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Analytics</li>
                        <li>Advertising</li>
                        <li>User tracking</li>
                    </ul>
                </div>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">4. Data Sharing</h2>
                <p>We do not share your personal information with third parties. Your data is securely stored using Supabase.</p>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">5. Your Rights</h2>

                <div>
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Request access to your data</li>
                        <li>Request deletion of your data</li>
                        <li>Modify or update your personal information</li>
                    </ul>
                    <p>To do this, contact us via the <a className="text-pink" href="/contact">contact page</a></p>
                </div>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">6. Changes to This Policy</h2>
                <p id="footer">We may update this privacy policy in the future. Changes will be notified on this page.</p>
            </section>

            <p className="text-sm text-gray-50/80">Last updated: 08/04/2025</p>
        </main>
    );
}