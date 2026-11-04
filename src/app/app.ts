
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, timeout } from 'rxjs';

import { PasswordService } from './password.service';
import { ApiPasswordService } from './api-password.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private passwordService = inject(PasswordService);
  private apiService = inject(ApiPasswordService);

  // Password settings
  length = 16;
  includeNumbers = true;
  includeSymbols = true;
  useApi = false;

  // Reactive state
  password = signal('');
  loading = signal(false);
  copied = signal(false);
  error = signal('');

  // Local password generation
  generatePassword(): void {
    if (this.loading()) return;

    try {
      const result = this.passwordService.generate(
        this.length,
        this.includeNumbers,
        this.includeSymbols
      );

      this.password.set(result);
      this.copied.set(false);
      this.error.set('');
    } catch (err) {
      this.error.set('Failed to generate password');
    }
  }

  // API Ninjas password generation
  generateFromApi(): void {
    if (this.loading()) return;

    this.loading.set(true);
    this.error.set('');
    this.copied.set(false);

    this.apiService.generate(this.length)
      .pipe(
        timeout(12000),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: (response) => {
          console.log('API response:', response);

          if (!response.random_password) {
            this.error.set('Invalid API response');
            return;
          }

          this.password.set(response.random_password);
        },
        error: (err) => {
          console.error('API error:', err);

          // Fallback to local generation
          try {
            const result = this.passwordService.generate(
              this.length,
              this.includeNumbers,
              this.includeSymbols
            );
            this.password.set(result);
            this.copied.set(false);
          } catch {
            this.password.set('');
          }

          this.error.set(
            'API unavailable. Password generated locally.'
          );
        }
      });
  }

  // Generate based on selected mode
  generate(): void {
    if (this.useApi) {
      this.generateFromApi();
    } else {
      this.generatePassword();
    }
  }

  // Copy password to clipboard
  async copyPassword(): Promise<void> {
    if (!this.password()) return;

    try {
      await navigator.clipboard.writeText(this.password());
      this.copied.set(true);
      this.error.set('');
    } catch {
      this.error.set('Failed to copy password');
    }
  }
}
