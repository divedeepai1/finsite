import type { ClientContext, ClientContextEvent } from './types';

export function reduceClientContext(
  events: ClientContextEvent[],
  clientId: string
): ClientContext | null {
  let context: ClientContext | null = null;

  for (const event of events) {
    if (event.clientId !== clientId) continue;

    switch (event.type) {
      case 'CONTEXT_INITIALIZED':
        context = { clientId, ...event.context };
        break;
      case 'CONCERN_ADDED':
        if (context) {
          context = {
            ...context,
            concerns: [...context.concerns, event.concern],
          };
        }
        break;
      case 'CONCERN_RESOLVED':
        if (context) {
          context = {
            ...context,
            concerns: context.concerns.map((c) =>
              c.id === event.concernId ? { ...c, status: 'resolved' as const } : c
            ),
          };
        }
        break;
      case 'HOLDINGS_UPDATED':
        if (context) {
          context = { ...context, holdings: event.holdings };
        }
        break;
      case 'RELATIONSHIP_NOTE_ADDED':
        if (context) {
          context = {
            ...context,
            relationshipNotes: [...context.relationshipNotes, event.note],
          };
        }
        break;
    }
  }

  return context;
}
