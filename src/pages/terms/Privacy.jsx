export default function Privacy() {
    return (
        <main className="flex flex-col min-h-screen text-white p-8 gap-8 max-w-[80ch] mx-auto">

            <h1 className="font-primary text-8xl" id="header">Privacy Policy</h1>

            <p>At Utools, accessible from <a className="hoverable text-pink" href="https://utools-agt.vercel.app/">https://utools-agt.vercel.app</a>, the privacy of our users is our priority. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our web application.</p>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">1. Information We Collect</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Account Information</h3>
                    <p>When you create an account or sign in via OAuth providers, we collect:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Email address, username, and profile picture from Google, GitHub, or Twitch</li>
                        <li>Unique user identifier from the OAuth provider</li>
                        <li>Account creation and last login timestamps</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Content Data</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Posts you submit including titles, descriptions, links, and images</li>
                        <li>Categories you select for your posts</li>
                        <li>Post status and moderation history</li>
                        <li>Images uploaded to our storage system</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Technical Data</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>IP address and approximate location</li>
                        <li>Browser type, version, and device information</li>
                        <li>Page views and navigation patterns (via Vercel Analytics)</li>
                        <li>Performance metrics and error logs</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">2. How We Use Your Information</h2>

                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li><strong>Authentication:</strong> To verify your identity and maintain secure access to your account</li>
                    <li><strong>Content Management:</strong> To display, organize, and moderate user-submitted posts</li>
                    <li><strong>Platform Operations:</strong> To ensure proper functionality and improve user experience</li>
                    <li><strong>Analytics:</strong> To understand usage patterns and optimize our service</li>
                    <li><strong>Communication:</strong> To send important updates about your account or the service</li>
                    <li><strong>Security:</strong> To detect and prevent abuse, spam, or malicious activities</li>
                </ul>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">3. Data Storage and Security</h2>
                
                <div>
                    <h3 className="text-lg font-semibold text-pink">Storage Infrastructure</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>User data is securely stored using Supabase (PostgreSQL database)</li>
                        <li>Images are stored in Supabase Storage with secure access controls</li>
                        <li>All data is encrypted in transit and at rest</li>
                        <li>Regular backups are maintained to prevent data loss</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Security Measures</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>OAuth 2.0 authentication with trusted providers</li>
                        <li>Row-level security policies in our database</li>
                        <li>HTTPS encryption for all communications</li>
                        <li>Regular security updates and monitoring</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">4. Cookies and Tracking</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Essential Cookies</h3>
                    <p>We use essential cookies for:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>User authentication and session management</li>
                        <li>Security and fraud prevention</li>
                        <li>Basic functionality of the application</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Analytics</h3>
                    <p>We use Vercel Analytics to collect:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Page views and user interactions</li>
                        <li>Geographic location (country/region only)</li>
                        <li>Device and browser information</li>
                        <li>Performance metrics</li>
                    </ul>
                    <p className="text-sm text-gray-300">This data is anonymized and used only for improving our service.</p>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">5. Data Sharing and Third Parties</h2>
                
                <div>
                    <h3 className="text-lg font-semibold text-pink">We DO NOT share your personal data with:</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Advertising companies</li>
                        <li>Data brokers or marketing firms</li>
                        <li>Social media platforms (beyond OAuth authentication)</li>
                        <li>Any third parties for commercial purposes</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">We DO work with trusted service providers:</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li><strong>Supabase:</strong> Database and authentication services</li>
                        <li><strong>Vercel:</strong> Hosting and analytics services</li>
                        <li><strong>OAuth Providers:</strong> Google, GitHub, Twitch for authentication only</li>
                    </ul>
                    <p className="text-sm text-gray-300">These providers are bound by strict data protection agreements and cannot use your data for their own purposes.</p>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">6. Your Rights and Controls</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Data Access and Portability</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>View all your posts and account information in your Dashboard</li>
                        <li>Request a complete export of your personal data</li>
                        <li>Download your uploaded images</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Data Modification and Deletion</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Edit or delete your posts at any time through the Dashboard</li>
                        <li>Update your profile information</li>
                        <li>Request complete account deletion (this will permanently remove all your data)</li>
                        <li>Opt out of analytics tracking (contact us)</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">How to Exercise Your Rights</h3>
                    <p>To exercise any of these rights, you can:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Use the built-in controls in your Dashboard</li>
                        <li>Contact us at: <a className="hoverable text-pink" href="mailto:tonnigt22@gmail.com">tonnigt22@gmail.com</a></li>
                        <li>We will respond to your request within 30 days</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">7. Data Retention</h2>
                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li><strong>Account Data:</strong> Retained while your account is active</li>
                    <li><strong>Posts and Images:</strong> Retained until you delete them or your account</li>
                    <li><strong>Analytics Data:</strong> Aggregated and anonymized, retained for up to 2 years</li>
                    <li><strong>Deleted Data:</strong> Permanently removed within 30 days of deletion request</li>
                </ul>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">8. Children's Privacy</h2>
                <p>Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">9. International Data Transfers</h2>
                <p>Your data may be processed and stored in servers located in different countries through our service providers (Supabase and Vercel). We ensure appropriate safeguards are in place to protect your data regardless of location.</p>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">10. Changes to This Policy</h2>
                <p>We may update this privacy policy to reflect changes in our practices or legal requirements. We will notify users of significant changes by:</p>
                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>Posting the updated policy on this page</li>
                    <li>Updating the "Last updated" date below</li>
                    <li>For major changes, we may send an email notification</li>
                </ul>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">11. Contact Information</h2>
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>Email: <a className="hoverable text-pink" href="mailto:tonnigt22@gmail.com">tonnigt22@gmail.com</a></li>
                    <li>Website: <a className="hoverable text-pink" href="https://utools-agt.vercel.app/">https://utools-agt.vercel.app/</a></li>
                </ul>
            </section>

            <p className="text-sm text-gray-50/80">Last updated: September 8, 2025</p>
        </main>
    );
}