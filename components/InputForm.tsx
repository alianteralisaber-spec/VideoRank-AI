import React from 'react';
import { UserInput } from '../types';
import { COUNTRIES, NICHES, LANGUAGES } from '../constants';

interface InputFormProps {
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ input, setInput, onSubmit, isLoading }) => {
  const handleChange = (field: keyof UserInput, value: string) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-[#1a1a1a] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-xl w-full max-w-3xl mx-auto mb-10">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">بيانات الفيديو (Video Details)</h2>
      </div>

      <div className="space-y-6">
        {/* Video Idea */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">فكرة الفيديو (Video Idea)</label>
          <textarea
            value={input.idea}
            onChange={(e) => handleChange('idea', e.target.value)}
            placeholder="مثال: مراجعة ايفون 15 برو ماكس بعد شهر من الاستخدام..."
            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all h-28 resize-none"
            dir="auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Country */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">البلد المستهدف (Target Country)</label>
            <div className="relative">
              <select
                value={input.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
              >
                <option value="" disabled>اختر البلد...</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>{c.name}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-400">اللغة (Language)</label>
            <div className="relative">
              <select
                value={input.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
              >
                <option value="" disabled>اختر اللغة...</option>
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Niche */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">النِّيش / التخصص (Niche)</label>
          <div className="relative">
            <select
              value={input.niche}
              onChange={(e) => handleChange('niche', e.target.value)}
              className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none cursor-pointer"
            >
              <option value="" disabled>اختر التخصص...</option>
              {NICHES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 sticky bottom-4 md:static z-20">
          <button
            onClick={onSubmit}
            disabled={isLoading || !input.idea || !input.country || !input.niche || !input.language}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-95 ${
              isLoading || !input.idea || !input.country || !input.niche || !input.language
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30 hover:shadow-red-600/50"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>جاري التحليل... (Analyzing)</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span>ابدأ التحليل (Generate Rank)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};