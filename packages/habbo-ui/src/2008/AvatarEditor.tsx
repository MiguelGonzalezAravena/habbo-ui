import { useEffect, useRef, useState } from 'react';
import { Button, Card, Field } from './index';
import { SelectField } from './compositions';

export interface AvatarEditorProps {
  editorUrl?: string;
  initialFigure?: string;
  initialGender?: 'M' | 'F';
  allowClub?: boolean;
  showExpressionControls?: boolean;
  showOutput?: boolean;
  onChange?: (value: { figure: string; url: string }) => void;
}

export function AvatarEditor({
  editorUrl = '/habbo-2008/avatar-editor/editor.html',
  initialFigure = 'hd-180-2.ch-235-62.lg-281-62.sh-290-62.hr-165-34',
  initialGender = 'M',
  allowClub = true,
  showExpressionControls = true,
  showOutput = true,
  onChange,
}: AvatarEditorProps) {
  const src = `${editorUrl}?${new URLSearchParams({
    figure: initialFigure, gender: initialGender, club: allowClub ? '1' : '0',
  })}`;

  return <AvatarEditorFrame key={src} src={src} initialFigure={initialFigure} initialGender={initialGender} showExpressionControls={showExpressionControls} showOutput={showOutput} onChange={onChange} />;
}

function AvatarEditorFrame({ src, initialFigure, initialGender, showExpressionControls, showOutput, onChange }: {
  src: string;
  initialFigure: string;
  initialGender: 'M' | 'F';
  showExpressionControls: boolean;
  showOutput: boolean;
  onChange: AvatarEditorProps['onChange'];
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [look, setLook] = useState({ figure: initialFigure, gender: initialGender });
  const [gesture, setGesture] = useState('std');
  const [action, setAction] = useState('std');
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
    ...look, ...(showExpressionControls ? { gesture, action } : {}), size: 'm', direction: '2', head_direction: '2',
  })}`;

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const { figure } = look;
  useEffect(() => {
    onChangeRef.current?.({ figure, url: preview });
  }, [figure, preview]);

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
    {showExpressionControls && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <SelectField label="Expresión" value={gesture} onChange={event => setGesture(event.target.value)}>
          <option value="std">Neutral</option>
          <option value="sml">Feliz</option>
          <option value="sad">Triste</option>
          <option value="agr">Enojado</option>
          <option value="srp">Sorprendido</option>
        </SelectField>
        <SelectField label="Postura o acción" value={action} onChange={event => setAction(event.target.value)}>
          <option value="std">De pie</option>
          <option value="sit">Sentado</option>
          <option value="lay">Acostado</option>
          <option value="wlk">Caminando</option>
          <option value="wav">Saludando (mano arriba)</option>
        </SelectField>
      </div>
    )}
    {showOutput && <>
      <div style={{ marginBottom: 24 }}>
        <Field label="Código figure" value={look.figure} readOnly />
        <Button style={{ marginTop: 8 }} onClick={() => copy(look.figure)}>Copiar código</Button>
      </div>
      <Field label="URL de la imagen" value={preview} readOnly />
      <Button style={{ marginTop: 8 }} onClick={() => copy(preview)}>Copiar URL</Button>
      <p role="status">{status}</p>
    </>}
  </Card>;
}
