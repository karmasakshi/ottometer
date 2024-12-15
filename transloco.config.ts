import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'public/i18n/',
  langs: ['en'],
  keysManager: {
    output: 'public/i18n/',
    unflat: true,
    sort: true,
  },
};

export default config;
