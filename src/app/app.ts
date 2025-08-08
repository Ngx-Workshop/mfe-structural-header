import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ngx-header-mfe',
  imports: [MatIcon, MatButtonModule],
  template: `
    <nav class="docs-navbar-header">
      <a mat-button routerLink="/">
        <mat-icon>tips_and_updates</mat-icon>Ngx-Workshop
      </a>
      <div class="flex-spacer"></div>
    </nav>
  `,
  styles: [
    `
      :host {
        color: var(--mat-sys-on-primary-container);
        background-color: var(--mat-sys-primary-container);
        box-shadow: var(--mat-sys-level5);
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
}

// 👇 **IMPORTANT FOR DYMANIC LOADING**
export default App;