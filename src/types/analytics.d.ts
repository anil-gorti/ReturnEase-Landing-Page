declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, unknown> }
    ) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export {};
