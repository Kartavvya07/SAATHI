export type StandardCategory = 'Electrical' | 'Household' | 'Consumer Products';

export interface BISStandard {
  id: string;
  number: string;
  title: string;
  category: StandardCategory;
  scope: string;
  overview: string;
  keyInformation: string[];
  source: string;
  sourceUrl: string;
}

export interface SourceRef {
  standardId: string;
  number: string;
  title: string;
  scope: string;
  category: StandardCategory;
  source: string;
  sourceUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceRef[];
  pending?: boolean;
  declined?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  group: 'Today' | 'Yesterday' | 'Older';
  messages: ChatMessage[];
}

export interface MockAnswer {
  keywords: string[];
  content: string;
  sources: SourceRef[];
  declined?: boolean;
}

export interface SuggestionQuestion {
  id: string;
  text: string;
}
