import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'public/i18n/',
  langs: ['en', 'hi', 'mr'],
  keysManager: {
    output: 'public/i18n/',
    unflat: true,
    sort: true,
  },
};

export default config;
