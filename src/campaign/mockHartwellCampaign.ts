import type { CampaignEvent, ClientContextEvent } from './types';

export const HARTWELL_CAMPAIGN_ID = 'hartwell-q1-review';
export const HARTWELL_CLIENT_ID = 'client-hartwell';

export const hartwellClientContextEvents: ClientContextEvent[] = [
  {
    type: 'CONTEXT_INITIALIZED',
    clientId: HARTWELL_CLIENT_ID,
    context: {
      clientName: 'Hartwell Pension Fund',
      concerns: [
        {
          id: 'c1',
          text: 'UK gilt over-exposure — still unaddressed',
          raisedBy: 'James Okafor',
          raisedAt: 'Mar 2026',
          status: 'open',
        },
        {
          id: 'c2',
          text: 'Fee adequacy vs peer group',
          raisedBy: 'Margaret Foley',
          raisedAt: '13 May 2026',
          status: 'open',
        },
        {
          id: 'c3',
          text: 'Commodities allocation — tactical vs structural',
          raisedBy: 'James Okafor',
          raisedAt: '13 May 2026',
          status: 'open',
        },
      ],
      holdings: [
        { label: 'Gilts', percent: 42 },
        { label: 'Equities', percent: 28 },
        { label: 'Credit', percent: 18 },
        { label: 'Alternatives', percent: 12 },
      ],
      competitors: [
        { name: 'Rival X Real Income', note: 'Considering — fee 12bps lower' },
      ],
      relationshipNotes: [
        {
          id: 'r1',
          name: 'Margaret Foley',
          role: 'CIO — decision maker',
          note: 'Prefers data-led narratives; sceptical of macro calls',
        },
        {
          id: 'r2',
          name: 'James Okafor',
          role: 'Portfolio manager',
          note: 'Detail-oriented; asks structural vs tactical questions',
        },
        {
          id: 'r3',
          name: 'Priya Shah',
          role: 'Operations',
          note: 'Coordinates meeting logistics',
        },
      ],
    },
  },
];

export const hartwellCampaignEvents: CampaignEvent[] = [
  {
    type: 'CAMPAIGN_ACTIVATED',
    campaignId: HARTWELL_CAMPAIGN_ID,
    clientId: HARTWELL_CLIENT_ID,
    plan: [
      {
        id: 'act-discovery',
        type: 'Call',
        title: 'Discovery call',
        dayOffset: 0,
        scheduledDate: '06 May',
      },
      {
        id: 'act-followup-email',
        type: 'Email',
        title: 'Follow-up email',
        template: 'Post-discovery follow-up',
        dayOffset: 4,
        scheduledDate: '10 May',
      },
      {
        id: 'act-q1-review',
        type: 'Meeting',
        title: 'Q1 review meeting',
        dayOffset: 7,
        scheduledDate: '13 May',
        talkingPoints: [
          'Q1 performance vs benchmark',
          'Gilt duration positioning',
          'Fee structure vs peer group',
          'Commodities sleeve rationale',
          'UK CPI impact on real yields',
        ],
      },
      {
        id: 'act-sleeve-email',
        type: 'Email',
        title: 'Sleeve analysis email',
        template: 'Sleeve analysis',
        dayOffset: 14,
        scheduledDate: '20 May',
      },
      {
        id: 'act-checkin',
        type: 'Call',
        title: 'Check-in call',
        dayOffset: 21,
        scheduledDate: '27 May',
      },
      {
        id: 'act-proposal',
        type: 'Follow-up',
        title: 'Proposal',
        dayOffset: 35,
        scheduledDate: '10 Jun',
      },
    ],
    meta: { ts: Date.now() - 86400000 * 14 },
  },
  {
    type: 'ACTION_COMPLETED',
    campaignId: HARTWELL_CAMPAIGN_ID,
    clientId: HARTWELL_CLIENT_ID,
    actionId: 'act-discovery',
    outcomeTag: 'DONE',
    meta: { ts: Date.now() - 86400000 * 12 },
  },
  {
    type: 'ACTION_COMPLETED',
    campaignId: HARTWELL_CAMPAIGN_ID,
    clientId: HARTWELL_CLIENT_ID,
    actionId: 'act-followup-email',
    outcomeTag: 'OPENED',
    meta: { ts: Date.now() - 86400000 * 8 },
  },
  {
    type: 'SUGGESTION_CREATED',
    campaignId: HARTWELL_CAMPAIGN_ID,
    clientId: HARTWELL_CLIENT_ID,
    suggestion: {
      id: 'sug-cpi-email',
      campaignId: HARTWELL_CAMPAIGN_ID,
      clientId: HARTWELL_CLIENT_ID,
      kind: 'new-action',
      title: 'Send a personalised UK CPI follow-up email to Hartwell on 15 May',
      reasoning: {
        whyNow:
          'UK CPI printed at 2.3% this morning — below consensus. Real yields moved. Hartwell\'s gilt-heavy book is directly affected.',
        whyThisClient:
          'Hartwell holds 42% in long-duration gilts. James raised commodities vs structural question at Q1 review — unanswered.',
        whatContent:
          'Email · short-form · references your March commentary on gilt duration · includes sleeve-level impact table',
      },
      proposedAction: {
        id: 'act-cpi-email',
        type: 'Email',
        title: 'UK CPI response',
        template: 'UK CPI market event',
        dayOffset: 9,
        scheduledDate: '15 May',
      },
      status: 'pending',
    },
    meta: { ts: Date.now() - 3600000 },
  },
];

export function buildMockOutcomeProposals(actionId: string) {
  return {
    actionId,
    draft: {
      actionId,
      talkingPointsUsed: ['Q1 performance vs benchmark', 'Gilt duration positioning', 'Fee structure vs peer group'],
      concerns:
        'James asked whether the commodities allocation is tactical or structural — needs a written answer. Margaret raised fee adequacy vs peer group again. CPI impact on real yields discussed but no follow-up sent.',
      outcomeFlag: 'positive' as const,
      attachments: ['Q1_review_deck.pptx', 'transcript_13_May.txt'],
    },
    submittedAt: new Date().toISOString(),
    proposals: [
      {
        id: 'prop-add-note',
        category: 'add-action' as const,
        summary: 'Send James a detailed structural-case note on commodities allocation',
        detail: 'Day 10 · Email · references Q1 review transcript',
        payload: {
          action: {
            id: 'act-structural-note',
            type: 'Email',
            title: 'Structural case note — commodities',
            template: 'Structural rationale',
            dayOffset: 10,
            scheduledDate: '16 May',
          },
        },
      },
      {
        id: 'prop-modify-email',
        category: 'modify-upcoming' as const,
        summary: 'Add fee-comparison section to Day-14 sleeve analysis email',
        detail: 'Margaret\'s concern from today\'s meeting',
        payload: {
          targetActionId: 'act-sleeve-email',
          patch: { notes: 'Include fee comparison vs Rival X Real Income' },
        },
      },
      {
        id: 'prop-context-fee',
        category: 'update-client-context' as const,
        summary: 'Add concern: fee adequacy vs peer group (Margaret, 13 May)',
        payload: {
          concern: {
            id: 'c-fee-new',
            text: 'Fee adequacy vs peer group — escalated at Q1 review',
            raisedBy: 'Margaret Foley',
            raisedAt: '13 May 2026',
            status: 'open',
          },
        },
      },
    ],
  };
}
