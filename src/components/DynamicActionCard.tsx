'use client';

import React from 'react';
import {
  HelpCircle,
  AlertTriangle,
  Truck,
  Bell,
  MessageSquare,
  RefreshCw,
  ExternalLink,
  Phone,
  FileText,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { SupportActionConfig } from '@/types/order';

interface DynamicActionCardProps {
  config: SupportActionConfig;
  onTriggerAction: (actionKey: string, label: string) => void;
}

export const DynamicActionCard: React.FC<DynamicActionCardProps> = ({
  config,
  onTriggerAction,
}) => {
  const getActionIcon = (name: string) => {
    switch (name) {
      case 'help':
        return <HelpCircle className="w-4 h-4 shrink-0" />;
      case 'alert-triangle':
        return <AlertTriangle className="w-4 h-4 shrink-0" />;
      case 'truck':
        return <Truck className="w-4 h-4 shrink-0" />;
      case 'bell':
        return <Bell className="w-4 h-4 shrink-0" />;
      case 'message-square':
        return <MessageSquare className="w-4 h-4 shrink-0" />;
      case 'refresh-cw':
        return <RefreshCw className="w-4 h-4 shrink-0" />;
      case 'phone':
        return <Phone className="w-4 h-4 shrink-0" />;
      case 'file-text':
        return <FileText className="w-4 h-4 shrink-0" />;
      case 'shield':
        return <Shield className="w-4 h-4 shrink-0" />;
      default:
        return <ExternalLink className="w-4 h-4 shrink-0" />;
    }
  };

  const getPrimaryBtnStyle = (variant?: string) => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 text-white';
      case 'primary':
      default:
        return 'bg-zinc-950 hover:bg-zinc-800 text-white';
    }
  };

  return (
    <div className="text-left pb-8 border-b border-zinc-200">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-200">
        <h2 className="text-xs font-mono tracking-wider uppercase font-bold text-zinc-400">
          [ RESOLUTION PROTOCOL ]
        </h2>
        <h3 className="mt-1 text-base font-bold text-zinc-950 tracking-tight">
          {config.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* Recommended Guidance Checklist: Hairline dividers, zero background pills */}
      {config.helpfulTips && config.helpfulTips.length > 0 && (
        <div className="mt-5 space-y-2">
          <p className="text-[11px] font-mono tracking-wider uppercase font-bold text-zinc-400">
            CHECKLIST ITEMS
          </p>
          <ul className="divide-y divide-zinc-200 border-t border-b border-zinc-200 text-xs text-zinc-800">
            {config.helpfulTips.map((tip, idx) => (
              <li key={idx} className="py-2.5 flex items-start gap-2.5">
                <span className="font-mono text-zinc-950 font-bold shrink-0">
                  {idx + 1}.
                </span>
                <span className="leading-relaxed">{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Buttons: Solid sharp rectangles, no arrows */}
      <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={() =>
            onTriggerAction(config.primaryAction.actionKey, config.primaryAction.label)
          }
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors ${getPrimaryBtnStyle(
            config.primaryAction.variant
          )}`}
        >
          {getActionIcon(config.primaryAction.iconName)}
          <span>{config.primaryAction.label}</span>
        </button>

        {config.secondaryAction && (
          <button
            onClick={() =>
              onTriggerAction(
                config.secondaryAction!.actionKey,
                config.secondaryAction!.label
              )
            }
            className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider bg-white hover:bg-zinc-100 text-zinc-950 border border-zinc-950 transition-colors cursor-pointer"
          >
            {getActionIcon(config.secondaryAction.iconName)}
            <span>{config.secondaryAction.label}</span>
          </button>
        )}
      </div>
    </div>
  );
};

