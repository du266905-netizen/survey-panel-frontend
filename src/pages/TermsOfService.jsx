import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using the Survey Panel Management Platform (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Use License</h2>
              <p className="leading-relaxed">
                Permission is granted to temporarily download one copy of the materials (information or software) on the Survey Panel Management Platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the Service</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Disclaimer</h2>
              <p className="leading-relaxed">
                The materials on the Survey Panel Management Platform are provided on an 'as is' basis. Guan Yi Research Media makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Limitations</h2>
              <p className="leading-relaxed">
                In no event shall Guan Yi Research Media or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Survey Panel Management Platform, even if Guan Yi Research Media or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Accuracy of Materials</h2>
              <p className="leading-relaxed">
                The materials appearing on the Survey Panel Management Platform could include technical, typographical, or photographic errors. Guan Yi Research Media does not warrant that any of the materials on the Service are accurate, complete, or current. Guan Yi Research Media may make changes to the materials contained on the Service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Links</h2>
              <p className="leading-relaxed">
                Guan Yi Research Media has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Guan Yi Research Media of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Modifications</h2>
              <p className="leading-relaxed">
                Guan Yi Research Media may revise these terms of service for the Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Governing Law</h2>
              <p className="leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Guan Yi Research Media operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
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
