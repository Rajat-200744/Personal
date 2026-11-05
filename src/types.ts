export type DomainType = 'career' | 'relationship' | 'finance' | 'wellness';

export interface ScenarioInput {
  id?: string;
  title: string;
  domain: DomainType;
  description: string;
  stakeholders?: string;
  emotionalState?: string;
  constraints?: string;
  desiredOutcome?: string;
  urgency?: 'immediate' | 'moderate' | 'long-term';
  createdAt?: string;
}

export interface CognitiveBias {
  biasName: string;
  explanation: string;
  debiasingTechnique: string;
}

export interface GroundedFramework {
  frameworkTitle: string;
  pioneerOrAuthor: string;
  publicationOrInstitution: string;
  coreMechanism: string;
  applicationToScenario: string;
}

export interface PlaybookStep {
  step: string;
  rationale: string;
  provenPrinciple: string;
  completed?: boolean;
}

export interface TacticalPlaybook {
  immediate24Hours: PlaybookStep[];
  tactical7Days: PlaybookStep[];
  strategic30Days: PlaybookStep[];
}

export interface DialogueScript {
  context: string;
  whatToSay: string;
  whyItWorks: string;
  whatToAvoid: string;
}

export interface DecisionBranch {
  optionName: string;
  description: string;
  prosBasedOnEvidence: string[];
  consAndDownsideRisk: string[];
  hedgingStrategy: string;
}

export interface LiteratureCitation {
  studyOrBook: string;
  authors: string;
  keyFinding: string;
  relevanceScore: string;
}

export interface AnalysisResult {
  summary: string;
  empathyAttunement: string;
  cognitiveBiases: CognitiveBias[];
  groundedFrameworks: GroundedFramework[];
  tacticalPlaybook: TacticalPlaybook;
  dialogueScripts: DialogueScript[];
  decisionBranches: DecisionBranch[];
  literatureCitations: LiteratureCitation[];
  fallbackUsed?: boolean;
}

export interface SavedCase {
  id: string;
  timestamp: number;
  input: ScenarioInput;
  analysis: AnalysisResult;
  userNotes?: string;
  completedStepIds?: string[];
}

export interface FrameworkProfile {
  id: string;
  title: string;
  domain: DomainType;
  author: string;
  institution: string;
  year: number;
  summary: string;
  keyTakeaway: string;
  recommendedFor: string[];
  recommendedReading: string;
}
