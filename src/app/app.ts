import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import type {
  MfeRemoteDto,
  StructuralOverrideMode,
} from '@tmdjr/ngx-mfe-orchestrator-contracts';
import { NgxNavigationalListService } from '@tmdjr/ngx-navigational-list';
import { NgxThemePicker } from '@tmdjr/ngx-theme-picker';
import { filter, map } from 'rxjs';

@Component({
  selector: 'ngx-header-mfe',
  imports: [MatIcon, MatButtonModule, NgxThemePicker, RouterLink, AsyncPipe],
  template: `
    @if(mode() != 'disabled') {
    <nav class="docs-navbar-header">
      @if(viewModel$ | async; as userJourneyRemotes) {
      <a mat-button routerLink="/">
        <mat-icon>tips_and_updates</mat-icon>Ngx-Workshop
      </a>

      @for (remote of userJourneyRemotes; track $index) {
      <a mat-button [routerLink]="[remote.routeUrl]">
        {{ remote.name }}
      </a>
      }
      <div class="flex-spacer"></div>
      <ngx-theme-picker></ngx-theme-picker>
      }
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
  mode = input<StructuralOverrideMode>('disabled');

  constructor() {
    effect(() => {
      console.log('Header mode', this.mode());
    });
  }

  viewModel$ = inject(NgxNavigationalListService).userJourneyRemotes$.pipe(
    filter(
      (remotes): remotes is MfeRemoteDto[] =>
        Array.isArray(remotes) && remotes.length > 0
    ),
    map((remotes) =>
      remotes.map((remote) => ({
        routeUrl: this.toSlug(remote.name),
        ...remote,
      }))
    )
  );
  toSlug(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, '-');
  }
}

// 👇 **IMPORTANT FOR DYMANIC LOADING**
export default App;
