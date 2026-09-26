'use client';

import React, { useEffect } from 'react';
import { OrderState } from '@/types/order';

interface EvaluatorBarProps {
  currentState: OrderState;
  onSelectState: (state: OrderState) => void;
}

interface StateOption {
  state: OrderState;
  shortLabel: string;
  badgeLabel: string;
  keyNumber: string;
}

export const EvaluatorBar: React.FC<EvaluatorBarProps> = ({
  currentState,
  onSelectState,
}) => {
  const options: StateOption[] = [
    {
      state: 'STANDARD',
      shortLabel: '1. Standard',
      badgeLabel: 'In Transit',
      keyNumber: '1',
    },
    {
      state: 'DELAYED',
      shortLabel: '2. Delayed',
      badgeLabel: 'Weather Exception',
      keyNumber: '2',
    },
    {
      state: 'NOT_RECEIVED',
      shortLabel: '3. Not Received',
      badgeLabel: 'Delivery Claim',
      keyNumber: '3',
    },
    {
      state: 'PENDING',
      shortLabel: '4. Pending',
      badgeLabel: 'Awaiting Intake',
      keyNumber: '4',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === '1') onSelectState('STANDARD');
      if (e.key === '2') onSelectState('DELAYED');
      if (e.key === '3') onSelectState('NOT_RECEIVED');
      if (e.key === '4') onSelectState('PENDING');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectState]);

  return (
    <aside
      aria-label="Evaluator State Switcher"
      className="fixed bottom-4 inset-x-0 z-40 px-3 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto max-w-xl w-full bg-white text-zinc-950 p-2.5 border-2 border-zinc-950">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between px-1 pb-2 border-b border-zinc-200 text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-950">[ EVALUATOR SWITCHER ]</span>
            <span className="hidden sm:inline text-zinc-400">• PRESS KEYS 1-4</span>
          </div>
          <div>
            ACTIVE: <span className="font-bold text-zinc-950">[{currentState}]</span>
          </div>
        </div>

        {/* 4 State Switcher Buttons */}
        <div className="grid grid-cols-4 gap-1.5 pt-2">
          {options.map((opt) => {
            const isActive = currentState === opt.state;
            return (
              <button
                key={opt.state}
                onClick={() => onSelectState(opt.state)}
                className={`py-2 px-1 text-xs font-mono tracking-wider transition-colors cursor-pointer text-center uppercase ${
                  isActive
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'bg-transparent text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 font-medium'
                }`}
                title={`Switch to ${opt.state} state (${opt.badgeLabel}) - Press ${opt.keyNumber}`}
              >
                <span>{opt.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

