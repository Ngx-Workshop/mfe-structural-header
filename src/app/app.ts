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
        <mat-icon class="logo">tips_and_updates</mat-icon>Ngx-Workshop
      </a>

      @for(menuItem of hierarchicalMenuItems; track $index) {
      @if(menuItem.children && menuItem.children.length > 0) {
      <a mat-button [matMenuTriggerFor]="menuItemMenu$index">
        <mat-icon>{{ menuItem.headerSvgPath }}</mat-icon>
        {{ menuItem.menuItemText }}
      </a>
      <mat-menu #menuItemMenu$index="matMenu" class="dense-menu">
        @for (child of menuItem.children; track $index) {
        <button mat-menu-item [routerLink]="['/', child.routeUrl]">
          <mat-icon>{{ child.headerSvgPath }}</mat-icon>
          {{ child.menuItemText }}
        </button>
        }
      </mat-menu>
      } @else {
      <a mat-button [routerLink]="['/', menuItem.routeUrl]">
        <mat-icon>{{ menuItem.headerSvgPath }}</mat-icon>
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
      // ::ng-deep .dense-menu .mat-mdc-menu-item {
      // min-height: 40px;
      // padding: 8px;
      // }
      ::ng-deep .dense-menu .mat-mdc-menu-content {
        min-width: 200px;
      }
      :host {
        display: block;
        color: var(--mat-sys-on-primary-container);
        background-color: var(--mat-sys-primary-container);
        .docs-navbar-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 0.5em 1em;
          box-shadow: var(--mat-sys-level5);
          mat-icon.logo {
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
  role = input<'admin' | 'publisher' | 'regular'>('regular');
  mode = input<StructuralOverrideMode>('disabled');

  viewModel$ = inject(NgxNavigationalListService)
    .getFilteredNavigationBySubtypeAndState('HEADER', 'FULL')
    .pipe();
}

// 👇 **IMPORTANT FOR DYMANIC LOADING**
export default App;
