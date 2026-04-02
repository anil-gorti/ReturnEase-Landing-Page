type EventProps = Record<string, string | number | boolean>;

function cleanProps(props: EventProps): EventProps {
  return Object.entries(props).reduce<EventProps>((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

export function trackEvent(eventName: string, props: EventProps = {}): void {
  if (typeof window === 'undefined') {
    return;
  }

  const clean = cleanProps(props);
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, { props: clean });
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    ...clean,
  });
}
