import { addons } from 'storybook/internal/manager-api';
import { create } from 'storybook/internal/theming';
import { version } from '../../../packages/habbo-ui/package.json';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: `Habbo UI v${version}`,
  }),
});
