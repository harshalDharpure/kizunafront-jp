import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col font-sans">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-md">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  <span className="text-2xl">絆</span> KizunaBot
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium">Features</a>
              <a href="#technology" className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium">Technology</a>
            </div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <Link 
                  to="/dashboard"
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a 
                  href="/login"
                  className="text-gray-600 hover:text-orange-600 transition-colors duration-200 font-medium"
                >
                  Login
                </a>
                <a 
                  href="/signup"
                  className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/signup" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

// --- Reusable Components ---

function FeatureCard({ icon, title, description, color = "bg-white" }) {
  return (
    <div className={`${color} rounded-xl p-8 shadow-sm hover:shadow-md transition`}>
      <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function InsightItem({ number, title, description }) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold">
          {number}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

function AudienceCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition h-full">
      <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function ServiceCard({ title, icon: Icon, description, items, buttonLabel, buttonStyle, arrowIcon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition h-full flex flex-col">
      <div className="p-8 pb-0">
        <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
      <ul className="px-8 space-y-3 mb-8">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <svg className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto px-8 pb-8">
        <button className={buttonStyle}>
          {buttonLabel}
          {arrowIcon}
        </button>
      </div>
    </div>
  )
}

export default App