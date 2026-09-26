'use client';

import React, { useState } from 'react';
import { mockOrders } from '@/data/mockOrders';
import { OrderState } from '@/types/order';
import { OrderHeader } from '@/components/OrderHeader';
import { OrderAlertBanner } from '@/components/OrderAlertBanner';
import { DeliveryTimeline } from '@/components/DeliveryTimeline';
import { OrderItemsSummary } from '@/components/OrderItemsSummary';
import { DynamicActionCard } from '@/components/DynamicActionCard';
import { EvaluatorBar } from '@/components/EvaluatorBar';
import { ActionModal } from '@/components/ActionModal';
import { ArrowLeft, ShieldCheck, RefreshCw } from 'lucide-react';

export default function OrderTrackingPage() {
  const [activeState, setActiveState] = useState<OrderState>('STANDARD');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    actionKey: string;
    actionTitle: string;
  }>({
    isOpen: false,
    actionKey: '',
    actionTitle: '',
  });

  const currentOrder = mockOrders[activeState];

  const handleTriggerAction = (actionKey: string, label: string) => {
    setModalState({
      isOpen: true,
      actionKey,
      actionTitle: label,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950 flex flex-col justify-between selection:bg-zinc-200">
      {/* Top Application Masthead: Pure light mode */}
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Return to orders overview')}
              className="p-1 -ml-1 text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
              aria-label="Back to order history"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs tracking-wider uppercase font-black text-zinc-950">
                AURA LOGISTICS
              </span>
              <span className="text-zinc-300 hidden sm:inline">•</span>
              <span className="font-mono text-[11px] text-zinc-500 tracking-wider hidden sm:inline uppercase">
                Shipment Custody Ledger
              </span>
            </div>
          </div>

          <div className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
            SYSTEM STATUS: <span className="font-bold text-zinc-950">OPERATIONAL</span>
          </div>
        </div>
      </header>

      {/* Main Content: Flattened Swiss Industrial Print Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
          {/* Left Column: Primary User Intent (Order Reference, Hero ETA, Alert & Transit Ledger) */}
          <div className="lg:col-span-7 lg:pr-10 space-y-6">
            {/* Header: Reference, Status, Hero ETA, Carrier */}
            <OrderHeader order={currentOrder} />

            {/* Contextual Alert Banner: Stark single-sided border, transparent background */}
            {currentOrder.alert && (
              <OrderAlertBanner
                alert={currentOrder.alert}
                onActionClick={(actionKey) =>
                  handleTriggerAction(
                    actionKey,
                    currentOrder.alert?.actionLabel || 'Action Required'
                  )
                }
              />
            )}

            {/* The Hero Timeline Ledger */}
            <DeliveryTimeline
              steps={currentOrder.timeline}
              currentOrderState={currentOrder.state}
            />
          </div>

          {/* Right Column: Compact Supporting Metadata & Resolution */}
          <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-zinc-200 pt-8 lg:pt-0 border-t lg:border-t-0 border-zinc-200">
            {/* Context-Driven Action Resolution Box */}
            <DynamicActionCard
              config={currentOrder.supportCard}
              onTriggerAction={handleTriggerAction}
            />

            {/* Itemized Manifest & Financial Settlement */}
            <OrderItemsSummary
              items={currentOrder.items}
              pricing={currentOrder.pricing}
              shippingAddress={currentOrder.shippingAddress}
            />
          </div>
        </div>
      </main>

      {/* Evaluator State Switcher Toolbar */}
      <EvaluatorBar
        currentState={activeState}
        onSelectState={(state) => setActiveState(state)}
      />

      {/* Interactive Action Dialog */}
      <ActionModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        actionKey={modalState.actionKey}
        actionTitle={modalState.actionTitle}
        order={currentOrder}
      />
    </div>
  );
}

