import { Mail, Phone, Clock, Users, FileText } from 'lucide-react';
import type { TimelineTile as TimelineTileType, ActionType } from '../../campaign/types';
import { TILE_CONTAINER_STYLES, TILE_TAG_STYLES, TILE_ICON_COLORS } from '../../campaign/campaignTileStyles';

function ActionIcon({ type }: { type: ActionType }) {
  const cn = 'w-7 h-7';
  switch (type) {
    case 'Email':
      return <Mail className={cn} />;
    case 'Call':
      return <Phone className={cn} />;
    case 'Meeting':
      return <Users className={cn} />;
    case 'Follow-up':
      return <Clock className={cn} />;
    default:
      return <FileText className={cn} />;
  }
}

interface TimelineTileProps {
  tile: TimelineTileType;
  onSelect: (actionId: string) => void;
  onOpenCanvas?: (actionId: string) => void;
  isSelected?: boolean;
}

export function TimelineTile({ tile, onSelect, onOpenCanvas, isSelected }: TimelineTileProps) {
  const { action, visualState, outcomeTag, isCurrentFocus } = tile;
  const iconColor = TILE_ICON_COLORS[visualState];
  const canOpenCanvas = action.type === 'Email' || action.type === 'Follow-up';

  return (
    <div className="relative z-10 flex flex-col items-center min-w-[100px] max-w-[120px] group">
      <DayLabel day={action.dayOffset} date={action.scheduledDate} />
      <button
        type="button"
        onClick={() => onSelect(action.id)}
        className={`w-[72px] h-[72px] rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${TILE_CONTAINER_STYLES[visualState]} ${
          isSelected ? 'scale-105 shadow-lg' : 'hover:scale-[1.03]'
        }`}
      >
        <span className={iconColor}>
          <ActionIcon type={action.type} />
        </span>
      </button>
      <p className="mt-3 text-center text-[11px] font-semibold text-white leading-tight px-1">{action.title}</p>
      {outcomeTag && (
        <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${TILE_TAG_STYLES[visualState]}`}>
          {outcomeTag}
        </span>
      )}
      {isCurrentFocus && visualState === 'awaiting-upload' && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(action.id);
          }}
          className="mt-2 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#F59E0B] text-[#0B1220] hover:bg-[#FBBF24] transition-colors"
        >
          Log outcome
        </button>
      )}
      {canOpenCanvas && onOpenCanvas && visualState !== 'completed' && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenCanvas(action.id);
          }}
          className="mt-1 text-[9px] text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity font-medium"
        >
          Open Canvas
        </button>
      )}
    </div>
  );
}

function DayLabel({ day, date }: { day: number; date?: string }) {
  return (
    <div className="text-[10px] font-bold text-[#6B7280] mb-2 uppercase whitespace-nowrap">
      Day {day}
      {date ? ` · ${date}` : ''}
    </div>
  );
}
