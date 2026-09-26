'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Send,
  Bell,
  Truck,
  ShieldCheck,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import { OrderData } from '@/types/order';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionKey: string;
  actionTitle: string;
  order: OrderData;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  actionKey,
  actionTitle,
  order,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [checkConfirmed, setCheckConfirmed] = useState(false);

  const handleModalClose = useCallback(() => {
    setSubmitted(false);
    setInputVal('');
    setCheckConfirmed(false);
    setTicketId('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleModalClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(`TKT-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
  };

  const renderContent = () => {
    if (submitted) {
      return (
        <div className="py-2 text-left space-y-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
            <h3 className="text-base font-bold text-zinc-950">
              Request Dispatched
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Inquiry for Order <span className="font-mono font-bold text-zinc-950">#{order.orderNumber}</span> logged with customer logistics.
          </p>
          <div className="p-3 border border-zinc-950 font-mono text-xs text-zinc-950">
            CASE IDENTIFIER: <span className="font-bold">#{ticketId}</span>
          </div>
          <div className="pt-2">
            <button
              onClick={handleModalClose}
              className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-zinc-950 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      );
    }

    if (actionKey === 'report_missing') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Stark callout with single-sided border, zero background fill */}
          <div className="border-l-4 border-red-600 pl-3.5 py-1 text-xs text-zinc-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              If parcel cannot be located after inspecting perimeter, buyer protection authorizes replacement dispatch or refund.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <label className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 block font-bold">
              VERIFICATION CHECKLIST
            </label>
            <label className="flex items-start gap-2.5 p-3 border border-zinc-300 text-zinc-900 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={checkConfirmed}
                onChange={(e) => setCheckConfirmed(e.target.checked)}
                className="mt-0.5 text-zinc-950 focus:ring-zinc-950"
              />
              <span className="text-xs leading-relaxed">
                I have inspected surrounding gates, side entrances, and verified with building management or neighbors.
              </span>
            </label>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-bold">
              OBSERVATION NOTES
            </label>
            <textarea
              rows={3}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Provide courier delivery context or perimeter details..."
              className="w-full text-xs p-3 border border-zinc-950 text-zinc-950 font-mono tracking-tight placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Submit Missing Parcel Notice
          </button>
        </form>
      );
    }

    if (actionKey === 'notify_me' || actionKey === 'sms_alerts') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Enter mobile number for telemetry notifications upon courier transit scans.
          </p>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-bold">
              DESTINATION PHONE
            </label>
            <input
              type="tel"
              required
              defaultValue="+1 (555) 019-2834"
              className="w-full text-xs p-3 border border-zinc-950 text-zinc-950 font-mono tracking-tight focus:outline-none focus:ring-1 focus:ring-zinc-950"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider bg-zinc-950 hover:bg-zinc-800 text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Enable SMS Notifications
          </button>
        </form>
      );
    }

    if (actionKey === 'live_map') {
      return (
        <div className="space-y-4 text-left">
          <div className="border border-zinc-300 p-4">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-zinc-950" />
              <span className="font-mono text-xs font-bold text-zinc-950 uppercase">
                COURIER VEHICLE #402 • ACTIVE ROUTE
              </span>
            </div>
            <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
              Driver is 4 stops away delivering on Elmwood Terrace.
            </p>
          </div>

          <div className="text-xs font-mono tracking-wider space-y-2 p-3.5 border border-zinc-300">
            <div className="flex justify-between">
              <span className="text-zinc-500 uppercase">TARGET ADDRESS:</span>
              <span className="font-bold text-zinc-950">{order.shippingAddress.street}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 uppercase">EXPECTED WINDOW:</span>
              <span className="font-bold text-emerald-800">17:45 – 18:30 LOCAL</span>
            </div>
          </div>

          <button
            onClick={handleModalClose}
            className="w-full py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider bg-zinc-950 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Dismiss Proximity View
          </button>
        </div>
      );
    }

    // Default Support Form
    return (
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1 font-bold">
            INSTRUCTION SPECIFICATION
          </label>
          <textarea
            rows={3}
            required
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Provide drop-off notes or support requirements..."
            className="w-full text-xs p-3 border border-zinc-950 text-zinc-950 font-mono tracking-tight placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider bg-zinc-950 hover:bg-zinc-800 text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <Send className="w-3.5 h-3.5" />
          Transmit Request
        </button>
      </form>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70"
    >
      <div className="relative w-full max-w-md bg-white border-2 border-zinc-950 p-6 space-y-4 text-left">
        <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200">
          <h2 className="text-base font-bold text-zinc-950 tracking-tight">
            {actionTitle}
          </h2>
          <button
            onClick={handleModalClose}
            className="p-1 text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

