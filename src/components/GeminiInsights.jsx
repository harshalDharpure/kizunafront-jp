import React, { useState, useEffect } from 'react';
import { LightBulbIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';

const GeminiInsights = ({ analysisData, recordingId }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (recordingId && analysisData) {
      fetchInsights();
    }
  }, [recordingId, analysisData]);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gemini/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          recordingId,
          analysisData
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch insights');
      }

      setInsights(data.insights);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatInsightText = (text) => {
    if (!text) return null;
    // Remove any markdown characters
    text = text.replace(/\*\*/g, '').replace(/\*/g, '');
    
    // Split into paragraphs and trim whitespace
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph.trim()}
      </p>
    ));
  };

  const InsightSection = ({ title, icon: Icon, content }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-700 leading-relaxed">
        {formatInsightText(content)}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Communication Insights</h2>
        <p className="text-gray-600">Get simple, easy-to-understand analysis of your communication style</p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing your communication style...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchInsights}
            className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {insights && (
        <div className="space-y-6">
          <InsightSection
            title="Tone and Emotion"
            icon={ChatBubbleLeftRightIcon}
            content={insights.split('1. Tone and Emotion')[1]?.split('2.')[0] || 'No data available'}
          />
          <InsightSection
            title="Vocabulary and Style"
            icon={DocumentTextIcon}
            content={insights.split('2. Vocabulary and Style')[1]?.split('3.')[0] || 'No data available'}
          />
          <InsightSection
            title="Sentence Structure"
            icon={LightBulbIcon}
            content={insights.split('3. Sentence Structure')[1]?.split('4.')[0] || 'No data available'}
          />
          <InsightSection
            title="Overall Style"
            icon={SparklesIcon}
            content={insights.split('4. Overall Style')[1] || 'No data available'}
          />
        </div>
      )}
    </div>
  );
};

export default GeminiInsights; 