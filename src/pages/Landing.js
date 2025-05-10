import { useState } from 'react';
import { FileText, Scissors, Layers, RefreshCw, ChevronDown, Check, ArrowRight, Menu, X, Star, MessageCircle, Phone, Mail, PlayCircle } from 'lucide-react';

export default function DocumentToolLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FileText className="h-8 w-8 text-white" />
                <span className="ml-2 text-2xl font-extrabold text-white hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105 drop-shadow-lg">
                  RNS DocFlow
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#features" className="border-transparent text-white hover:border-yellow-300 hover:text-yellow-300 px-1 pt-1 border-b-2 text-sm font-medium">
                  Features
                </a>
                <a href="#how-it-works" className="border-transparent text-white hover:border-yellow-300 hover:text-yellow-300 px-1 pt-1 border-b-2 text-sm font-medium">
                  How It Works
                </a>
                <a href="#pricing" className="border-transparent text-white hover:border-yellow-300 hover:text-yellow-300 px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </a>
                <a href="#faq" className="border-transparent text-white hover:border-yellow-300 hover:text-yellow-300 px-1 pt-1 border-b-2 text-sm font-medium">
                  FAQ
                </a>
                <a href="#blog" className="border-transparent text-white hover:border-yellow-300 hover:text-yellow-300 px-1 pt-1 border-b-2 text-sm font-medium">
                  Blog
                </a>
                <a href="#contact" className="border-transparent text-white hover:border-yellow-300 hover:text-yellow-300 px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-300"
              >
                {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-gradient-to-b from-purple-700 to-pink-600">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-purple-800 hover:border-yellow-300 hover:text-yellow-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-purple-800 hover:border-yellow-300 hover:text-yellow-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-purple-800 hover:border-yellow-300 hover:text-yellow-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-purple-800 hover:border-yellow-300 hover:text-yellow-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#blog"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-purple-800 hover:border-yellow-300 hover:text-yellow-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="#contact"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-white hover:bg-purple-800 hover:border-yellow-300 hover:text-yellow-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
                Document management <span className="text-green-400">reimagined</span> with <span className="text-pink-400">vibrant</span> <span className="text-yellow-400">simplicity</span>
              </h1>
              <p className="mt-4 max-w-lg text-xl text-gray-300">
                Edit, merge, split, and convert documents in one powerful platform. Streamline your workflow with intuitive tools designed for professionals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
              <a href='DJ_Maker/upload'><button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 hover:from-yellow-500 hover:to-green-600 shadow-lg transform transition hover:scale-105">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button></a>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl p-6 border-t-4 border-pink-500">
                <div className="flex mb-4">
                  <div className="h-3 w-3 bg-red-400 rounded-full mr-2"></div>
                  <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
                  <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex space-x-1 mb-6">
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === 'edit' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setActiveTab('edit')}
                  >
                    Edit
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === 'merge' ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setActiveTab('merge')}
                  >
                    Merge
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === 'split' ? 'bg-yellow-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setActiveTab('split')}
                  >
                    Split
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab === 'convert' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                    onClick={() => setActiveTab('convert')}
                  >
                    Convert
                  </button>
                </div>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 bg-gray-800 flex flex-col items-center justify-center">
                  {activeTab === 'edit' && (
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-green-400 mx-auto animate-bounce" />
                      <p className="mt-4 text-lg font-medium text-gray-200">Edit your documents with ease</p>
                      <p className="text-sm text-gray-400">Modify text, annotate PDFs, and more</p>
                    </div>
                  )}
                  {activeTab === 'merge' && (
                    <div className="text-center">
                      <Layers className="h-16 w-16 text-pink-400 mx-auto animate-pulse" />
                      <p className="mt-4 text-lg font-medium text-gray-200">Merge multiple documents</p>
                      <p className="text-sm text-gray-400">Combine files into a single document</p>
                    </div>
                  )}
                  {activeTab === 'split' && (
                    <div className="text-center">
                      <Scissors className="h-16 w-16 text-yellow-400 mx-auto animate-spin-slow" />
                      <p className="mt-4 text-lg font-medium text-gray-200">Split documents</p>
                      <p className="text-sm text-gray-400">Extract pages or sections from documents</p>
                    </div>
                  )}
                  {activeTab === 'convert' && (
                    <div className="text-center">
                      <RefreshCw className="h-16 w-16 text-orange-400 mx-auto animate-spin" />
                      <p className="mt-4 text-lg font-medium text-gray-200">Convert file formats</p>
                      <p className="text-sm text-gray-400">Change between popular document formats</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Powerful Document Management Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Everything you need to handle documents efficiently
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Edit Feature */}
            <div className="rounded-xl p-6 bg-gradient-to-br from-gray-700 to-gray-800 hover:shadow-xl transition-shadow border-b-4 border-green-500 transform transition hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-400">Document Editor</h3>
              <p className="mt-2 text-gray-300">
                Edit text, annotate PDFs, and modify document properties with our intuitive editor.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Text modification</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Image insertion</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">PDF annotation</span>
                </li>
              </ul>
            </div>

            {/* Merge Feature */}
            <div className="rounded-xl p-6 bg-gradient-to-br from-gray-700 to-gray-800 hover:shadow-xl transition-shadow border-b-4 border-pink-500 transform transition hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-pink-500 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-pink-400">Document Merger</h3>
              <p className="mt-2 text-gray-300">
                Combine multiple documents into a single, well-organized file with custom ordering.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Drag & drop ordering</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Cross-format merging</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Table of contents generation</span>
                </li>
              </ul>
            </div>

            {/* Split Feature */}
            <div className="rounded-xl p-6 bg-gradient-to-br from-gray-700 to-gray-800 hover:shadow-xl transition-shadow border-b-4 border-yellow-500 transform transition hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center mb-4">
                <Scissors className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-yellow-400">Document Splitter</h3>
              <p className="mt-2 text-gray-300">
                Extract pages or sections from documents and save them as separate files.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Page range selection</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Split by bookmark</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Content-based splitting</span>
                </li>
              </ul>
            </div>

            {/* Convert Feature */}
            <div className="rounded-xl p-6 bg-gradient-to-br from-gray-700 to-gray-800 hover:shadow-xl transition-shadow border-b-4 border-orange-500 transform transition hover:scale-105">
              <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-orange-400">Format Converter</h3>
              <p className="mt-2 text-gray-300">
                Convert documents between popular formats while preserving formatting and structure.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">20+ supported formats</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">Batch conversion</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-orange-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">OCR capabilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div id="how-it-works" className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              How DocFlow Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Three simple steps to manage your documents
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative transform transition hover:scale-105">
              <div className="absolute flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold text-xl">
                1
              </div>
              <div className="ml-24 bg-gray-800 bg-opacity-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-green-400">Upload your documents</h3>
                <p className="mt-2 text-gray-300">
                  Drag and drop your files or browse to select them. We support PDF, DOCX, XLSX, PPTX, and many image formats.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative transform transition hover:scale-105">
              <div className="absolute flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 text-white font-bold text-xl">
                2
              </div>
              <div className="ml-24 bg-gray-800 bg-opacity-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-pink-400">Choose your action</h3>
                <p className="mt-2 text-gray-300">
                  Select whether you want to edit, merge, split, or convert your documents. Configure the options according to your needs.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative transform transition hover:scale-105">
              <div className="absolute flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-xl">
                3
              </div>
              <div className="ml-24 bg-gray-800 bg-opacity-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-yellow-400">Download the results</h3>
                <p className="mt-2 text-gray-300">
                  Process your documents and download the results. Your files remain private and are deleted after processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorial Section */}
      

      {/* Testimonial Section */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Trusted by thousands of professionals
              </h2>
              <div className="mt-8 text-gray-300 space-y-6">
                <div className="bg-gray-700 p-6 rounded-xl shadow-xl border-l-4 border-green-500 transform transition hover:scale-105">
                  <div className="flex mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                  <p className="italic">
                    "DocFlow has revolutionized our document management process. The ability to easily merge and split PDFs has saved us countless hours of work."
                  </p>
                  <p className="mt-4 font-medium text-white">Sarah Johnson</p>
                  <p className="text-sm text-gray-400">Legal Assistant, Wilson & Partners</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-xl shadow-xl border-l-4 border-pink-500 transform transition hover:scale-105">
                  <div className="flex mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                  <p className="italic">
                    "The document converter is a game-changer. I can now easily convert between formats while maintaining all formatting and layout."
                  </p>
                  <p className="mt-4 font-medium text-white">Michael Chang</p>
                  <p className="text-sm text-gray-400">Project Manager, TechCorp</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-xl shadow-xl border-l-4 border-yellow-500 transform transition hover:scale-105">
                  <div className="flex mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-gray-500 fill-current" />
                  </div>
                  <p className="italic">
                    "DocFlow's intuitive interface and powerful features have made document management a breeze. Highly recommended!"
                  </p>
                  <p className="mt-4 font-medium text-white">Emily Davis</p>
                  <p className="text-sm text-gray-400">Marketing Manager, Bright Ideas</p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-16">
              <div className="bg-gray-700 p-8 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold text-white">Why customers love us</h3>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start transform transition hover:scale-105">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">Easy to use</h4>
                      <p className="mt-1 text-gray-300">Intuitive interface with no learning curve</p>
                    </div>
                  </div>
                  <div className="flex items-start transform transition hover:scale-105">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">Secure & private</h4>
                      <p className="mt-1 text-gray-300">Your documents are processed securely and deleted after completion</p>
                    </div>
                  </div>
                  <div className="flex items-start transform transition hover:scale-105">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">Fast processing</h4>
                      <p className="mt-1 text-gray-300">Even large documents are processed quickly</p>
                    </div>
                  </div>
                  <div className="flex items-start transform transition hover:scale-105">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">Excellent support</h4>
                      <p className="mt-1 text-gray-300">Our support team is ready to help you 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by Leading Companies
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Join thousands of professionals who trust DocFlow for their document management needs.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            <div className="flex items-center justify-center">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Company1" alt="Company1" />
            </div>
            <div className="flex items-center justify-center">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Company2" alt="Company2" />
            </div>
            <div className="flex items-center justify-center">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Company3" alt="Company3" />
            </div>
            <div className="flex items-center justify-center">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Company4" alt="Company4" />
            </div>
            <div className="flex items-center justify-center">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Company5" alt="Company5" />
            </div>
            <div className="flex items-center justify-center">
              <img className="h-12" src="https://via.placeholder.com/150x50?text=Company6" alt="Company6" />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 border-t-4 border-green-500">
              <div className="px-6 py-8">
                <h3 className="text-center text-2xl font-bold text-green-400">FREE</h3>
                <div className="mt-4 flex justify-center">
                  <span className="px-4 py-1 rounded-full text-xs uppercase tracking-wide font-semibold bg-green-900 text-green-300">
                    No credit card required
                  </span>
                </div>
                <p className="mt-8 text-center">
                  <span className="text-5xl font-extrabold text-white">$0</span>
                  <span className="text-base font-medium text-gray-400">/month</span>
                </p>
                <p className="mt-4 text-center text-sm text-gray-400">For occasional document management</p>
              </div>
              <div className="px-6 pb-8">
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">5 documents per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Basic editing features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Convert to PDF only</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">1 day file storage</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <a href='DJ_Maker/upload'><button className="w-full px-4 py-3 border border-transparent text-sm font-bold rounded-md text-black bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 shadow-lg">
                    Get started for free
                  </button></a>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 border-2 border-pink-500 relative">
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wider transform rotate-45 origin-bottom-left shadow-lg">
                  Popular
                </div>
              </div>
              <div className="px-6 py-8">
                <h3 className="text-center text-2xl font-bold text-pink-400">PRO</h3>
                <div className="mt-4 flex justify-center">
                  <span className="px-4 py-1 rounded-full text-xs uppercase tracking-wide font-semibold bg-pink-900 text-pink-300">
                    7-day free trial
                  </span>
                </div>
                <p className="mt-8 text-center">
                  <span className="text-5xl font-extrabold text-white">$9.99</span>
                  <span className="text-base font-medium text-gray-400">/month</span>
                </p>
                <p className="mt-4 text-center text-sm text-gray-400">For professionals and small teams</p>
              </div>
              <div className="px-6 pb-8">
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Unlimited documents</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Advanced editing features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Convert to multiple formats</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">7 days file storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-pink-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Priority support</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="w-full px-4 py-3 border border-transparent text-sm font-bold rounded-md text-black bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 shadow-lg">
                    Start free trial
                  </button>
                </div>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 border-t-4 border-yellow-500">
              <div className="px-6 py-8">
                <h3 className="text-center text-2xl font-bold text-yellow-400">ENTERPRISE</h3>
                <div className="mt-4 flex justify-center">
                  <span className="px-4 py-1 rounded-full text-xs uppercase tracking-wide font-semibold bg-yellow-900 text-yellow-300">
                    Custom pricing
                  </span>
                </div>
                <p className="mt-8 text-center">
                  <span className="text-5xl font-extrabold text-white">$24.99</span>
                  <span className="text-base font-medium text-gray-400">/month</span>
                </p>
                <p className="mt-4 text-center text-sm text-gray-400">For large teams and organizations</p>
              </div>
              <div className="px-6 pb-8">
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Unlimited documents</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">All editing features</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Convert to all formats</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">30 days file storage</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-300">API access</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="w-full px-4 py-3 border border-transparent text-sm font-bold rounded-md text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 shadow-lg">
                    Contact sales
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Comparison Table */}
          <div className="mt-16 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Feature
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Free
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Pro
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Documents per month</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Unlimited</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Editing features</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Basic</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Advanced</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">All</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Convert to multiple formats</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">File storage</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">1 day</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">7 days</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">30 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Priority support</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Dedicated account manager</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">API access</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">No</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div id="blog" className="py-16 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Latest from Our Blog
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Stay updated with our latest news and articles
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Blog Post 1 */}
            <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-400">May 10, 2025</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-gray-400">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-white">How to Streamline Your Document Workflow</h3>
                <p className="mt-2 text-gray-300">
                  Learn how to optimize your document management process with these expert tips and tricks.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-pink-400 hover:text-pink-500 font-medium">Read more</a>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-pink-400 to-pink-600"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-400">May 5, 2025</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-gray-400">7 min read</span>
                </div>
                <h3 className="text-xl font-bold text-white">The Future of Document Management</h3>
                <p className="mt-2 text-gray-300">
                  Explore the latest trends and innovations in document management technology.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-pink-400 hover:text-pink-500 font-medium">Read more</a>
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-400">April 28, 2025</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-gray-400">6 min read</span>
                </div>
                <h3 className="text-xl font-bold text-white">Top 10 Document Management Tools</h3>
                <p className="mt-2 text-gray-300">
                  Discover the best document management tools available in the market today.
                </p>
                <div className="mt-4">
                  <a href="#" className="text-pink-400 hover:text-pink-500 font-medium">Read more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Contact Us
              </h2>
              <p className="mt-4 max-w-lg text-xl text-gray-300">
                Have questions or need support? Get in touch with our team.
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white">Email</h4>
                    <p className="mt-1 text-gray-300">support@docflow.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white">Phone</h4>
                    <p className="mt-1 text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-white">Live Chat</h4>
                    <p className="mt-1 text-gray-300">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 lg:pl-16">
              <div className="bg-gray-700 p-8 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold text-white">Send us a message</h3>
                <form className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 bg-gray-800 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 bg-gray-800 text-white"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-3 border border-transparent text-sm font-bold rounded-md text-black bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 shadow-lg"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
              Everything you need to know about DocFlow
            </p>
          </div>

          <div className="mt-16 max-w-3xl mx-auto">
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-gray-700 rounded-xl shadow-md overflow-hidden transform transition hover:scale-105">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="font-medium text-lg text-white">What file formats does DocFlow support?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-300">
                    DocFlow supports a wide range of file formats including PDF, DOCX, XLSX, PPTX, JPG, PNG, and many more. You can view the complete list of supported formats on our documentation page.
                  </p>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-700 rounded-xl shadow-md overflow-hidden transform transition hover:scale-105">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="font-medium text-lg text-white">Is my data secure with DocFlow?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-300">
                    Yes, we take data security very seriously. All documents are processed securely and are automatically deleted from our servers after processing. We use industry-standard encryption to protect your data.
                  </p>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-700 rounded-xl shadow-md overflow-hidden transform transition hover:scale-105">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="font-medium text-lg text-white">Can I use DocFlow on my mobile device?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-300">
                    Yes, DocFlow is fully responsive and works on all devices, including mobile phones and tablets. You can access all features from your mobile browser.
                  </p>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-700 rounded-xl shadow-md overflow-hidden transform transition hover:scale-105">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center">
                  <span className="font-medium text-lg text-white">Do you offer a free trial?</span>
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </button>
                <div className="px-6 pb-4">
                  <p className="text-gray-300">
                    Yes, we offer a 7-day free trial for our Pro plan. You can sign up and try all the premium features without any commitment. No credit card is required for the free trial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to streamline your document workflow?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-white">
            Join thousands of professionals who trust DocFlow for their document management needs.
          </p>
          <div className="mt-8 flex justify-center">
          <a href='DJ_Maker/upload'><button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-md text-black bg-white hover:bg-gray-100 shadow-lg transform transition hover:scale-105">
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </button></a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-white" />
                <span className="ml-2 text-2xl font-extrabold text-white">
                  RNS DocFlow
                </span>
              </div>
              <p className="mt-4 text-gray-400">
                Streamline your document workflow with our powerful and intuitive tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white">Features</a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-white">FAQ</a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-white">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Careers</a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} RNS DocFlow. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
