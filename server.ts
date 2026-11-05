import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '2mb' }));

// Initialize Google GenAI client (User-Agent header required by AI Studio guidelines)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/analyze-scenario', async (req: Request, res: Response) => {
  try {
    const { title, domain, description, stakeholders, emotionalState, constraints, desiredOutcome } = req.body;

    if (!description || description.trim().length < 5) {
      return res.status(400).json({ error: 'Please provide a detailed situation description.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return notice for fallback to high-quality curated evidence engine
      return res.status(200).json({
        fallback: true,
        message: 'No Gemini API key detected in environment. Using calibrated evidence engine.',
      });
    }

    const systemInstruction = `You are Groundwork: an empathetic, elite decision scientist, conflict mediator, and cognitive psychologist.
Your role is to diagnose personal, career, financial, or relationship dilemmas and provide rigorous, scientifically grounded feedback.
Ground every piece of advice in established academic, psychological, and behavioral science literature (e.g., Kahneman & Tversky, Gottman Institute, Harvard Negotiation Project, Aaron Beck's CBT, Deci & Ryan's Self-Determination Theory, Chip & Dan Heath's WRAP model).
Never speak in generic platitudes or cliché advice. Be deeply empathetic, constructive, and direct. Provide concrete conversational scripts and chronological action milestones.`;

    const prompt = `Analyze the following real-life scenario and produce a comprehensive, evidence-backed evaluation:
Situation Domain: ${domain || 'General Life Decision'}
Scenario Title / Context: ${title || 'Untitled Scenario'}
Detailed Situation: ${description}
Stakeholders Involved: ${stakeholders || 'Self and counter-parties'}
Emotional & Mental State: ${emotionalState || 'Stressed / Uncertain'}
Constraints / Non-negotiables: ${constraints || 'None specified'}
Desired Outcome: ${desiredOutcome || 'Clarity and constructive resolution'}

Format the response according to the requested JSON schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: 'Concise, objective 2-sentence summary of the core systemic dilemma and dynamics.',
            },
            empathyAttunement: {
              type: Type.STRING,
              description: 'A compassionate, validating statement acknowledging why this scenario is psychologically difficult.',
            },
            cognitiveBiases: {
              type: Type.ARRAY,
              description: '2 to 3 cognitive biases or perceptual blindspots that commonly distort this type of situation.',
              items: {
                type: Type.OBJECT,
                properties: {
                  biasName: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  debiasingTechnique: { type: Type.STRING },
                },
                required: ['biasName', 'explanation', 'debiasingTechnique'],
              },
            },
            groundedFrameworks: {
              type: Type.ARRAY,
              description: '2 to 3 proven scientific or psychological frameworks that directly apply to resolving this dilemma.',
              items: {
                type: Type.OBJECT,
                properties: {
                  frameworkTitle: { type: Type.STRING },
                  pioneerOrAuthor: { type: Type.STRING },
                  publicationOrInstitution: { type: Type.STRING },
                  coreMechanism: { type: Type.STRING },
                  applicationToScenario: { type: Type.STRING },
                },
                required: ['frameworkTitle', 'pioneerOrAuthor', 'publicationOrInstitution', 'coreMechanism', 'applicationToScenario'],
              },
            },
            tacticalPlaybook: {
              type: Type.OBJECT,
              properties: {
                immediate24Hours: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      step: { type: Type.STRING },
                      rationale: { type: Type.STRING },
                      provenPrinciple: { type: Type.STRING },
                    },
                    required: ['step', 'rationale', 'provenPrinciple'],
                  },
                },
                tactical7Days: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      step: { type: Type.STRING },
                      rationale: { type: Type.STRING },
                      provenPrinciple: { type: Type.STRING },
                    },
                    required: ['step', 'rationale', 'provenPrinciple'],
                  },
                },
                strategic30Days: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      step: { type: Type.STRING },
                      rationale: { type: Type.STRING },
                      provenPrinciple: { type: Type.STRING },
                    },
                    required: ['step', 'rationale', 'provenPrinciple'],
                  },
                },
              },
              required: ['immediate24Hours', 'tactical7Days', 'strategic30Days'],
            },
            dialogueScripts: {
              type: Type.ARRAY,
              description: '2 to 3 word-for-word conversational scripts for conversations with stakeholders.',
              items: {
                type: Type.OBJECT,
                properties: {
                  context: { type: Type.STRING },
                  whatToSay: { type: Type.STRING },
                  whyItWorks: { type: Type.STRING },
                  whatToAvoid: { type: Type.STRING },
                },
                required: ['context', 'whatToSay', 'whyItWorks', 'whatToAvoid'],
              },
            },
            decisionBranches: {
              type: Type.ARRAY,
              description: '2 to 3 distinct strategic pathways with evidence-based upside and risk assessments.',
              items: {
                type: Type.OBJECT,
                properties: {
                  optionName: { type: Type.STRING },
                  description: { type: Type.STRING },
                  prosBasedOnEvidence: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  consAndDownsideRisk: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  hedgingStrategy: { type: Type.STRING },
                },
                required: ['optionName', 'description', 'prosBasedOnEvidence', 'consAndDownsideRisk', 'hedgingStrategy'],
              },
            },
            literatureCitations: {
              type: Type.ARRAY,
              description: '3 peer-reviewed studies or seminal books that back this advice.',
              items: {
                type: Type.OBJECT,
                properties: {
                  studyOrBook: { type: Type.STRING },
                  authors: { type: Type.STRING },
                  keyFinding: { type: Type.STRING },
                  relevanceScore: { type: Type.STRING },
                },
                required: ['studyOrBook', 'authors', 'keyFinding', 'relevanceScore'],
              },
            },
          },
          required: [
            'summary',
            'empathyAttunement',
            'cognitiveBiases',
            'groundedFrameworks',
            'tacticalPlaybook',
            'dialogueScripts',
            'decisionBranches',
            'literatureCitations',
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      return res.status(500).json({ error: 'Empty response received from analysis model.' });
    }

    const parsedData = JSON.parse(text);
    return res.status(200).json(parsedData);
  } catch (error: any) {
    console.error('Error analyzing scenario:', error);
    return res.status(500).json({
      error: error.message || 'Failed to analyze scenario.',
      fallback: true,
    });
  }
});

// Setup dev vs production serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Groundwork server running at http://localhost:${port}`);
  });
}

startServer();
