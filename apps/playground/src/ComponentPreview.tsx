import { useCallback, useEffect, useRef, useState } from 'react';
/** Same-origin archived examples keep their styles while fitting the catalogue. */
export type PreviewWidthMode = 'content' | 'fixed' | 'container' | 'viewport';
export function ComponentPreview({ src, title, widthMode = 'container', fixedWidth = 360, stretchFields = false, onRequestClose }: { src: string; title: string; widthMode?: PreviewWidthMode; fixedWidth?: number; stretchFields?: boolean; onRequestClose?: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const dispose = useRef<(() => void) | undefined>(undefined);
  const [height, setHeight] = useState(80);
  const settings = useRef({widthMode, fixedWidth, stretchFields});
  settings.current = {widthMode, fixedWidth, stretchFields};
  const applySettings = useCallback(() => {
    const doc = frame.current?.contentDocument;
    if (!doc?.body) return;
    doc.documentElement.dataset.widthMode = settings.current.widthMode;
    doc.documentElement.style.setProperty('--ds-fixed-width', settings.current.fixedWidth + 'px');
    doc.body.classList.toggle('ds-field-stretch', settings.current.stretchFields);
  }, []);
  useEffect(applySettings, [applySettings, widthMode, fixedWidth, stretchFields]);
  useEffect(() => {
    const close = (event: MessageEvent) => { if (event.origin === location.origin && event.source === frame.current?.contentWindow && event.data?.type === 'holo-dialog-close') onRequestClose?.(); };
    window.addEventListener('message', close);
    return () => window.removeEventListener('message', close);
  }, [onRequestClose]);
  const resize = useCallback(() => {
    dispose.current?.();
    applySettings();
    const document = frame.current?.contentDocument;
    const view = frame.current?.contentWindow;
    if (!document?.body || !view) return;
    let pending = 0;
    const measure = () => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => {
        const body = document.body;
        const style = view.getComputedStyle(body);
        // In the 2003 document mode, body height follows the iframe viewport.
        // Measure the actual preview children to avoid a resize feedback loop.
        const legacy = document.compatMode === 'BackCompat' && document.querySelector('.legacy-viewport');
        const contentHeight = legacy
          ? Math.max(0, ...Array.from(body.children).filter(el => !['SCRIPT', 'STYLE'].includes(el.tagName)).map(el => el.getBoundingClientRect().bottom)) + parseFloat(style.paddingBottom || '0')
          : Math.max(body.getBoundingClientRect().height, body.scrollHeight);
        const next = Math.ceil(contentHeight + 1 + parseFloat(style.marginTop || '0') + parseFloat(style.marginBottom || '0'));
        setHeight(previous => previous === next ? previous : Math.max(40, next));
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    const mutations = new MutationObserver(measure);
    mutations.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
    document.addEventListener('load', measure, true);
    view.addEventListener('resize', measure);
    measure();
    dispose.current = () => { observer.disconnect(); mutations.disconnect(); document.removeEventListener('load', measure, true); view.removeEventListener('resize', measure); cancelAnimationFrame(pending); };
  }, [applySettings]);
  useEffect(() => () => dispose.current?.(), []);
  return <iframe ref={frame} title={title} src={src} onLoad={resize} loading="eager" className="ds-component-frame" style={{ height }} />;
}
