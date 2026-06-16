import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/login')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Login
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
              <p className="leading-relaxed">
                Guan Yi Research Media ("we", "us", "our", or "Company") operates the Survey Panel Management Platform website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Information Collection and Use</h2>
              <p className="leading-relaxed">
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">Types of Data Collected:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Personal Data: Email address, name, and other information you provide</li>
                <li>Usage Data: Information about how you use our Service</li>
                <li>Survey Data: Responses and feedback you provide through our surveys</li>
                <li>Device Information: Browser type, IP address, and device identifiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Use of Data</h2>
              <p className="leading-relaxed">
                Guan Yi Research Media uses the collected data for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Security of Data</h2>
              <p className="leading-relaxed">
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> heguanyi@guanyi-media.com
              </p>
              <p>
                <strong>Company:</strong> Guan Yi Research Media
              </p>
            </section>
          </div>

          <footer className="border-t mt-8 pt-6 text-center text-sm text-gray-600">
            <p>&copy; 2026 Guan Yi Research Media. All rights reserved.</p>
            <div className="flex gap-4 justify-center mt-2">
              <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            </div>
            <p className="mt-2">Contact: heguanyi@guanyi-media.com</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
