import { AsyncPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import type { StructuralOverrideMode } from '@tmdjr/ngx-mfe-orchestrator-contracts';
import { NgxNavigationalListService } from '@tmdjr/ngx-navigational-list';
import { NgxThemePicker } from '@tmdjr/ngx-theme-picker';

@Component({
  selector: 'ngx-header-mfe',
  imports: [
    MatIcon,
    MatButtonModule,
    MatMenuModule,
    NgxThemePicker,
    RouterLink,
    AsyncPipe,
  ],
  template: `
    @if(mode() && mode() != 'disabled') {
    <nav class="docs-navbar-header">
      @if(viewModel$ | async; as hierarchicalMenuItems) {
      <a mat-button routerLink="/">
        <mat-icon>tips_and_updates</mat-icon>Ngx-Workshop
      </a>

      @for(menuItem of hierarchicalMenuItems; track $index) {
      @if(menuItem.children && menuItem.children.length > 0) {
      <button mat-button [matMenuTriggerFor]="menuItemMenu$index">
        {{ menuItem.menuItemText }}
      </button>
      <mat-menu #menuItemMenu$index="matMenu">
        @for (child of menuItem.children; track $index) {
        <button mat-menu-item [routerLink]="['/', child.routeUrl]">
          {{ child.menuItemText }}
        </button>
        }
      </mat-menu>
      } @else {
      <a mat-button [routerLink]="['/', menuItem.routeUrl]">
        {{ menuItem.menuItemText }}
      </a>
      } }
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

  viewModel$ = inject(NgxNavigationalListService)
    .getFilteredNavigationBySubtypeAndState('HEADER', 'FULL')
    .pipe();
}

// 👇 **IMPORTANT FOR DYMANIC LOADING**
export default App;
