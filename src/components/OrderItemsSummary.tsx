'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  MapPin,
  Tag,
  Receipt,
  Headphones,
  Keyboard,
  Wind,
  Backpack,
  Package,
} from 'lucide-react';
import { OrderItem, OrderPricing, ShippingAddress } from '@/types/order';

interface OrderItemsSummaryProps {
  items: OrderItem[];
  pricing: OrderPricing;
  shippingAddress: ShippingAddress;
}

export const OrderItemsSummary: React.FC<OrderItemsSummaryProps> = ({
  items,
  pricing,
  shippingAddress,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: pricing.currency,
    }).format(amount);
  };

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-8 text-left">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h2 className="text-xs font-mono tracking-wider uppercase font-bold text-zinc-400">
            [ SHIPMENT MANIFEST ]
          </h2>
          <p className="mt-1 text-base font-bold text-zinc-950 tracking-tight">
            Package Contents
          </p>
        </div>
        <span className="font-mono text-xs tracking-wider text-zinc-500 font-bold uppercase">
          {totalQuantity} {totalQuantity === 1 ? 'UNIT' : 'UNITS'}
        </span>
      </div>

      {/* Itemized Manifest */}
      <div className="mt-2 divide-y divide-zinc-200">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-zinc-950 truncate">
                {item.name}
              </h3>
              {item.variant && (
                <p className="text-xs font-mono text-zinc-500 mt-0.5 truncate">
                  {item.variant}
                </p>
              )}
              <div className="mt-1.5 flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                <span className="font-bold">QTY: {item.quantity}</span>
                {item.sku && <span>• SKU: {item.sku}</span>}
              </div>
            </div>

            <div className="text-right shrink-0 font-mono text-sm font-bold tracking-tight text-zinc-950">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Destination Metadata: Unboxed brutalist specification */}
      <div className="mt-6 pt-5 border-t border-zinc-200 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 border border-zinc-300 flex items-center justify-center text-zinc-950 shrink-0 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-wider font-bold text-zinc-400">
              DESTINATION TELEMETRY
            </p>
            <p className="font-bold text-zinc-950 mt-1">
              {shippingAddress.recipientName}
            </p>
            <p className="font-mono text-xs text-zinc-700 tracking-tight mt-0.5">
              {shippingAddress.street}, {shippingAddress.cityStateZip}
            </p>
            {shippingAddress.deliveryInstructions && (
              <p className="mt-2 text-xs font-mono text-zinc-500">
                [ NOTE: {shippingAddress.deliveryInstructions} ]
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Financial Settlement Accordion */}
      <div className="mt-6 pt-5 border-t border-zinc-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs font-mono tracking-wider uppercase text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
          aria-expanded={isExpanded}
        >
          <span className="font-bold">[ TOTAL CHARGES ]</span>
          <span className="flex items-center gap-2 font-bold text-zinc-950">
            {formatPrice(pricing.total)}
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </span>
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-dashed border-zinc-300 space-y-2 text-xs font-mono tracking-tight">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span className="font-bold">{formatPrice(pricing.subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Shipping & Handling</span>
              <span className="font-bold">
                {pricing.shipping === 0 ? 'FREE' : formatPrice(pricing.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Estimated Tax</span>
              <span className="font-bold">{formatPrice(pricing.tax)}</span>
            </div>
            {pricing.discount ? (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Discount Applied
                </span>
                <span>-{formatPrice(pricing.discount)}</span>
              </div>
            ) : null}
            <div className="pt-3 border-t border-zinc-950 flex justify-between font-black text-sm text-zinc-950">
              <span>FINAL SETTLEMENT</span>
              <span>{formatPrice(pricing.total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

