import { useEffect, useRef, useState } from 'react';
import { Button, Card, Field } from './index';
import { SelectField } from './compositions';

const directions = [
  'Diagonal trasera derecha',
  'Perfil derecho',
  'Diagonal delantera derecha',
  'De frente',
  'Diagonal delantera izquierda',
  'Perfil izquierdo',
  'Diagonal trasera izquierda',
  'De espaldas',
];

export interface AvatarEditorProps {
  editorUrl?: string;
  initialFigure?: string;
  initialGender?: 'M' | 'F';
  allowClub?: boolean;
  showExpressionControls?: boolean;
  showOutput?: boolean;
  showPreview?: boolean;
  onChange?: (value: { figure: string; url: string }) => void;
}

export function AvatarEditor({
  editorUrl = '/habbo-2008/avatar-editor/editor.html',
  initialFigure = 'hd-180-2.ch-235-62.lg-281-62.sh-290-62.hr-165-34',
  initialGender = 'M',
  allowClub = true,
  showExpressionControls = true,
  showOutput = true,
  showPreview = true,
  onChange,
}: AvatarEditorProps) {
  const src = `${editorUrl}?${new URLSearchParams({
    figure: initialFigure, gender: initialGender, club: allowClub ? '1' : '0',
  })}`;

  return <AvatarEditorFrame key={src} src={src} initialFigure={initialFigure} initialGender={initialGender} showExpressionControls={showExpressionControls} showOutput={showOutput} showPreview={showPreview} onChange={onChange} />;
}

function AvatarEditorFrame({ src, initialFigure, initialGender, showExpressionControls, showOutput, showPreview, onChange }: {
  src: string;
  initialFigure: string;
  initialGender: 'M' | 'F';
  showExpressionControls: boolean;
  showOutput: boolean;
  showPreview: boolean;
  onChange: AvatarEditorProps['onChange'];
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [look, setLook] = useState({ figure: initialFigure, gender: initialGender });
  const [gesture, setGesture] = useState('std');
  const [action, setAction] = useState('std');
  const [direction, setDirection] = useState(2);
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
    ...look, ...(showExpressionControls ? { gesture, action } : {}), size: 'm',
    direction: String(direction), head_direction: String(direction),
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
      {showPreview && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
          flex: '1 1 160px', minHeight: 430, minWidth: 0 }}>
          <img src={preview} alt="Vista previa de Habbo Imaging"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
    </div>
    {showExpressionControls && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <SelectField label="Expresión" value={gesture} onChange={event => setGesture(event.target.value)}>
          <option value="std">Neutral</option>
          <option value="sml">Feliz</option>
          <option value="sad">Triste</option>
          <option value="agr">Enojado</option>
          <option value="srp">Sorprendido</option>
          <option value="eyb">Ojos cerrados</option>
          <option value="spk">Hablando</option>
        </SelectField>
        <SelectField label="Postura o acción" value={action} onChange={event => setAction(event.target.value)}>
          <option value="std">De pie</option>
          <option value="sit">Sentado</option>
          <option value="lay">Acostado</option>
          <option value="wlk">Caminando</option>
          <option value="wav">Saludando (mano arriba)</option>
          <option value="wav,sit">Sentado y saludando</option>
          <option value="laugh">Riendo</option>
          <option value="respect">Dando respeto</option>
          <option value="crr=1">Sosteniendo un objeto</option>
          <option value="drk=1">Bebiendo</option>
        </SelectField>
        <div style={{ display: 'flex', alignItems: 'end', gap: 8 }}>
          <Button aria-label="Girar a la izquierda"
            onClick={() => setDirection(current => (current + 1) % directions.length)}>←</Button>
          <SelectField label="Dirección" value={direction} onChange={event => setDirection(Number(event.target.value))}>
            {directions.map((label, value) => <option key={label} value={value}>{label}</option>)}
          </SelectField>
          <Button aria-label="Girar a la derecha"
            onClick={() => setDirection(current => (current + directions.length - 1) % directions.length)}>→</Button>
        </div>
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
