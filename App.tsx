import React, { useState } from 'react';
import { UserInput, SeoResult } from './types';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { generateVideoSeo } from './services/geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState<UserInput>({
    idea: '',
    country: '',
    language: '',
    niche: '',
  });

  const [result, setResult] = useState<SeoResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate steps for UX
      const response = await generateVideoSeo(input);
      setResult(response);
    } catch (err: any) {
      setError(err.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100 selection:bg-red-500/30 selection:text-white">
      {/* Header / Nav */}
      <nav className="border-b border-gray-800 bg-[#0f0f0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 rounded-lg p-1.5">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">VideoRank <span className="text-red-600">AI</span></span>
          </div>
          <div className="text-xs font-mono text-gray-500 border border-gray-800 rounded px-2 py-1">
            BETA v1.0
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Hero Text */}
        {!result && !isLoading && (
          <div className="text-center mb-12 animate-fade-in-down">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              تصدر نتائج البحث في <span className="text-red-600">يوتيوب</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              أداة ذكاء اصطناعي تستند إلى بيانات حقيقية لاقتراح عناوين، كلمات مفتاحية، وأوصاف تضمن انتشار الفيديو الخاص بك.
            </p>
          </div>
        )}

        <div className="flex flex-col items-center">
          {/* Input Form */}
          {!result && (
            <InputForm 
              input={input} 
              setInput={setInput} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20 space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                 <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-xl font-medium text-white animate-pulse">جاري تحليل خوارزميات يوتيوب...</p>
              <p className="text-sm text-gray-500">نقوم بمقارنة فكرتك مع أنماط المحتوى الناجح في {input.country || 'بلدك'}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="w-full max-w-2xl bg-red-900/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl text-center mb-8">
              <p>{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-2 text-sm text-red-400 hover:text-white underline"
              >
                حاول مرة أخرى
              </button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="w-full">
              <div className="mb-8 flex justify-center">
                 <button 
                   onClick={() => setResult(null)}
                   className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-[#1a1a1a] px-4 py-2 rounded-full border border-gray-800 hover:border-gray-600"
                 >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                   <span>تحليل فيديو جديد</span>
                 </button>
              </div>
              <ResultsDisplay data={result} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#0f0f0f] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            VideoRank AI © {new Date().getFullYear()}. مبني لخدمة صُنّاع المحتوى.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;