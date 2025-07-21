import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LightBulbIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';

const GeminiInsights = ({ analysisData, recordingId }) => {
  const { authFetch } = useAuth();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (recordingId && analysisData) {
      fetchInsights();
    }
  }, [recordingId, analysisData, authFetch]);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await authFetch(`${import.meta.env.VITE_BACKEND_URL}/api/gemini/analyze`, {
        method: 'POST',
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
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
          <Icon className="h-5 w-5 text-orange-600" />
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AIによるコミュニケーションのインサイト</h2>
        <p className="text-gray-600">あなたのコミュニケーションスタイルをシンプルで分かりやすく分析します</p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">コミュニケーションスタイルを分析中...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchInsights}
            className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
          >
            再試行
          </button>
        </div>
      )}

      {insights && (
        <div className="space-y-6">
          <InsightSection
            title="トーンと感情"
            icon={ChatBubbleLeftRightIcon}
            content={insights.split('1. Tone and Emotion')[1]?.split('2.')[0] || '利用可能なデータがありません'}
          />
          <InsightSection
            title="語彙とスタイル"
            icon={DocumentTextIcon}
            content={insights.split('2. Vocabulary and Style')[1]?.split('3.')[0] || '利用可能なデータがありません'}
          />
          <InsightSection
            title="文の構造"
            icon={LightBulbIcon}
            content={insights.split('3. Sentence Structure')[1]?.split('4.')[0] || '利用可能なデータがありません'}
          />
          <InsightSection
            title="全体的なスタイル"
            icon={SparklesIcon}
            content={insights.split('4. Overall Style')[1] || '利用可能なデータがありません'}
          />
        </div>
      )}
    </div>
  );
};

export default GeminiInsights; 