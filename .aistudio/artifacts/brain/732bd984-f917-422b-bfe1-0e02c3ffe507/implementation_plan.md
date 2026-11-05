# Groundwork — Evidence-Based Situation Guidance System

Groundwork is an empathetic, aesthetically serene web application that guides users through complex life scenarios and delivers rigorous, evidence-backed feedback anchored in proven behavioral science, psychology, conflict resolution, and decision theory.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following directions were confirmed in Phase 1 and define the foundation of Groundwork:

- **Domains Covered**: Holistic scope spanning Career Transitions & Negotiations, Interpersonal & Relationship Dynamics, Financial & Resource Dilemmas, and Personal Wellness & Burnout.
- **Evidence & Source Standard**: Explicitly cited academic and clinical frameworks (e.g., Kahneman & Tversky's Prospect Theory, Gottman Method, Fisher & Ury's Principled Negotiation, Cognitive Reframing / CBT protocols, Self-Determination Theory).
- **Aesthetic Direction**: "Calming Sanctuary" with warm stone canvas, soft sage accents, refined typographic hierarchy, and anti-slop zero-pill design.

---

### 1. Overview & Core Concept

- **What It Does**: Users facing a difficult crossroads, conflict, or high-stakes choice can enter their situation via an empathetic guided intake. Groundwork breaks down the scenario, diagnoses psychological biases and systemic dynamics, and provides a structured action playbook with verified research citations, step-by-step conversational scripts, and interactive decision trees.
- **Target Audience / Persona**: Professionals navigating tense workplace dynamics, individuals working through personal or family decisions, and anyone experiencing analysis paralysis under stress who needs objective, scientifically grounded perspective.
- **Key Value**: Replaces emotional reactivity and unvetted internet opinions with calm, research-validated decision architectures and actionable protocols.

---

### 2. User Experience & Visual Design

#### Key User Flows

```
┌─────────────────┐       ┌──────────────────────┐       ┌────────────────────────┐
│  Explore Curated│  ───> │ Empathetic Guided    │  ───> │ Evidence Synthesis     │
│  Situation Bank │       │ Intake Wizard        │       │ & Bias Diagnostic      │
└─────────────────┘       └──────────────────────┘       └────────────────────────┘
                                                                     │
                                                                     ▼
┌─────────────────┐       ┌──────────────────────┐       ┌────────────────────────┐
│ Personal Action │  <─── │ Interactive Decision │  <─── │ Action Playbook with   │
│ Plan & Journal  │       │ Tree & Roleplay Prep │       │ Academic Citations     │
└─────────────────┘       └──────────────────────┘       └────────────────────────┘
```

1. **Discovery & Exploration**: Users land on an inspiring, quiet interface showing curated real-world scenario frameworks (e.g., "Navigating Counteroffers Under Asymmetric Information", "Setting Boundaries with Difficult Family Members", "Evaluating Career Pivots During Economic Uncertainty").
2. **Supportive Intake Wizard**: Instead of an intimidating empty text box, users are gently guided through:
   - *Core Dilemma*: What is happening in plain words.
   - *Stakeholder Dynamics*: Who is involved and their perceived motivations.
   - *Current Emotional & Cognitive State*: Anxiety, resentment, urgency, or fatigue levels.
   - *Constraints & Stakes*: Financial limits, non-negotiables, and timelines.
3. **Evidence-Grounded Feedback Engine**:
   - *Cognitive Bias Diagnostic*: Identifies potential blindspots (e.g., Sunk Cost Fallacy, Fundamental Attribution Error, Loss Aversion).
   - *Validated Theoretical Frameworks*: Clear breakdown citing seminal studies (author, publication, core finding).
   - *Phase-by-Phase Playbook*: 24-Hour Immediate De-escalation, 7-Day Strategy, and Long-Term Resolution.
   - *Communication Scripts*: Word-for-word tactical phrasing based on nonviolent communication and principled negotiation.
4. **Interactive Decision Branching**: An interactive tree where users explore "If I do X vs If I do Y" with statistical outcomes and downside risk hedges.
5. **Private Vault & Action Tracker**: Save scenarios locally, track milestone execution, and write reflective follow-ups.

#### Visual Identity & Theme

- **Aesthetic Direction**: *Calming Sanctuary* — Tactile, organic calm meets academic precision. Natural stone surfaces, warm linen neutrals, serene sage green focus states, and warm amber caution highlights.
- **Typography**:
  - *Headlines & Display*: `Plus Jakarta Sans` (weights 600, 700) with balanced line-breaks (`text-wrap: balance`).
  - *Body Prose & Essays*: `DM Sans` (weights 400, 500) with generous line height (1.65) and 65ch reading measure.
  - *Citations & Data*: `JetBrains Mono` / tabular numerals for study publication years, statistical metrics, and confidence intervals.
- **Zero-Pill & Anti-Slop Strict Enforcement**:
  - Metadata rendered as quiet unboxed text separated by subtle typographic dots (`·`) instead of colored capsule pills.
  - No decorative pulsing dots, no fake system statuses, and no thick asymmetric left borders.
  - Strict Top Bar Contract: Brand title (`Groundwork`), 4 text navigation links (`Frameworks`, `Scenario Advisor`, `Evidence Library`, `My Cases`), and 1 primary action button (`Analyze Situation`).

---

### 3. Key Product Decisions & Trade-Offs

- **Dual-Layer Analysis Engine (Curated Library + Server-Side Gemini 3.8 Flash)**:
  - *Chosen Approach*: Provide a rich, instant offline library of pre-validated empirical situation playbooks (guaranteeing zero latency and immediate utility) paired with a server-side Gemini 3.8 Flash endpoint (`/api/analyze-scenario`) for free-form custom scenario analysis with structured JSON schemas.
  - *Why*: Ensures instant reliability and rich grounding even without network latency, while providing infinite versatility for nuanced personal situations.
- **Guided Modular Intake vs Single Open Prompt**:
  - *Chosen Approach*: Multi-step supportive questionnaire with empathetic prompts and quick-select emotional tags, accompanied by a quick "1-Click Freeform Mode".
  - *Why*: Research shows that individuals in stressful dilemmas experience cognitive tunnel vision; structured prompting helps them deconstruct their situation into manageable variables.
- **Zero-Telemetry Local Privacy**:
  - *Chosen Approach*: User situations and saved action plans persist locally in browser `localStorage`. No user credentials or tracking trackers.
  - *Why*: Life situations are intimate and sensitive; users need absolute trust that their vulnerable thoughts remain on their device.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                             Client UI                                  │
│                                                                        │
│  ┌────────────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │ Top Bar (3-Zone)       │  │ Domain Filter  │  │ Mode Switcher    │  │
│  └────────────────────────┘  └────────────────┘  └──────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Active View (Intake Wizard / Advisor View / Case Library)        │  │
│  │  - Scenario Input & Context Cards                                │  │
│  │  - Cognitive Bias Diagnostic Meter                               │  │
│  │  - Proven Framework Synthesis & Academic Citations               │  │
│  │  - Step-by-Step Tactical Action Protocol                         │  │
│  │  - Verbatim Script Playbooks (Principled Communication)          │  │
│  │  - Interactive "What-If" Decision Simulator                      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        State & Storage Layer                           │
│  - Active Scenario State Store                                         │
│  - Curated Evidence Matrix (Psychology, Negotiation, Behavioral Econ)  │
│  - Local Case Vault (localStorage persistence)                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                        POST /api/analyze-scenario
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Express Backend (server.ts)                       │
│  - @google/genai SDK (gemini-3.8-flash)                                │
│  - Structured JSON Response Schema (Type.OBJECT)                       │
│  - Academic citation & behavioral protocol prompt framing              │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Entities

- **`ScenarioInput`**: `id`, `domain` (career, relationship, finance, wellness), `summary`, `stakeholders`, `emotionalState`, `stakes`, `timeline`, `createdAt`.
- **`EvidenceAnalysis`**:
  - `cognitiveBiases`: Identified blindspots with cognitive psychology explanations.
  - `groundedFrameworks`: Seminal research models (title, pioneer, institution/year, core mechanism).
  - `actionProtocols`: Immediate (Day 1), Tactical (Week 1), and Strategic (Month 1) steps.
  - `dialogueScripts`: Concrete verbatim talking points with "What to Say" vs "What to Avoid".
  - `decisionBranches`: Comparative paths with probabilistic upside/downside analysis.
- **`EvidenceLibraryItem`**: Curated, peer-reviewed methodology profiles accessible for reference anytime.
