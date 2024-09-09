import { APP_INITIALIZER } from '@angular/core';
import { LangService } from './core/services/lang.service';
import { ThemeService } from './theme.service';

export const AppInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: (themeService: ThemeService) => () => {
    return themeService.loadTheme();
  },
  deps: [ThemeService],
  multi: true,
};

 