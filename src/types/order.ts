export type OrderState = 'STANDARD' | 'DELAYED' | 'NOT_RECEIVED' | 'PENDING';

export type StepStatus = 'completed' | 'current' | 'pending' | 'warning';

export interface TimelineStep {
  id: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
  location?: string;
  status: StepStatus;
  note?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  variant?: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  sku?: string;
}

export interface CarrierInfo {
  carrierName: string;
  serviceLevel?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  isPending?: boolean;
  lastScannedAt?: string;
}

export interface ShippingAddress {
  recipientName: string;
  street: string;
  cityStateZip: string;
  deliveryInstructions?: string;
}

export interface OrderPricing {
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  total: number;
  currency: string;
}

export interface AlertNotice {
  type: 'info' | 'warning' | 'danger' | 'success';
  badge: string;
  title: string;
  message: string;
  timestamp?: string;
  actionLabel?: string;
  actionKey?: string;
}

export interface SupportActionConfig {
  title: string;
  description: string;
  primaryAction: {
    label: string;
    actionKey: string;
    iconName: 'help' | 'alert-triangle' | 'truck' | 'bell' | 'message-square' | 'refresh-cw';
    variant?: 'primary' | 'danger' | 'warning' | 'default';
  };
  secondaryAction?: {
    label: string;
    actionKey: string;
    iconName: 'external-link' | 'phone' | 'file-text' | 'shield';
  };
  helpfulTips?: {
    iconName: 'search' | 'users' | 'clock' | 'home' | 'info';
    text: string;
  }[];
}

export interface OrderData {
  id: string;
  state: OrderState;
  orderNumber: string;
  orderDate: string;
  statusLabel: string;
  statusBadgeTone: 'emerald' | 'amber' | 'rose' | 'blue' | 'indigo';
  estimatedDelivery: {
    primary: string;
    secondary?: string;
    isPassedOrDelayed?: boolean;
    isDelivered?: boolean;
  };
  carrier: CarrierInfo;
  shippingAddress: ShippingAddress;
  alert?: AlertNotice;
  timeline: TimelineStep[];
  items: OrderItem[];
  pricing: OrderPricing;
  supportCard: SupportActionConfig;
}
