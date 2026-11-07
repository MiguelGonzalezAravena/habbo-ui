import { useEffect, useRef, useState } from 'react';
import { Button, Card, Field } from './index';

export interface AvatarEditorProps {
  editorUrl?: string;
  initialFigure?: string;
  initialGender?: 'M' | 'F';
  allowClub?: boolean;
}

export function AvatarEditor({
  editorUrl = '/habbo-2008/avatar-editor/editor.html',
  initialFigure = 'hd-180-2.ch-235-62.lg-281-62.sh-290-62.hr-165-34',
  initialGender = 'M',
  allowClub = true,
}: AvatarEditorProps) {
  const src = `${editorUrl}?${new URLSearchParams({
    figure: initialFigure, gender: initialGender, club: allowClub ? '1' : '0',
  })}`;

  return <AvatarEditorFrame key={src} src={src} initialFigure={initialFigure} initialGender={initialGender} />;
}

function AvatarEditorFrame({ src, initialFigure, initialGender }: {
  src: string;
  initialFigure: string;
  initialGender: 'M' | 'F';
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [look, setLook] = useState({ figure: initialFigure, gender: initialGender });
  const [status, setStatus] = useState('');
  useEffect(() => {
    const receive = ({ source, origin, data }: MessageEvent) => {
      if (source !== frame.current?.contentWindow || origin !== window.location.origin ||
          data?.type !== 'habbo-avatar-editor') return;
      if (data.error) {
        setStatus('No se pudo cargar el vestidor.');
        return;
      }
      if (typeof data.figure === 'string' && data.figure && (data.gender === 'M' || data.gender === 'F')) {
        setLook({ figure: data.figure, gender: data.gender });
        setStatus('');
      }
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, []);

  const preview = `https://www.habbo.es/habbo-imaging/avatarimage?${new URLSearchParams({
    ...look, size: 'm', direction: '2', head_direction: '2',
  })}`;

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('Copiado.');
    } catch {
      setStatus('Selecciona el texto para copiarlo manualmente.');
    }
  }

  return <Card title="Generador de Habbos" variant="blue">
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'start', gap: 16 }}>
      <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <iframe ref={frame} src={src} title="Vestidor de Habbo" width={435} height={430}
          style={{ display: 'block', border: 0 }} />
      </div>
      <img src={preview} alt="Vista previa de Habbo Imaging" width={64} height={110} />
    </div>
    <Field label="Código figure" value={look.figure} readOnly />
    <Button onClick={() => copy(look.figure)}>Copiar código</Button>
    <Field label="URL de la imagen" value={preview} readOnly />
    <Button onClick={() => copy(preview)}>Copiar URL</Button>
    <p role="status">{status}</p>
  </Card>;
}
