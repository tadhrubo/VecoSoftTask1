'use client';

import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Truck, Calendar } from 'lucide-react';
import { OrderData } from '@/types/order';

interface OrderHeaderProps {
  order: OrderData;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({ order }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getStatusDotColor = () => {
    switch (order.statusBadgeTone) {
      case 'emerald':
        return 'bg-emerald-600';
      case 'amber':
        return 'bg-amber-600';
      case 'rose':
        return 'bg-red-600';
      case 'indigo':
      default:
        return 'bg-zinc-950';
    }
  };

  return (
    <div className="pb-8 border-b border-zinc-200 text-left">
      {/* Top Ledger Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-wider uppercase font-semibold text-zinc-400">
            ORDER REFERENCE
          </span>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-950">
            <span>#{order.orderNumber}</span>
            <button
              onClick={() => handleCopy(order.orderNumber)}
              title="Copy Order ID"
              className="p-1 text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer"
              aria-label="Copy order reference"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Status Indicator: Raw Uppercase Monospace with Sharp 6x6px Square Dot */}
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-950">
          <span className={`w-1.5 h-1.5 inline-block shrink-0 ${getStatusDotColor()}`} />
          <span>{order.statusLabel}</span>
        </div>
      </div>

      {/* Hero Delivery Statement */}
      <div className="pt-6 sm:pt-7">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-zinc-500 font-semibold">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          <span>
            {order.estimatedDelivery.isDelivered
              ? 'Final Delivery Timestamp'
              : order.estimatedDelivery.isPassedOrDelayed
              ? 'Revised Estimated Arrival'
              : 'Estimated Delivery Window'}
          </span>
        </div>

        <h1 className="mt-2.5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
          {order.estimatedDelivery.primary}
        </h1>

        {order.estimatedDelivery.secondary && (
          <p
            className={`mt-2 text-xs sm:text-sm font-mono tracking-tight ${
              order.estimatedDelivery.isPassedOrDelayed
                ? 'text-amber-800 font-bold'
                : 'text-zinc-600 font-medium'
            }`}
          >
            {order.estimatedDelivery.secondary}
          </p>
        )}
      </div>

      {/* Carrier Telemetry Bar */}
      <div className="mt-8 pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-y-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border border-zinc-300 flex items-center justify-center text-zinc-950">
            <Truck className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-zinc-950">{order.carrier.carrierName}</span>
            {order.carrier.serviceLevel && (
              <span className="ml-1.5 text-zinc-500 font-mono tracking-tight text-[11px]">
                [{order.carrier.serviceLevel.toUpperCase()}]
              </span>
            )}
          </div>
        </div>

        {order.carrier.isPending ? (
          <span className="font-mono text-[11px] tracking-wider uppercase text-zinc-500 font-semibold">
            [ INTAKE BARCODE SCAN PENDING ]
          </span>
        ) : order.carrier.trackingNumber ? (
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider">
            <span className="text-zinc-400 uppercase">WAYBILL:</span>
            <span className="font-bold text-zinc-950">
              {order.carrier.trackingNumber}
            </span>
            {order.carrier.trackingUrl && (
              <a
                href={order.carrier.trackingUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-950 p-1 transition-colors cursor-pointer"
                title="Open carrier tracking"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

