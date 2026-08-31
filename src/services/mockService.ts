import type { BISStandard, Conversation, MockAnswer } from '@/types';
import {
  mockStandards,
  mockConversations,
  mockAnswers,
  fallbackAnswer,
} from '@/data/mockData';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getStandards(): Promise<BISStandard[]> {
  await delay(120);
  return [...mockStandards];
}

export async function getStandardById(id: string): Promise<BISStandard | undefined> {
  await delay(80);
  return mockStandards.find((s) => s.id === id);
}

export async function getConversations(): Promise<Conversation[]> {
  await delay(100);
  return mockConversations.map((c) => ({ ...c, messages: [...c.messages] }));
}

export async function getConversationById(
  id: string,
): Promise<Conversation | undefined> {
  await delay(80);
  const c = mockConversations.find((c) => c.id === id);
  return c ? { ...c, messages: [...c.messages] } : undefined;
}

function matchAnswer(question: string): MockAnswer {
  const q = question.toLowerCase();
  let best: MockAnswer | null = null;
  let bestScore = 0;
  for (const a of mockAnswers) {
    let score = 0;
    for (const kw of a.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = a;
    }
  }
  return bestScore > 0 && best ? best : fallbackAnswer;
}

export async function sendMockMessage(
  question: string,
): Promise<MockAnswer> {
  await delay(900);
  return matchAnswer(question);
}

export function findStandardByNumber(number: string): BISStandard | undefined {
  return mockStandards.find((s) => s.number === number);
}
