export interface UserInput {
  idea: string;
  country: string;
  language: string;
  niche: string;
}

export interface VideoDescription {
  hook: string;
  value: string;
  keywords_integration: string;
}

export interface SeoResult {
  titles: string[];
  description: VideoDescription;
  keywords: string[];
  explanation: string;
}

export interface LoadingStep {
  id: number;
  text: string;
  status: 'pending' | 'active' | 'completed';
}