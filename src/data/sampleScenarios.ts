import { ScenarioInput } from '../types';

export const SAMPLE_SCENARIOS: { label: string; tag: string; data: ScenarioInput }[] = [
  {
    label: 'Underpaid & Overleveraged at Work',
    tag: 'Career & Negotiation',
    data: {
      title: 'Senior Project Manager Passed Over for Promised Promotion & Raise',
      domain: 'career',
      description: 'I have been leading the flagship migration project for 14 months, consistently working 55+ hour weeks. During my annual review 3 months ago, my VP verbally promised a title bump to Director and a 20% salary adjustment. Yesterday, HR sent the updated comp letters: a 3% cost-of-living increase and no title change, citing "company-wide headwinds". Meanwhile, two external executives were just hired with high packages. I feel betrayed and demoralized, but I have a mortgage and young child.',
      stakeholders: 'VP of Product, HR Director, my immediate team of 6 engineers, my spouse',
      emotionalState: 'Deep resentment, betrayed, anxious about family financial obligations',
      constraints: 'Cannot afford more than 2 months of unemployment; current company stock vests in 5 months',
      desiredOutcome: 'Secure the title adjustment or market comp, or construct a graceful 90-day external exit without burning bridges',
      urgency: 'moderate',
    },
  },
  {
    label: 'Setting Boundaries with an Overbearing In-Law',
    tag: 'Relationships & Family',
    data: {
      title: 'In-Laws Dropping In Unannounced and Overriding Parenting Rules',
      domain: 'relationship',
      description: 'My mother-in-law lives 15 minutes away and drops by unannounced 3-4 times a week with her own key. She criticizes our toddler\'s bedtime routine, feeds him sweets after we explicitly asked her not to, and makes passive-aggressive comments about our housekeeping. When I bring this up to my spouse, they become defensive and say "she is just trying to help, don\'t make a scene". The ambient tension in our home is unbearable and eroding our marriage.',
      stakeholders: 'Mother-in-law, spouse, 3-year-old child',
      emotionalState: 'Simmering anger, isolated, feeling invalidated by partner',
      constraints: 'We want our child to have a loving relationship with their grandparents, but our autonomy is being steamrolled',
      desiredOutcome: 'Establish strict, respected boundary rules as a united couple without causing an explosive family estrangement',
      urgency: 'immediate',
    },
  },
  {
    label: 'High-Interest Debt vs. Emergency Savings Paradox',
    tag: 'Financial & Resource Dilemmas',
    data: {
      title: 'Depleting Emergency Fund to Wipe Out 24% Credit Card Debt',
      domain: 'finance',
      description: 'I accumulated $16,500 in credit card debt across two cards at 24.9% APR following an emergency medical procedure and home repair last winter. I have $18,000 saved in a high-yield savings account (my entire 6-month safety net). The minimum monthly payments ($480) are eating my monthly cash flow, mostly going to pure interest. I am paralyzed: wiping out the debt leaves me with zero safety net if I lose my job, but keeping the cash costs me over $340/month in dead interest.',
      stakeholders: 'Self, dependent family members',
      emotionalState: 'Severe financial anxiety, paralysis, hyper-vigilance',
      constraints: 'Variable contract income; car is 11 years old and could require repairs at any time',
      desiredOutcome: 'Optimal mathematical and behavioral risk plan to eliminate the interest drain while hedging against emergencies',
      urgency: 'immediate',
    },
  },
  {
    label: 'Chronic Burnout vs. Leaving a Stable Prestige Job',
    tag: 'Personal Wellness & Alignment',
    data: {
      title: 'Exhausted Tech Consultant Considering a 6-Month Sabbatical',
      domain: 'wellness',
      description: 'I have been at a top-tier management consultancy for 7 years. On paper, my life looks ideal: strong salary, status, great resume. In reality, I wake up with dread, have recurring insomnia, suffer from chronic digestive issues, and feel completely detached from my friends. I have enough personal savings to survive 14 months without income. However, my parents and peers think I am crazy to walk away from a partner track position, and I fear becoming permanently unemployable.',
      stakeholders: 'Consultancy practice partners, parents, long-term partner',
      emotionalState: 'Exhaustion, loss of identity, fear of regret, chronic nervous system fatigue',
      constraints: 'Current healthcare benefits are tied to employment; golden handcuffs with unvested 401k match',
      desiredOutcome: 'Clarity on whether this requires an internal boundary reset, a medical leave of absence, or a clean career departure',
      urgency: 'moderate',
    },
  },
];
