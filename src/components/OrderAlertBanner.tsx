'use client';

import React from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { AlertNotice } from '@/types/order';

interface OrderAlertBannerProps {
  alert?: AlertNotice;
  onActionClick?: (actionKey: string) => void;
}

export const OrderAlertBanner: React.FC<OrderAlertBannerProps> = ({
  alert,
  onActionClick,
}) => {
  if (!alert) return null;

  const getBorderAndAccent = () => {
    switch (alert.type) {
      case 'warning':
        return {
          border: 'border-l-4 border-amber-600',
          labelColor: 'text-amber-800',
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
          btn: 'bg-amber-600 hover:bg-amber-700 text-white',
        };
      case 'danger':
        return {
          border: 'border-l-4 border-red-600',
          labelColor: 'text-red-600',
          icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />,
          btn: 'bg-red-600 hover:bg-red-700 text-white',
        };
      case 'info':
      default:
        return {
          border: 'border-l-4 border-zinc-950',
          labelColor: 'text-zinc-950',
          icon: <Info className="w-5 h-5 text-zinc-950 shrink-0 mt-0.5" />,
          btn: 'bg-zinc-950 hover:bg-zinc-800 text-white',
        };
    }
  };

  const style = getBorderAndAccent();

  return (
    <div
      role="alert"
      className={`pl-4 sm:pl-5 py-3 bg-transparent text-left ${style.border}`}
    >
      <div className="flex items-start gap-3.5">
        {style.icon}

        <div className="flex-1 space-y-2">
          {/* Header Row: Raw Typographic Hierarchy, No Pill Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className={`font-mono text-xs font-bold uppercase tracking-wider ${style.labelColor}`}
            >
              [ {alert.badge} ]
            </span>
            {alert.timestamp && (
              <span className="text-[11px] font-mono tracking-tight text-zinc-500 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {alert.timestamp}
              </span>
            )}
          </div>

          {/* Title & Message */}
          <div>
            <h2 className="text-base font-bold tracking-tight text-zinc-950">
              {alert.title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-700">
              {alert.message}
            </p>
          </div>

          {/* Direct Action Trigger: Sharp rectangular button, no arrow */}
          {alert.actionLabel && alert.actionKey && (
            <div className="pt-2">
              <button
                onClick={() => onActionClick && onActionClick(alert.actionKey!)}
                className={`inline-flex items-center justify-center px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors ${style.btn}`}
              >
                <span>{alert.actionLabel}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

