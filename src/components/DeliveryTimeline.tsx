'use client';

import React from 'react';
import {
  Check,
  Circle,
  AlertTriangle,
  MapPin,
  Truck,
  Package,
  Clock,
} from 'lucide-react';
import { TimelineStep } from '@/types/order';

interface DeliveryTimelineProps {
  steps: TimelineStep[];
  currentOrderState: string;
}

export const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ steps }) => {
  return (
    <div className="pt-8 text-left">
      {/* Ledger Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-xs font-mono tracking-wider uppercase font-bold text-zinc-400">
            [ TRANSIT TELEMETRY ]
          </h2>
          <p className="mt-1 text-base font-bold text-zinc-950 tracking-tight">
            Chain of Custody
          </p>
        </div>
        <span className="font-mono text-xs tracking-wider text-zinc-500 font-bold uppercase">
          {steps.length} CHECKPOINTS
        </span>
      </div>

      {/* Vertical Sequence */}
      <div className="mt-6 space-y-0">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const isWarning = step.status === 'warning';
          const isPending = step.status === 'pending';

          return (
            <div key={step.id} className="relative flex items-start gap-4 pb-7 last:pb-1">
              {/* Thin, sharp vertical guide rail */}
              {!isLast && (
                <div
                  className={`absolute left-[4.5px] top-[14px] bottom-0 w-[1px] ${
                    isCompleted
                      ? 'bg-zinc-950'
                      : isWarning
                      ? 'bg-amber-600'
                      : 'bg-zinc-200'
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* State Indicator Node: Sharp 90-Degree Geometric Square */}
              <div className="relative z-10 shrink-0 pt-1">
                {isCompleted && (
                  <div className="w-2.5 h-2.5 bg-zinc-950" />
                )}

                {isCurrent && (
                  <div className="w-2.5 h-2.5 bg-emerald-600" />
                )}

                {isWarning && (
                  <div className="w-2.5 h-2.5 bg-amber-600" />
                )}

                {isPending && (
                  <div className="w-2.5 h-2.5 border border-zinc-400 bg-white" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm tracking-tight ${
                        isCurrent
                          ? 'font-black text-emerald-800'
                          : isWarning
                          ? 'font-black text-amber-800'
                          : isCompleted
                          ? 'font-bold text-zinc-950'
                          : 'font-medium text-zinc-400'
                      }`}
                    >
                      {step.title}
                    </span>

                    {/* Raw Typographic Hierarchy, No Pill Badges */}
                    {isCurrent && (
                      <span className="font-mono text-[10px] tracking-wider font-bold text-emerald-700">
                        [ACTIVE]
                      </span>
                    )}

                    {isWarning && (
                      <span className="font-mono text-[10px] tracking-wider font-bold text-amber-700">
                        [HOLD]
                      </span>
                    )}
                  </div>

                  {step.timestamp && (
                    <span className="font-mono text-xs tracking-tight text-zinc-500 tabular-nums font-medium">
                      {step.timestamp}
                    </span>
                  )}
                </div>

                {step.subtitle && (
                  <p
                    className={`mt-1 text-xs sm:text-[13px] leading-relaxed ${
                      isPending ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {step.subtitle}
                  </p>
                )}

                {step.location && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-mono tracking-tight text-zinc-500">
                    <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                    <span>{step.location}</span>
                  </div>
                )}

                {/* Stark Status Note: Single-Sided Border, Zero Pastel Background */}
                {step.note && (
                  <div
                    className={`mt-2.5 pl-3 py-1.5 text-xs font-mono tracking-tight border-l-2 ${
                      isWarning
                        ? 'border-amber-600 text-zinc-950'
                        : 'border-zinc-950 text-zinc-800'
                    }`}
                  >
                    <span className="font-bold">[NOTE]</span> {step.note}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

