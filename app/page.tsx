import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-[100px] mix-blend-multiply animate-blob"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
            <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-200/30 blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              New: Smart AI Categorization
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Organize your digital life <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                with intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop drowning in tabs. Save, organize, and access your favorite links from anywhere.
              A beautiful, intelligent home for your internet life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Organizing Free
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
              >
                View Demo
              </Link>
            </div>

            {/* Dashboard Preview / Mockup */}
            <div className="relative mx-auto max-w-5xl mt-12 transform perspective-1000">
              <div className="relative rounded-2xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-3xl lg:p-4 rotate-x-12 scale-95 opacity-90 hover:scale-100 hover:rotate-x-0 transition-all duration-700 ease-out shadow-2xl">
                <div className="bg-white rounded-xl shadow-inner border border-gray-200 overflow-hidden">
                  {/* Mockup Header */}
                  <div className="h-12 border-b border-gray-100 bg-gray-50 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="w-64 h-6 bg-white rounded-md mx-auto shadow-sm border border-gray-100"></div>
                    </div>
                  </div>
                  {/* Mockup Body */}
                  <div className="grid grid-cols-4 gap-6 p-6 min-h-[400px] bg-white text-left">
                    {/* Sidebar */}
                    <div className="col-span-1 border-r border-gray-100 pr-6 space-y-8">
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            All Bookmarks
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Favorites
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                            Archives
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Tags</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 px-3">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Work
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 px-3">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Design
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 px-3">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Development
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-3">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Bookmarks</h3>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-900 flex items-center justify-center text-white">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Card 1 */}
                        <div className="group p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </div>
                            <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-600">Dev</span>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1">GitHub</h4>
                          <h4 className="text-xs text-gray-500 line-clamp-2">Where the world builds software. Millions of developers and companies build, ship, and maintain their software on GitHub.</h4>
                        </div>

                        {/* Card 2 */}
                        <div className="group p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center text-white">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm9.82-9.822h-4.326c.213-.961.351-1.95.403-2.966 1.625.358 3.064 1.18 4.223 2.302l-.3.664zm-6.22 6.645c-1.155 1.059-2.616 1.776-4.227 1.996.341-1.637 1.096-3.136 2.155-4.364l2.072 2.368zm-6.195 2.179c-1.65-.213-3.15-.992-4.331-2.128l.261-.592h4.51c-.13 1.059-.283 2.05-.44 2.72zm-7.464-4.823c1.765-.506 3.668-.788 5.61-.788.165 0 .327.004.49.009.283 1.15.656 2.234 1.104 3.245l-7.204-2.466zm-.321-4.821l7.636 2.61c.427-1.002 1.258-3.033.435-5.908-2.977 1.486-5.466 3.868-7.072 6.946l-.999-3.648zm9.325-7.584c-1.25-.494-2.458-.87-3.626-1.111 1.258-.271 2.586-.337 3.921-.186.208.43.413.864.607 1.298l-.902-.001zm3.886 1.406c.925.864 1.655 1.936 2.126 3.125l-4.708-1.574c-.066-.37-.145-.733-.231-1.092l2.813-.459zm1.705 5.865c-1.745.485-3.618.756-5.54.764l-.066-.001c-.247-1.125-.561-2.193-.934-3.197l6.54 2.434z" /></svg>
                            </div>
                            <span className="px-2 py-1 rounded-md bg-pink-50 text-xs font-medium text-pink-600">Design</span>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1">Dribbble</h4>
                          <h4 className="text-xs text-gray-500 line-clamp-2">Discover the world’s top designers & creatives. Show, tell, promote, and find inspiration.</h4>
                        </div>

                        {/* Card 3 */}
                        <div className="group p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 22.525H0l12-21.05 12 21.05z" /></svg>
                            </div>
                            <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-600">Cloud</span>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1">Vercel</h4>
                          <h4 className="text-xs text-gray-500 line-clamp-2">Vercel is the platform for frontend developers, providing the speed and reliability innovators need.</h4>
                        </div>

                        {/* Card 4 */}
                        <div className="group p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <span className="px-2 py-1 rounded-md bg-indigo-50 text-xs font-medium text-indigo-600">Productivity</span>
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1">Linear</h4>
                          <h4 className="text-xs text-gray-500 line-clamp-2">Linear is a better way to build products. Meet the new standard for modern software development.</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Powerful features to help you manage your web resources efficiently.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lightning Fast',
                desc: 'Save and search your bookmarks instantly with our optimized engine.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
                color: 'blue'
              },
              {
                title: 'Secure & Private',
                desc: 'Your data is encrypted at rest and in transit. Privacy by design.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ),
                color: 'indigo'
              },
              {
                title: 'Smart Organization',
                desc: 'AI-powered tagging and categorization keeps your library tidy.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                ),
                color: 'purple'
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className={`w-6 h-6 text-${feature.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">LinkLedger</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} LinkLedger. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
