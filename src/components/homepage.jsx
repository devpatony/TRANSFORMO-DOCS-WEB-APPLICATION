import React from 'react';
import { FileText, Search, BarChart, FileCheck, Accessibility, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { SignOutButton } from '@clerk/clerk-react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';


const HomePage = () => {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">TransformoDocs</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#features" className="text-gray-500 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-500 hover:text-gray-900">How It Works</a>
              <a href="#analytics" className="text-gray-500 hover:text-gray-900">Analytics</a>
              <div className="flex space-x-2">
              <SignedOut>
                  <SignInButton>
                    <button className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                      Log In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                {/* Show Logout button when signed in */}
                <SignedIn>
                  <SignOutButton>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium">
                      Logout
                    </button>
                  </SignOutButton>
                </SignedIn>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Transform Documents into Machine-Readable, Accessible Content</h2>
              <p className="text-xl mb-8">Our platform ensures your documents are machine-readable, accessible, summarized, and provide valuable analytics for informed decision-making.</p>
              <div className="flex space-x-4">
                <a href='#features' className="px-6 py-3 bg-white text-blue-700 rounded-md font-medium hover:bg-gray-100">Get Started</a>
                <a href='#features' className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-blue-700">Learn More</a>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="public\imagehome.jpg" alt="Document Transformation" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Core objectives section */}
      <section id="features" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Objectives</h2>
            <p className="mt-4 text-xl text-gray-600">TransformoDocs delivers five essential document transformation capabilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Objective 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Restrict Non-Machine-Readable Documents</h3>
              <p className="text-gray-600 flex-grow">Our validation system prevents upload of non-machine-readable formats, ensuring only compatible documents enter your workflow.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Advanced format detection • Compatibility warnings • Format requirements</p>
              </div>
              <Link to="/feature1" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
                Learn More
              </Link>
            </div>

            {/* Objective 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automate Machine-Readable Conversion</h3>
              <p className="text-gray-600 flex-grow">Automatically convert all new documents into machine-readable formats, enhancing data utility across your organization.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Multi-format conversion • Metadata enhancement • Batch processing</p>
              </div>
              <Link to="/feature2" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
                Learn More
              </Link>
            </div>

            {/* Objective 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Accessibility className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enhance Searchability & Accessibility</h3>
              <p className="text-gray-600 flex-grow">Make all documents easily searchable and compliant with accessibility standards, ensuring information is available to everyone.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">ADA compliance • Full-text indexing • Screen reader optimization</p>
              </div>
              <Link to="/feature3" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
                Learn More
              </Link>
            </div>

            {/* Objective 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Summarize Document Content</h3>
              <p className="text-gray-600 flex-grow">Generate concise summaries of documents automatically, enabling quick insights and facilitating faster decision-making.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">AI-powered summaries • Key point extraction • Customizable detail levels</p>
              </div>
              <Link to="/feature4" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
                Learn More
              </Link>
            </div>

            {/* Objective 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Analytics & Reporting</h3>
              <p className="text-gray-600 flex-grow">Track document usage, transformation metrics, and compliance to derive insights and continuously improve data quality.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Usage dashboards • Compliance reporting • Data quality metrics</p>
              </div>
              <Link to="/feature5" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
                Learn More
              </Link>
            </div>

            {/* Objective 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Document Collaboration</h3>
              <p className="text-gray-600 flex-grow">Chat with documents in real-time, improving productivity and reducing errors.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Live Chatting • Commenting </p>
              </div>
              <Link to="/feature6" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How TransformoDocs Works</h2>
            <p className="mt-4 text-xl text-gray-600">A streamlined process for document transformation</p>
          </div>

          <div className="relative">
            {/* Process steps with connecting line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-2">Account Creation & Setup</h3>
                    <p className="text-gray-600">Sign up and configure your document requirements and accessibility standards.</p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 w-12 h-12 rounded-full bg-blue-600 text-white transform -translate-x-1/2 items-center justify-center">
                    <span className="font-bold text-xl">1</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-sm text-gray-500">• Set up your organization profile<br />• Configure document policies<br />• Customize accessibility requirements</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 md:text-right">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-sm text-gray-500">• Secure login access<br />• Role-based permissions<br />• Document upload after authentication</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 w-12 h-12 rounded-full bg-blue-600 text-white transform -translate-x-1/2 items-center justify-center">
                    <span className="font-bold text-xl">2</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-semibold mb-2">Secure Access & Upload</h3>
                    <p className="text-gray-600">Log in to your account to begin securely uploading documents for processing.</p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-2">Document Transformation</h3>
                    <p className="text-gray-600">Our system validates, converts, and enhances your documents automatically.</p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 w-12 h-12 rounded-full bg-blue-600 text-white transform -translate-x-1/2 items-center justify-center">
                    <span className="font-bold text-xl">3</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-sm text-gray-500">• Format validation<br />• Machine-readable conversion<br />• Accessibility enhancements<br />• Content summarization</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 md:text-right">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-sm text-gray-500">• Document library<br />• Advanced search capabilities<br />• Access controls<br />• Version management</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 w-12 h-12 rounded-full bg-blue-600 text-white transform -translate-x-1/2 items-center justify-center">
                    <span className="font-bold text-xl">4</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-semibold mb-2">Document Management</h3>
                    <p className="text-gray-600">Organize, search, and manage all your transformed documents in one place.</p>
                  </div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative">
                <div className="md:flex items-center">
                  <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 md:text-right">
                    <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
                    <p className="text-gray-600">Access comprehensive reports and metrics on your document ecosystem.</p>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 w-12 h-12 rounded-full bg-blue-600 text-white transform -translate-x-1/2 items-center justify-center">
                    <span className="font-bold text-xl">5</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <p className="text-sm text-gray-500">• Usage dashboards<br />• Compliance reports<br />• Transformation metrics<br />• Data quality insights</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Analytics section */}
      <section id="analytics" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Advanced Analytics & Reporting</h2>
            <p className="mt-4 text-xl text-gray-600">Gain valuable insights from your document transformation process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="public\dashboard.jpg" alt="Analytics Dashboard" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Data-Driven Document Management</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="h-4 w-4 rounded-full bg-green-500"></span>
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-medium">Document Usage Tracking:</span> Monitor which documents are accessed most frequently and by whom.</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="h-4 w-4 rounded-full bg-green-500"></span>
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-medium">Transformation Metrics:</span> Track success rates, processing times, and format conversion statistics.</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="h-4 w-4 rounded-full bg-green-500"></span>
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-medium">Compliance Reporting:</span> Generate reports on accessibility compliance and document standards.</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="h-4 w-4 rounded-full bg-green-500"></span>
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-medium">Quality Improvement:</span> Identify patterns and opportunities to enhance document quality.</p>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="h-4 w-4 rounded-full bg-green-500"></span>
                  </div>
                  <p className="ml-3 text-gray-700"><span className="font-medium">Custom Dashboards:</span> Create personalized views for different roles and departments.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Document Ecosystem?</h2>
          <p className="text-xl mb-8">Join organizations that use TransformoDocs to ensure their documents are machine-readable, accessible, and provide valuable insights.</p>
          <div className="flex justify-center space-x-4">
          <SignUpButton>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                      Sign Up Free
                    </button>
          </SignUpButton>
            <button className="px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-blue-800">Request Demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-blue-400" />
                <h3 className="ml-2 text-xl font-bold text-white">TransformoDocs</h3>
              </div>
              <p className="text-sm">Transform your documents into machine-readable, accessible, and insightful resources.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Enterprise</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Tutorials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
            <p>© 2025 TransformoDocs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;