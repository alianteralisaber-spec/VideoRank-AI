import React from 'react';
import { SeoResult } from '../types';
import { CopyButton } from './CopyButton';

interface ResultsDisplayProps {
  data: SeoResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-20">
      
      {/* Explanation Section */}
      <div className="bg-gradient-to-r from-red-900/20 to-transparent border-r-4 border-red-600 p-4 rounded-lg">
        <h3 className="text-red-400 text-sm font-bold uppercase tracking-wider mb-1">تحليل الاستراتيجية (Strategy)</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{data.explanation}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Titles Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500">#</span> العناوين المقترحة (Titles)
            </h3>
            <CopyButton text={data.titles.join('\n')} label="نسخ الكل" />
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
            {data.titles.map((title, idx) => (
              <div 
                key={idx} 
                className="group p-4 border-b border-gray-800 last:border-0 hover:bg-[#252525] transition-colors flex justify-between items-start gap-3"
              >
                <div className="flex gap-3">
                  <span className="text-gray-600 font-mono text-sm pt-1">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <p className="text-gray-200 font-medium leading-relaxed" dir="auto">{title}</p>
                </div>
                <CopyButton text={title} label="" className="opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Keywords Column */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500">#</span> الكلمات المفتاحية (Keywords)
            </h3>
            <CopyButton text={data.keywords.join(', ')} label="نسخ الكل" />
          </div>
          <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 shadow-lg">
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((keyword, idx) => (
                <span 
                  key={idx} 
                  className="bg-[#0f0f0f] text-gray-300 border border-gray-700 px-3 py-1.5 rounded-full text-sm hover:border-red-500/50 hover:text-white transition-colors cursor-default"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
               <div className="bg-[#0f0f0f] rounded-lg p-3 text-xs text-gray-500 font-mono break-all">
                 {data.keywords.join(', ')}
               </div>
               <div className="mt-2 flex justify-end">
                 <CopyButton text={data.keywords.join(', ')} label="نسخ للنشر" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-red-500">#</span> وصف الفيديو (Description)
          </h3>
          <CopyButton 
            text={`${data.description.hook}\n\n${data.description.value}\n\n${data.description.keywords_integration}`} 
            label="نسخ الوصف" 
          />
        </div>
        
        <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-6 md:p-8 shadow-lg space-y-6 relative">
          
          {/* Hook */}
          <div className="relative pl-4 border-r-2 border-blue-500/50">
            <div className="absolute -right-2 top-0 bg-[#1a1a1a] text-blue-500 text-xs px-2 uppercase font-bold tracking-widest">المقدمة (Hook)</div>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap pt-3" dir="auto">{data.description.hook}</p>
          </div>

          {/* Value */}
          <div className="relative pl-4 border-r-2 border-green-500/50">
            <div className="absolute -right-2 top-0 bg-[#1a1a1a] text-green-500 text-xs px-2 uppercase font-bold tracking-widest">القيمة (Value)</div>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap pt-3" dir="auto">{data.description.value}</p>
          </div>

          {/* Keywords Integration */}
          <div className="relative pl-4 border-r-2 border-purple-500/50">
            <div className="absolute -right-2 top-0 bg-[#1a1a1a] text-purple-500 text-xs px-2 uppercase font-bold tracking-widest">الخلاصة (SEO)</div>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap pt-3 text-sm" dir="auto">{data.description.keywords_integration}</p>
          </div>

        </div>
      </div>

    </div>
  );
};