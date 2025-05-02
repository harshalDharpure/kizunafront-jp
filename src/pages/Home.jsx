import { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon,
  UserGroupIcon,
  LightBulbIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const videoOptions = {
    height: '100%',
    width: '100%',
    playerVars: { 
      autoplay: 0,
      modestbranding: 1,
      rel: 0
    },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-indigo-700 text-white pt-24 pb-32">
        {/* Background noise texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
          {/* Tagline */}
          <div className="inline-flex items-center bg-indigo-800/30 border border-indigo-700 rounded-full px-4 py-1 mb-6">
            <ShieldCheckIcon className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Privacy-first cognitive analysis</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-center">
            Transforming <span className="text-indigo-300">Speech</span> into <br />
            Cognitive <span className="text-indigo-300">Insights</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto text-center">
            Kizunabot detects early signs of cognitive decline through natural conversation patterns.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/signup"
              className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-indigo-50 transition flex items-center justify-center"
            >
              Get Started
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
            <button 
              onClick={scrollToVideo}
              className="border-2 border-white/30 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition flex items-center justify-center"
            >
              <PlayCircleIcon className="h-5 w-5 mr-2" />
              Watch Demo
            </button>
          </div>

          {/* YouTube Video */}
          <div ref={videoRef} className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
            <div className="relative w-full aspect-video bg-gray-900">
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition"
                  >
                    <PlayCircleIcon className="h-16 w-16 text-white" />
                  </button>
                </div>
              )}
              <YouTube
                videoId="G6azfVuuIBQ"
                opts={videoOptions}
                onPlay={() => setIsVideoPlaying(true)}
                className="absolute inset-0 w-full h-full"
                iframeClassName="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <div className="relative z-20 -mt-10">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-100">
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-indigo-700">100%</div>
              <div className="text-gray-600 mt-1">Privacy Focused</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-indigo-700">24/7</div>
              <div className="text-gray-600 mt-1">Passive Monitoring</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-indigo-700">95%</div>
              <div className="text-gray-600 mt-1">Accuracy</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-indigo-700">10K+</div>
              <div className="text-gray-600 mt-1">Conversations Analyzed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Natural Speech Analysis for <span className="text-indigo-600">Cognitive Wellness</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Kizunabot is an AI-powered conversational tool that passively monitors natural speech patterns to identify early cognitive changes. 
              Our privacy-first approach provides valuable insights without clinical intrusions, helping individuals, caregivers, and professionals 
              detect potential concerns through everyday interactions.
            </p>
          </div>
        </div>
      </section>

      {/* Why Kinabot */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-indigo-100 rounded-2xl p-8 shadow-inner">
                <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow overflow-hidden">
                  <img 
                    src="/grandma2.png" 
                    alt="Elderly woman smiling while using tablet"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Why <span className="text-indigo-600">Kizunabot</span> Stands Out
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Traditional cognitive screenings are often clinical, infrequent, and can be stressful. Kizunabot revolutionizes this approach by analyzing everyday conversations in a natural, unobtrusive way.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mt-1 mr-4">
                    <HeartIcon className="h-5 w-5 text-indigo-700" />
                  </div>
                  <span className="text-gray-700">Continuous monitoring without disrupting daily life</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mt-1 mr-4">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-indigo-700" />
                  </div>
                  <span className="text-gray-700">Accessible through everyday devices</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mt-1 mr-4">
                    <AcademicCapIcon className="h-5 w-5 text-indigo-700" />
                  </div>
                  <span className="text-gray-700">Backed by cutting-edge NLP research</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Measurements */}
      <section className="py-20 bg-white" id="technology">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Key Cognitive Indicators</h2>
            <p className="text-gray-600">
              Kizunabot analyzes multiple dimensions of speech to provide comprehensive insights into cognitive health.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ChartBarIcon className="h-10 w-10 text-indigo-600" />}
              title="Lexical Diversity"
              description="Measures vocabulary richness and complexity to assess cognitive flexibility and verbal fluency."
              color="bg-indigo-50"
            />
            <FeatureCard
              icon={<ChatBubbleLeftRightIcon className="h-10 w-10 text-indigo-600" />}
              title="Conversational Flow"
              description="Analyzes topic maintenance, coherence, and logical progression in conversations."
              color="bg-indigo-50"
            />
            <FeatureCard
              icon={<LightBulbIcon className="h-10 w-10 text-indigo-600" />}
              title="Memory Indicators"
              description="Detects patterns of repetition, word-finding difficulties, and recall challenges."
              color="bg-indigo-50"
            />
          </div>
        </div>
      </section>

      {/* AI-Powered Cognitive Insights */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Advanced AI Analysis</h2>
            <p className="text-gray-600">
              Kizunabot employs state-of-the-art natural language processing to transform everyday conversations into meaningful cognitive insights.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">How Our Technology Works</h3>
                <div className="space-y-6">
                  <InsightItem 
                    number="01" 
                    title="Speech Collection" 
                    description="Passively records natural conversations through everyday interactions" 
                  />
                  <InsightItem 
                    number="02" 
                    title="NLP Processing" 
                    description="Analyzes multiple linguistic and cognitive markers in real-time" 
                  />
                  <InsightItem 
                    number="03" 
                    title="Trend Analysis" 
                    description="Identifies patterns and changes over time for longitudinal tracking" 
                  />
                  <InsightItem 
                    number="04" 
                    title="Personalized Reports" 
                    description="Generates easy-to-understand visualizations of cognitive health" 
                  />
                </div>
              </div>
              <div className="bg-indigo-50 p-10 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-30"></div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-300 rounded-full opacity-30"></div>
                  <div className="relative bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-medium text-gray-900">Cognitive Health Dashboard</h4>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">Sample</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Lexical Diversity</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: '78%'}}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Topic Coherence</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Word Recall</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: '82%'}}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Repetition</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className="text-xs text-gray-500 mb-2">Last 30 Days Trend</div>
                      <div className="h-32 bg-indigo-50 rounded-lg flex items-end justify-between px-2">
                        {[20, 35, 50, 65, 45, 60, 78].map((value, index) => (
                          <div key={index} className="w-6 flex flex-col items-center">
                            <div 
                              className="w-4 bg-indigo-600 rounded-t-sm" 
                              style={{height: `${value}%`}}
                            ></div>
                            <div className="text-[8px] text-gray-500 mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      {/* <section className="py-20 bg-white" id="audience">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Who Benefits from Kizunabot</h2>
            <p className="text-gray-600">
              Our solution serves a diverse range of users concerned with cognitive wellness.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AudienceCard 
              icon={<UserGroupIcon className="h-8 w-8 text-indigo-600" />}
              title="Individuals"
              description="Those seeking to monitor their own cognitive health proactively"
            />
            <AudienceCard 
              icon={<HeartIcon className="h-8 w-8 text-indigo-600" />}
              title="Caregivers"
              description="Family members supporting loved ones with potential cognitive concerns"
            />
            <AudienceCard 
              icon={<AcademicCapIcon className="h-8 w-8 text-indigo-600" />}
              title="Professionals"
              description="Healthcare providers and senior care specialists"
            />
            <AudienceCard 
              icon={<BeakerIcon className="h-8 w-8 text-indigo-600" />}
              title="Researchers"
              description="Scientists studying cognitive health and aging"
            />
          </div>
        </div>
      </section> */}

      {/* Our Services */}
      {/* <section className="py-20 bg-gray-50" id="services">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Comprehensive Services</h2>
            <p className="text-gray-600">
              Beyond the core product, we offer specialized solutions for different needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard
              title="AI Research & Development"
              icon={BeakerIcon}
              description="Pushing the boundaries of human-AI interaction for cognitive health"
              items={[
                "Agent-Based Architecture for Risk Analysis",
                "Human-Robot Interaction Experience Design",
                "Motion Triggered Emotion Expression",
                "Companion Robot Kits for Elderly Care",
                "Ongoing NLP Research Publications"
              ]}
              buttonLabel="Explore Research"
              buttonStyle="text-indigo-600 font-medium hover:text-indigo-800 transition flex items-center group"
              arrowIcon={<ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />}
            />
            <ServiceCard
              title="Conversational Data Partnerships"
              icon={ChatBubbleLeftRightIcon}
              description="Collaborating with organizations to advance cognitive health research"
              items={[
                "Pharmaceutical Research Partnerships",
                "Senior Care Center Collaborations",
                "Longitudinal Conversational Datasets",
                "Clinical Trial Support Services",
                "Custom Research Solutions"
              ]}
              buttonLabel="Contact Our Team"
              buttonStyle="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition shadow-sm"
            />
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-16 bg-indigo-700 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Kizunabot?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Discover how Kizunabot can provide valuable insights into cognitive health through natural conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-indigo-50 transition">
                Request Demo
              </button>
              <button className="border-2 border-white/30 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Kizunabot</span>
              </div>
              <p className="text-gray-400 text-sm">
                From Words to Wellness - Transforming speech into cognitive health insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Demo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Research</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <div className="text-gray-400 text-sm">
                <p className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  contact@kizunabot.ai
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 AImoji LLC. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer> */} 
    </div>
  );
};

// Reusable Components
function FeatureCard({ icon, title, description, color = "bg-white" }) {
  return (
    <div className={`${color} rounded-xl p-8 shadow-sm hover:shadow-md transition`}>
      <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
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
  );
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
  );
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
  );
}

export default Home; 