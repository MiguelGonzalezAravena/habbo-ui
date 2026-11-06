import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
 stories: ['../src/**/*.stories.@(ts|tsx)'],
 addons: ['@storybook/addon-essentials'],
 framework: { name: '@storybook/react-vite', options: {} },
 docs: { autodocs: 'tag' },
 async viteFinal(config) {
  // Only Storybook scopes the legacy 2006 CSS. Consumers retain the published API.
  const scope2006 = {
   postcssPlugin:'habbo-storybook-scope-2006',
   Rule(rule:any) {
    const file=rule.source?.input?.file?.replace(/\\/g,'/')??'';
    if(!file.includes('/2006/')||rule.parent?.type==='atrule'&&/keyframes/.test(rule.parent.name))return;
    const scope='[data-habbo-year="2006"]';
    rule.selectors=rule.selectors.map((selector:string)=>{
     if(selector.includes(scope))return selector;
     if(/^(html|body|:root)(?=[\s.#:\[>+~]|$)/.test(selector))return selector.replace(/^(html|body|:root)/,scope);
     return `${scope} ${selector}`;
    });
   },
  };
  const existing=config.css?.postcss;
  config.css={...config.css,postcss:{...(typeof existing==='object'?existing:{}),plugins:[...(typeof existing==='object'?existing.plugins??[]:[]),scope2006]}};
  return config;
 },
};
export default config;
