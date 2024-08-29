export enum ACCOUNT_TYPE {
  CUSTOM = 'custom',
  STANDARD = 'standard',
}

export enum BUSINESS_TYPES {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
}

export enum CARD_TYPES {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum CARD_STATUS {
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  PROCESSING = 'PROCESSING',
  DETACHED = 'DETACHED',
}

export enum PAYMENT_TYPES {
  COD = 'cod',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  PAYPAL = 'paypal',
  KLARNA = 'klarna',
  APPLE_PAY = 'apple_pay',
}

export enum PAYMENT_INTENT_STATUS {
  REQUIRE_PAYMENT_METHOD = 'requires_payment_method', // requires a valid payment method.
  REQUIRED_CONFIRMATION = 'requires_confirmation', // requires confirmation before the payment can be completed.
  REQUIRE_ACTION = 'requires_action', // further action is needed from the customer to complete the payment, such as 3D Secure authentication.
  PROCESSING = 'processing', // the payment is being processed.
  SUCCEEDED = 'succeeded', // the payment was successful.
  CANCELLED = 'canceled', // the payment was canceled.
  REQUIRE_CAPTURE = 'requires_capture', //requires capturing funds from the customer's account.
}
