import NavBar from "@components/NavBar.jsx";

export default function Service() {
    return (
        <main className="flex flex-col min-h-screen text-white p-8 gap-8 max-w-[80ch] mx-auto">
            <NavBar />

            <h1 className="font-primary text-7xl" id="header">Terms of Service</h1>

            <p>Welcome to Utools! By accessing and using our platform at <a className="hoverable text-pink" href="https://utools-agt.vercel.app/">https://utools-agt.vercel.app</a>, you agree to be bound by these Terms of Service. Please read them carefully.</p>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">1. Service Description</h2>
                <p>Utools is a web platform that allows users to:</p>
                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>Create accounts using OAuth authentication (Google, GitHub, Twitch)</li>
                    <li>Submit posts with titles, descriptions, links, and images</li>
                    <li>Categorize and organize their content</li>
                    <li>Access a personal dashboard to manage their posts</li>
                    <li>Upload and manage images related to their posts</li>
                </ul>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">2. Account Registration and Eligibility</h2>
                
                <div>
                    <h3 className="text-lg font-semibold text-pink">Eligibility</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>You must be at least 13 years old to use our service</li>
                        <li>You must provide accurate information during account creation</li>
                        <li>You are responsible for maintaining the security of your account</li>
                        <li>One person may not maintain more than one account</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Account Security</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>You are responsible for all activities under your account</li>
                        <li>You must immediately notify us of any unauthorized access</li>
                        <li>We are not liable for losses due to compromised accounts</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">3. Content Submission and Guidelines</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Content Standards</h3>
                    <p>All content submitted to our platform must:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Be original or properly attributed</li>
                        <li>Not violate any copyrights or intellectual property rights</li>
                        <li>Be appropriate and not contain offensive, harmful, or illegal material</li>
                        <li>Not contain spam, malware, or malicious links</li>
                        <li>Be relevant to the intended purpose of the platform</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Prohibited Content</h3>
                    <p>You may not submit content that:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Contains hate speech, harassment, or discriminatory language</li>
                        <li>Promotes violence or illegal activities</li>
                        <li>Contains adult content or material inappropriate for minors</li>
                        <li>Infringes on privacy rights of others</li>
                        <li>Contains false or misleading information</li>
                        <li>Attempts to exploit or harm minors</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Image Upload Policy</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Images must be in supported formats (JPEG, PNG, WebP, GIF)</li>
                        <li>File size limit: 5MB per image</li>
                        <li>Images must comply with all content guidelines above</li>
                        <li>We reserve the right to remove inappropriate images</li>
                        <li>You retain ownership of your images but grant us license to display them</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">4. Content Moderation and Enforcement</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Moderation Process</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>All submitted content may be subject to review and moderation</li>
                        <li>We reserve the right to remove content that violates these terms</li>
                        <li>Content decisions are made at our sole discretion</li>
                        <li>We may moderate content before or after publication</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Enforcement Actions</h3>
                    <p>Violations may result in:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Content removal or modification</li>
                        <li>Warning notifications</li>
                        <li>Temporary suspension of posting privileges</li>
                        <li>Permanent account termination</li>
                        <li>Legal action for severe violations</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">5. Intellectual Property Rights</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Your Content</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>You retain ownership of content you submit</li>
                        <li>You grant us a non-exclusive license to display, store, and distribute your content</li>
                        <li>You represent that you have the right to grant this license</li>
                        <li>You are responsible for any copyright violations in your content</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Our Platform</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>The Utools platform, design, and code are our intellectual property</li>
                        <li>You may not copy, modify, or reverse engineer our platform</li>
                        <li>Our trademarks and logos are protected intellectual property</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">DMCA Policy</h3>
                    <p>If you believe content violates your copyright:</p>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Contact us immediately with details of the alleged infringement</li>
                        <li>Provide proof of your ownership or authorization</li>
                        <li>We will investigate and take appropriate action</li>
                        <li>False claims may result in legal consequences</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">6. Privacy and Data Protection</h2>
                <p>Your privacy is important to us. Our data collection and usage practices are detailed in our <a className="hoverable text-pink" href="/privacy">Privacy Policy</a>. By using our service, you also agree to our privacy practices.</p>
                
                <div>
                    <h3 className="text-lg font-semibold text-pink">Key Privacy Points</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>We collect minimal necessary data for service operation</li>
                        <li>We use Vercel Analytics to improve our service</li>
                        <li>We do not sell your personal data to third parties</li>
                        <li>You can request data deletion at any time</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">7. Service Availability and Limitations</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Service Availability</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>We strive to maintain high availability but cannot guarantee 100% uptime</li>
                        <li>Scheduled maintenance will be announced when possible</li>
                        <li>We may temporarily restrict access during high traffic or technical issues</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Usage Limitations</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Reasonable use limits may apply to prevent abuse</li>
                        <li>Automated or bot access is prohibited without permission</li>
                        <li>Rate limiting may be applied to API or form submissions</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">8. Disclaimers and Limitation of Liability</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Service Disclaimer</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Our service is provided "as is" without warranties of any kind</li>
                        <li>We do not guarantee the accuracy or completeness of user content</li>
                        <li>We are not responsible for user-generated content or external links</li>
                        <li>Technical issues may occasionally affect service quality</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Limitation of Liability</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>We are not liable for any indirect, incidental, or consequential damages</li>
                        <li>Our total liability is limited to the amount you paid for our service (currently $0)</li>
                        <li>We are not responsible for data loss, though we make reasonable backup efforts</li>
                        <li>Users are responsible for maintaining their own content backups</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">9. Account Termination</h2>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Termination by You</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>You may delete your account at any time</li>
                        <li>Account deletion will permanently remove your data</li>
                        <li>You should download any content you wish to keep before deletion</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Termination by Us</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>We may terminate accounts for terms violations</li>
                        <li>We may terminate accounts for prolonged inactivity</li>
                        <li>We will provide notice when possible, except for severe violations</li>
                        <li>Terminated users may not create new accounts without permission</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-pink">Effect of Termination</h3>
                    <ul className="list-disc list-inside pl-4 marker:text-pink">
                        <li>Access to the service will be immediately revoked</li>
                        <li>Your content may be removed from the platform</li>
                        <li>These terms will continue to apply to past use of the service</li>
                    </ul>
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">10. Changes to Terms</h2>
                <p>We may modify these Terms of Service from time to time. Changes will be effective when posted on this page. Significant changes will be communicated through:</p>
                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>Email notification to registered users</li>
                    <li>Prominent notice on our platform</li>
                    <li>Updated "Last modified" date below</li>
                </ul>
                <p>Continued use of our service after changes constitutes acceptance of the new terms.</p>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">11. Governing Law and Disputes</h2>
                <p>These terms are governed by the laws of the jurisdiction where our service is operated. Any disputes will be resolved through:</p>
                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>Good faith negotiation first</li>
                    <li>Mediation if negotiation fails</li>
                    <li>Binding arbitration as a last resort</li>
                </ul>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl">12. Contact Information</h2>
                <p>Questions about these Terms of Service? Contact us:</p>
                <ul className="list-disc list-inside pl-4 marker:text-pink">
                    <li>Email: <a className="hoverable text-pink" href="mailto:tonnigt22@gmail.com">tonnigt22@gmail.com</a></li>
                    <li>Website: <a className="hoverable text-pink" href="https://utools-agt.vercel.app/">https://utools-agt.vercel.app/</a></li>
                </ul>
                <p>We will respond to inquiries within 48 hours during business days.</p>
            </section>

            <p className="text-sm text-gray-50/80">Last updated: September 8, 2025</p>
        </main>
    );
}