import type { ActionTileState } from './types';

export const TILE_CONTAINER_STYLES: Record<ActionTileState, string> = {
  completed: 'border-2 border-[#22C55E] bg-[#22C55E]/10',
  'awaiting-upload': 'border-2 border-[#F59E0B] bg-[#F59E0B]/10 ring-2 ring-[#F59E0B]/25',
  'ai-suggested': 'border-2 border-dashed border-[#A855F7] bg-[#A855F7]/10',
  planned: 'border border-[#374151] bg-[#111827]',
  interrupt: 'border-2 border-[#EF4444] bg-[#EF4444]/10',
};

export const TILE_TAG_STYLES: Record<ActionTileState, string> = {
  completed: 'text-[#22C55E] bg-[#22C55E]/15 border-[#22C55E]/30',
  'awaiting-upload': 'text-[#F59E0B] bg-[#F59E0B]/15 border-[#F59E0B]/30',
  'ai-suggested': 'text-[#A855F7] bg-[#A855F7]/15 border-[#A855F7]/30',
  planned: 'text-[#9CA3AF] bg-[#1F2937] border-[#374151]',
  interrupt: 'text-[#EF4444] bg-[#EF4444]/15 border-[#EF4444]/30',
};

export const TILE_ICON_COLORS: Record<ActionTileState, string> = {
  completed: 'text-[#22C55E]',
  'awaiting-upload': 'text-[#F59E0B]',
  'ai-suggested': 'text-[#A855F7]',
  planned: 'text-[#6B7280]',
  interrupt: 'text-[#EF4444]',
};
