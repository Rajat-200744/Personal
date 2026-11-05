import React, { useState } from 'react';
import { Send, User, Bot, AlertTriangle, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';

interface Persona {
  id: string;
  name: string;
  role: string;
  archetype: string;
  tendency: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'defensive-boss',
    name: 'Marcus (VP / Executive)',
    role: 'Workplace Authority',
    archetype: 'Deflective & Budget-Constrained',
    tendency: 'Deflects with corporate constraints ("headwinds"), downplays promises, uses subtle intimidation.',
  },
  {
    id: 'guilt-parent',
    name: 'Eleanor (Parent / In-Law)',
    role: 'Family Dynamic',
    archetype: 'Guilt-Tripping & Boundary-Testing',
    tendency: 'Brings up past sacrifices, acts victimized when boundaries are drawn ("after everything I\'ve done").',
  },
  {
    id: 'reactive-partner',
    name: 'Jordan (Partner / Spouse)',
    role: 'Interpersonal Partner',
    archetype: 'Overwhelmed & Emotionally Defensive',
    tendency: 'Interprets feedback as criticism, stonewalls or counters with "what about when you...".',
  },
  {
    id: 'hardball-vendor',
    name: 'Alex (Counterparty / Client)',
    role: 'Commercial Negotiator',
    archetype: 'Take-It-Or-Leave-It Anchoring',
    tendency: 'Uses artificial urgency, questions market value, and leverages silence.',
  },
];

interface CoachingData {
  tone: 'Assertive & Principled' | 'Passive / Apologetic' | 'Aggressive / Accusatory' | 'Unfocused';
  boundaryStrength: 'High' | 'Moderate' | 'Weak';
  tacticalCritique: string;
}

interface Message {
  sender: 'user' | 'counterparty';
  text: string;
  coaching?: CoachingData;
}

export const RoleplaySandbox: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona>(PERSONAS[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'counterparty',
      text: 'Thanks for scheduling some time. I have about 15 minutes before my next sync. What did you want to connect about?',
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userText = userInput.trim();
    setUserInput('');

    // Analyze Tone and Boundaries using behavioral science heuristics
    const lower = userText.toLowerCase();
    let tone: CoachingData['tone'] = 'Assertive & Principled';
    let boundaryStrength: CoachingData['boundaryStrength'] = 'High';
    let tacticalCritique = 'Excellent: Clear, objective, and anchored in forward-looking solutions without unnecessary apologies.';

    if (lower.includes('sorry') || lower.includes('i know you are busy') || lower.includes('if that is okay')) {
      tone = 'Passive / Apologetic';
      boundaryStrength = 'Weak';
      tacticalCritique = 'Pre-emptively apologizing weakens your negotiation leverage. State your value proposition with neutral confidence.';
    } else if (lower.includes('unfair') || lower.includes('you never') || lower.includes('you always') || lower.includes('betrayed')) {
      tone = 'Aggressive / Accusatory';
      boundaryStrength = 'Moderate';
      tacticalCritique = 'Using "you always/never" statements triggers immediate defensive stonewalling. Shift to specific objective observations.';
    }

    const newMessages: Message[] = [
      ...messages,
      {
        sender: 'user',
        text: userText,
        coaching: { tone, boundaryStrength, tacticalCritique },
      },
    ];

    setMessages(newMessages);
    setIsTyping(true);

    // Simulate archetype response
    setTimeout(() => {
      let reply = '';
      if (selectedPersona.id === 'defensive-boss') {
        if (tone === 'Passive / Apologetic') {
          reply = "Look, I appreciate your hard work, but everyone is stretched right now with the current budget freeze. Let's revisit this at our Q3 review.";
        } else if (tone === 'Aggressive / Accusatory') {
          reply = "I don't appreciate the implication that management hasn't supported you. We all make sacrifices here. If you're unhappy with the company trajectory, that's something you need to evaluate.";
        } else {
          reply = "I understand where you're coming from and you've delivered solid work on the migration. While compensation bands are rigid this cycle, what specific scope adjustments would make the title align with what you're doing?";
        }
      } else if (selectedPersona.id === 'guilt-parent') {
        if (tone === 'Aggressive / Accusatory') {
          reply = "Fine! If I'm such a horrible burden on your life, I just won't ever come over again. Clearly family means nothing anymore.";
        } else {
          reply = "I was only trying to help you two because you always look so stressed out. But if you want to set visiting rules like I'm a stranger, I suppose I have to accept that.";
        }
      } else {
        reply = "I hear what you're saying. Can you walk me through the specific numbers and what happens if we don't meet that benchmark?";
      }

      setMessages((prev) => [...prev, { sender: 'counterparty', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleReset = (persona: Persona) => {
    setSelectedPersona(persona);
    setMessages([
      {
        sender: 'counterparty',
        text:
          persona.id === 'guilt-parent'
            ? 'Hello dear, I just dropped off some groceries and saw the kitchen was a bit untidy. Is everything okay with you two?'
            : 'Thanks for scheduling some time. I have about 15 minutes before my next sync. What did you want to connect about?',
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
          High-Stakes Conversation Lab
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mt-1 mb-2">
          Interactive Dialogue Rehearsal Sandbox
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-2xl">
          Rehearse your conversation in advance against challenging counterparty archetypes. Receive real-time
          psychological coaching on emotional tone, boundary strength, and defensive triggers.
        </p>
      </div>

      {/* Persona Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => handleReset(p)}
            className={`cursor-pointer p-3 rounded-xl border text-left transition-all ${
              selectedPersona.id === p.id
                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="text-xs font-bold truncate">{p.name}</div>
            <div className={`text-[11px] mt-0.5 ${selectedPersona.id === p.id ? 'text-stone-300' : 'text-stone-500'}`}>
              {p.role}
            </div>
            <div
              className={`text-[10px] mt-2 line-clamp-2 leading-tight ${
                selectedPersona.id === p.id ? 'text-stone-400' : 'text-stone-500'
              }`}
            >
              {p.tendency}
            </div>
          </button>
        ))}
      </div>

      {/* Chat Rehearsal Deck */}
      <div className="bg-white rounded-xl border border-stone-200 flex flex-col h-[520px] shadow-xs overflow-hidden">
        {/* Chat History */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1 px-1">
                {m.sender === 'user' ? (
                  <>
                    <span>You</span>
                    <User className="w-3 h-3 text-stone-600" />
                  </>
                ) : (
                  <>
                    <Bot className="w-3 h-3 text-emerald-800" />
                    <span>{selectedPersona.name}</span>
                  </>
                )}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-stone-900 text-white rounded-tr-xs'
                    : 'bg-stone-100 text-stone-900 border border-stone-200/80 rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>

              {/* Real-time Psychological Coaching Banner */}
              {m.coaching && (
                <div className="mt-2 max-w-[85%] sm:max-w-[75%] p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                  <div className="flex items-center gap-3 mb-1 text-[11px]">
                    <span className="font-semibold text-stone-900">
                      Tone: <span className="font-mono text-emerald-800">{m.coaching.tone}</span>
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-stone-900">
                      Boundaries: <span className="font-mono text-stone-700">{m.coaching.boundaryStrength}</span>
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed text-[11px]">{m.coaching.tacticalCritique}</p>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-stone-400 italic p-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{selectedPersona.name} is formulating response...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your response to the counterparty (e.g., using one of your dialogue scripts)..."
            className="flex-1 px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          />
          <button
            onClick={handleSend}
            disabled={!userInput.trim() || isTyping}
            className="cursor-pointer p-2.5 bg-stone-900 text-white rounded-lg hover:bg-emerald-900 disabled:opacity-40 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleReset(selectedPersona)}
            className="cursor-pointer p-2.5 bg-white border border-stone-300 text-stone-600 hover:text-stone-900 rounded-lg transition-colors"
            title="Reset Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
