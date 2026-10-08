/**
 * 3DDX Teeth Chart Universal Embed Helper
 * Allows seamless embedding of the Clinical Odontogram into any web platform
 * (Vanilla JS, PHP, WordPress, Vue, Angular, ASP.NET, etc.) via iframe postMessage bridge.
 */

import type { ClinicalPayload } from './teeth-chart.types';

export interface EmbedOptions {
  /** Target iframe or iframe container element */
  target: HTMLElement | string;
  /** Embed URL (defaults to hosted Vercel / production URL) */
  embedUrl?: string;
  /** Initial selected teeth (Universal 1..32) */
  initialSelected?: number[];
  /** Active services filter (e.g. ['sg', 'tp']) */
  activeServices?: string[];
  /** Theme: 'dark' | 'light' */
  theme?: 'dark' | 'light';
  /** Height in px or CSS string (default: 680px) */
  height?: string | number;
  /** Width in px or CSS string (default: 100%) */
  width?: string | number;
  /** On change callback */
  onChange?: (data: ClinicalPayload) => void;
}

export const DEFAULT_EMBED_URL = 'https://teeth-chart.abdoaladawy.me/?embed=true';

/**
 * Initializes a responsive embedded TeethChart within any container element
 */
export function initTeethChartEmbed(options: EmbedOptions): {
  iframe: HTMLIFrameElement;
  destroy: () => void;
  sendUpdate: (data: { selected?: number[]; activeServices?: string[]; restorations?: Record<number, string> }) => void;
} {
  const container = typeof options.target === 'string'
    ? document.querySelector(options.target) as HTMLElement
    : options.target;

  if (!container) {
    throw new Error(`[3DDX TeethChart] Container element "${options.target}" not found.`);
  }

  const iframe = document.createElement('iframe');
  const baseUrl = options.embedUrl || DEFAULT_EMBED_URL;
  const url = new URL(baseUrl, window.location.href);

  url.searchParams.set('embed', 'true');
  if (options.theme) url.searchParams.set('theme', options.theme);
  if (options.initialSelected && options.initialSelected.length > 0) {
    url.searchParams.set('selected', options.initialSelected.join(','));
  }
  if (options.activeServices && options.activeServices.length > 0) {
    url.searchParams.set('services', options.activeServices.join(','));
  }

  iframe.src = url.toString();
  iframe.style.width = typeof options.width === 'number' ? `${options.width}px` : (options.width || '100%');
  iframe.style.height = typeof options.height === 'number' ? `${options.height}px` : (options.height || '680px');
  iframe.style.border = 'none';
  iframe.style.borderRadius = '1rem';
  iframe.style.display = 'block';
  iframe.allow = 'clipboard-write';

  container.innerHTML = '';
  container.appendChild(iframe);

  const messageHandler = (event: MessageEvent) => {
    if (event.data && event.data.type === '3DDX_TEETH_CHART_UPDATE') {
      options.onChange?.(event.data.payload);
    }
  };

  window.addEventListener('message', messageHandler);

  const sendUpdate = (data: { selected?: number[]; activeServices?: string[]; restorations?: Record<number, string> }) => {
    iframe.contentWindow?.postMessage({
      type: '3DDX_TEETH_CHART_SET_DATA',
      payload: data
    }, '*');
  };

  const destroy = () => {
    window.removeEventListener('message', messageHandler);
    iframe.remove();
  };

  return { iframe, destroy, sendUpdate };
}

/**
 * Attaches a postMessage listener to an existing iframe
 */
export function listenToTeethChart(
  iframe: HTMLIFrameElement,
  callback: (payload: ClinicalPayload) => void
): () => void {
  const handler = (event: MessageEvent) => {
    if (event.source === iframe.contentWindow && event.data?.type === '3DDX_TEETH_CHART_UPDATE') {
      callback(event.data.payload);
    }
  };

  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
}
