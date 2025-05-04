import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowUpTrayIcon, ChartBarIcon, MicrophoneIcon, StopIcon, ClockIcon } from '@heroicons/react/24/outline';
import GeminiInsights from '../components/GeminiInsights';

const Dashboard = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [scores, setScores] = useState(null);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [currentRecordingId, setCurrentRecordingId] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analyze/recordings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setRecordings(data);
      }
    } catch (err) {
      console.error('Error fetching recordings:', err);
    }
  };

  const handleViewAnalysis = (recording) => {
    setScores({
      ...recording.analysis,
      transcribed_text: recording.transcribedText
    });
    setCurrentRecordingId(recording._id);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        setFile(audioFile);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError('');

      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      setError('Error accessing microphone. Please ensure microphone permissions are granted.');
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'audio/wav') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid WAV audio file');
      setFile(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setError('');
    setScores(null);

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analyze/audio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Analysis failed');
      }

      setScores(data);
      setCurrentRecordingId(data.recordingId);
      fetchRecordings(); // Refresh recordings list
    } catch (err) {
      setScores(null);
      setError(err.message || 'Failed to upload and analyze the recording');
    } finally {
      setIsUploading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
            <p className="mt-2 text-gray-600">Record or upload your audio for analysis</p>
          </div>

          {/* Recording History */}
          {recordings.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Recordings</h2>
              <div className="space-y-4">
                {recordings.map((recording) => (
                  <div key={recording._id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-600">{formatDate(recording.createdAt)}</span>
                      </div>
                      <button
                        onClick={() => handleViewAnalysis(recording)}
                        className="text-orange-600 hover:text-orange-700 font-medium"
                      >
                        View Analysis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {/* Recording Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isRecording ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    {isRecording ? (
                      <StopIcon 
                        className="h-8 w-8 text-red-600 cursor-pointer" 
                        onClick={stopRecording}
                      />
                    ) : (
                      <MicrophoneIcon 
                        className="h-8 w-8 text-orange-600 cursor-pointer" 
                        onClick={startRecording}
                      />
                    )}
                  </div>
                  {isRecording && (
                    <div className="absolute -top-2 -right-2">
                      <div className="animate-pulse w-4 h-4 bg-red-600 rounded-full"></div>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm font-medium text-gray-900">
                  {isRecording ? `Recording... ${formatTime(recordingTime)}` : 'Click to Record'}
                </p>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <ArrowUpTrayIcon className="h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
                    <span>Select Audio File</span>
                    <input
                      type="file"
                      accept=".wav"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {file ? file.name : 'No file selected'}
                </p>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <div className="flex justify-center">
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className={`px-4 py-2 rounded-md text-white ${
                  isUploading || !file
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {isUploading ? 'Analyzing...' : 'Analyze Recording'}
              </button>
            </div>

            {/* Results Section */}
            {scores && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Results</h2>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Transcribed Text</h3>
                  <pre className="bg-gray-100 rounded-lg p-4 whitespace-pre-wrap text-gray-900">{scores.transcribedText}</pre>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ChartBarIcon className="h-6 w-6 text-orange-600 mr-2 inline" />
                    <span className="font-semibold">Polarity Score:</span>
                    <span className="ml-2 text-orange-600 font-bold">{scores.polarityScore?.toFixed(2)}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ChartBarIcon className="h-6 w-6 text-orange-600 mr-2 inline" />
                    <span className="font-semibold">Subjectivity Score:</span>
                    <span className="ml-2 text-orange-600 font-bold">{scores.subjectivityScore?.toFixed(2)}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ChartBarIcon className="h-6 w-6 text-orange-600 mr-2 inline" />
                    <span className="font-semibold">Total Words:</span>
                    <span className="ml-2 text-orange-600 font-bold">{scores.totalWords}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ChartBarIcon className="h-6 w-6 text-orange-600 mr-2 inline" />
                    <span className="font-semibold">Unique Words:</span>
                    <span className="ml-2 text-orange-600 font-bold">{scores.uniqueWords}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ChartBarIcon className="h-6 w-6 text-orange-600 mr-2 inline" />
                    <span className="font-semibold">Diversity Score:</span>
                    <span className="ml-2 text-orange-600 font-bold">{scores.diversityScore?.toFixed(2)}</span>
                    <div className="mt-2 text-gray-700">{scores.diversityFeedback}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ChartBarIcon className="h-6 w-6 text-orange-600 mr-2 inline" />
                    <span className="font-semibold">Avg. Sentence Length:</span>
                    <span className="ml-2 text-orange-600 font-bold">{scores.avgSentenceLength?.toFixed(2)} words</span>
                    <div className="mt-2 text-gray-700">Conjunctions: {scores.conjunctionCount}</div>
                    <div className="mt-2 text-gray-700">{scores.complexityFeedback}</div>
                  </div>
                </div>

                {/* Gemini Insights Section */}
                <div className="mt-12">
                  <GeminiInsights 
                    analysisData={scores} 
                    recordingId={currentRecordingId}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
