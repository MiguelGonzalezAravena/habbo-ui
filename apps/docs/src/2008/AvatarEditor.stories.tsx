import type { Meta, StoryObj } from '@storybook/react';
import { AvatarEditor } from '@mgadev/habbo-ui/2008';
import '@mgadev/habbo-ui/2008/styles.css';

const meta = {
  title: '2008/AvatarEditor',
  component: AvatarEditor,
  tags: ['autodocs'],
  args: { showExpressionControls: true, showOutput: true },
  argTypes: {
    initialFigure: {
      description: 'Código figure con el que se abre el vestidor. Por defecto se carga un look de ejemplo.',
      control: 'text',
    },
    initialGender: {
      description: 'Género inicial del avatar. El valor por defecto es M.',
      options: ['M', 'F'],
      control: 'select',
    },
    allowClub: {
      description: 'Permite seleccionar prendas de Habbo Club. Viene activado por defecto.',
      control: 'boolean',
    },
    showExpressionControls: {
      description: 'Muestra los controles de expresión, postura y dirección.',
    },
    showOutput: {
      description: 'Muestra los campos con el código figure y la URL y sus botones de copia.',
    },
    onChange: {
      description: 'Entrega { figure, url } al iniciar y cuando cambia alguno de los valores.',
    },
    editorUrl: {
      description: 'Ruta del archivo editor.html servido desde el mismo origen.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Publica la carpeta [avatar-editor](https://github.com/MiguelGonzalezAravena/habbo-ui/tree/81685ed/apps/playground/public/habbo-2008/avatar-editor) en `/habbo-2008/avatar-editor/` de tu aplicación. Si la sirves en otra ruta, pasa la ubicación de `editor.html` en `editorUrl`.',
          'Ambas opciones de visibilidad vienen activadas. Puedes ocultar los campos y seguir recibiendo sus valores con `onChange`.',
          [
            '```tsx',
            "import { AvatarEditor } from '@mgadev/habbo-ui/2008';",
            "import '@mgadev/habbo-ui/2008/styles.css';",
            '',
            'export function Vestidor() {',
            '  return (',
            '    <AvatarEditor',
            '      showOutput={false}',
            '      onChange={({ figure, url }) => console.log(figure, url)}',
            '    />',
            '  );',
            '}',
            '```',
          ].join('\n'),
        ].join('\n\n'),
      },
    },
  },
} satisfies Meta<typeof AvatarEditor>;
export default meta;

export const Vestidor: StoryObj<typeof meta> = {};
