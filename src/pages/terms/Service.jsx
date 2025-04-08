import Navbar from "@components/Navbar.jsx";
export default function Service() {
    return (
        <main className="flex flex-col min-h-screen text-white p-8 gap-8 max-w-[80ch] mx-auto">
            <Navbar></Navbar>

            <h1 className="font-primary-font text-7xl" id="header">Terms of Service</h1>

            <p>These Terms of Service govern your use of Utools, accessible at <a className=" text-pink" href="https://utools-agt.vercel.app/">https://utools-agt.vercel.app</a>. By using our app, you agree to comply with these terms.</p>
            
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">1. Use of the Service</h2>

                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>You may use the application for free (unless stated otherwise).</li>
                    <li>You must be of legal age or have permission from a parent or guardian.</li>
                    <li>You must not use the app for illegal or harmful activities.</li>
                </ul>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">2. User Accounts</h2>

                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>You may sign in using third-party providers such as Google, GitHub, or Twitch.</li>
                    <li>You are responsible for keeping your account secure.</li>
                </ul>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">3. Limitation of Liability</h2>

                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>We do not guarantee 24/7 availability of the service.</li>
                    <li>We are not responsible for data loss or service interruptions.</li>
                </ul>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">4. Account Termination</h2>
                <p>We reserve the right to suspend accounts that violate these terms.</p>
            </section>
            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">5. Changes to the Terms</h2>
                <p id="footer">We may update this privacy policy in the future. Changes will be notified on this page.</p>
            </section>

            <p className="text-sm text-gray-50/80">Last updated: 08/04/2025</p>
        </main>
    );
}