import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErfgoedzoekerConfigSchema } from '@erfgoedzoeker/config-schema';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from './config.service';

export async function initializeAppConfig(): Promise<void> {
  const configService = inject(ConfigService);
  const http = inject(HttpClient);
  const router = inject(Router);
  const configPath = '/config/erfgoedzoeker.config.json';

  const redirectWithError = async (message: string): Promise<void> => {
    configService.setLoadError(message);
    await router.navigate(['/config-error'], { replaceUrl: true });
  };

  try {
    const raw = await firstValueFrom(http.get(configPath));
    const result = ErfgoedzoekerConfigSchema.safeParse(raw);

    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
        .join('\n');
      await redirectWithError(
        `Configuratie is ongeldig<br/><pre><small>${issues}</small></pre>`,
      );
      return;
    }

    configService.initialize(result.data);
  } catch (err: unknown) {
    await redirectWithError(
      `Configuratie kon niet worden geladen<br/><pre><small>${(err as Error).message}</small></pre>`,
    );
  }
}
