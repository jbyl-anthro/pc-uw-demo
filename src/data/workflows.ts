import { Workflow } from './types';

export const workflows: Record<string, Workflow> = {
  'homeowners-nb': {
    id: 'homeowners-nb',
    name: 'Homeowners New Business',
    description: 'New HO-3 policy from agency submission',
    lineOfBusiness: 'homeowners',
    steps: [
      {
        id: 'intake',
        name: 'Document Intake',
        agent: 'Intake Agent',
        duration: 47,
        actions: [
          'Extract structured data from ACORD 80 (23 fields)',
          'Parse prior carrier dec page',
          'Analyze property photos (roof, pool check)',
          'Pull CoreLogic replacement cost: $485,000',
          'Pull LexisNexis claims: 1 claim, 2019, $12,400',
          'Calculate risk score: 72/100',
        ],
        output: 'Route to Standard Rating',
      },
      {
        id: 'rating',
        name: 'Premium Rating',
        agent: 'Rating Agent',
        duration: 31,
        actions: [
          'Apply base rate: $1,247 (territory 023)',
          'Apply new home credit: -8%',
          'Apply claims surcharge: +12%',
          'Apply multi-policy discount: -15%',
          'Apply protective devices credit: -5%',
          'Select forms: HO-3, HO-04 61',
          'Verify CA DOI filing compliance',
        ],
        output: 'Premium: $1,184/year',
      },
      {
        id: 'quote',
        name: 'Quote Generation',
        agent: 'Issuance Agent',
        duration: 5,
        actions: [
          'Generate quote package (PDF)',
          'Attach state-mandated disclosures',
          'Create agency portal link',
          'Queue for eDelivery',
        ],
        output: 'Quote #HO-2026-001847 sent',
      },
    ],
  },
  'auto-endorsement': {
    id: 'auto-endorsement',
    name: 'Auto Add Driver',
    description: 'Add teenage driver to existing policy',
    lineOfBusiness: 'auto',
    steps: [
      {
        id: 'intake',
        name: 'Request Parsing',
        agent: 'Intake Agent',
        duration: 12,
        actions: [
          'Parse email: Add Driver endorsement',
          'Extract driver details: Tyler Johnson, DOB 03/15/2009',
          'Pull MVR from LexisNexis: Clean, licensed 8 months',
          'Verify license with CA DMV',
          'Flag: Youthful driver (age 16)',
        ],
        output: 'Route to Standard Path (UW Review Required)',
      },
      {
        id: 'rating',
        name: 'Premium Modification',
        agent: 'Rating Agent',
        duration: 18,
        actions: [
          'Current premium: $2,847/year',
          'Add youthful driver surcharge: +$1,240',
          'Apply good student discount: -$186',
          'Apply driver training credit: -$124',
          'Assign to 2019 Honda Civic',
          'New premium: $3,777/year (+$930)',
          'Pro-rata: +$465 (6 months remaining)',
        ],
        output: 'Queue for UW Review',
      },
      {
        id: 'review',
        name: 'UW Review',
        agent: 'Human Underwriter',
        duration: 12,
        isHuman: true,
        actions: [
          'Agent recommendation: APPROVE (94% confidence)',
          'Review: Clean MVR, good student, driver training',
          'Parents: 15-year customers, 0 at-fault claims',
        ],
        output: 'Approved',
      },
      {
        id: 'issue',
        name: 'Endorsement Issuance',
        agent: 'Issuance Agent',
        duration: 8,
        actions: [
          'Generate endorsement documents',
          'Update policy in Guidewire',
          'Send eDelivery to agent',
        ],
        output: 'Endorsement effective immediately',
      },
    ],
  },
  'umbrella-renewal': {
    id: 'umbrella-renewal',
    name: 'Umbrella Renewal',
    description: 'Personal umbrella with limit increase recommendation',
    lineOfBusiness: 'umbrella',
    steps: [
      {
        id: 'prep',
        name: 'Renewal Preparation',
        agent: 'Intake Agent',
        duration: 25,
        actions: [
          'Pull underlying policies (home, auto)',
          'Verify underlying limits meet requirements',
          'Detect exposure changes: Pool installed',
          'Detect exposure changes: Tesla Model Y added',
          'Refresh claims data: No new claims',
        ],
        output: 'Flag: Pool requires limit review',
      },
      {
        id: 'analysis',
        name: 'Coverage Analysis',
        agent: 'Rating Agent',
        duration: 15,
        actions: [
          'Current: $1M umbrella, $2,450/year',
          'Analyze net worth profile',
          'Calculate pool liability exposure: +$180/year',
          'Generate options:',
          '  Option A: Renew at $1M - $2,450',
          '  Option B: Increase to $2M - $2,890 (RECOMMENDED)',
          '  Option C: Increase to $3M - $3,340',
        ],
        output: 'Recommend: $2M umbrella',
      },
      {
        id: 'outreach',
        name: 'Agent Notification',
        agent: 'Issuance Agent',
        duration: 5,
        actions: [
          'Generate renewal options document',
          'Draft agent email with recommendation',
          'Queue 45-day notice',
        ],
        output: 'Sent to agent for client discussion',
      },
    ],
  },
};

export const getWorkflowById = (id: string): Workflow | undefined => {
  return workflows[id];
};
