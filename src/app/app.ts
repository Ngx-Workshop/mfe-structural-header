import { Component, effect, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgxThemePicker } from '@tmdjr/ngx-theme-picker';

import type { StructuralOverrideMode } from '@tmdjr/ngx-mfe-orchestrator-contracts';

@Component({
  selector: 'ngx-header-mfe',
  imports: [MatIcon, MatButtonModule, NgxThemePicker],
  template: `
    @if(mode() != 'disabled') {
    <nav class="docs-navbar-header">
      <a mat-button routerLink="/">
        <mat-icon>tips_and_updates</mat-icon>Ngx-Workshop
      </a>
      <div class="flex-spacer"></div>
      <ngx-theme-picker></ngx-theme-picker>
    </nav>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        color: var(--mat-sys-on-primary-container);
        background-color: var(--mat-sys-primary-container);
        // box-shadow: var(--mat-sys-level5);
        .docs-navbar-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 0.5em 1em;
          mat-icon {
            font-size: 2rem;
            width: 2rem;
            height: 2rem;
            margin: 0 0.1em 0.1875em 0;
            vertical-align: middle;
          }
        }
      }
    `,
  ],
})
export class App {
  protected title = 'ngx-header-mfe';
  mode = input<StructuralOverrideMode>('full');

  constructor() {
    effect(() => {
      console.log('Effect - Mode changed to:', this.mode());
    });
  }
}

// 👇 **IMPORTANT FOR DYMANIC LOADING**
export default App;
