import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2
  ) {}

  switchTheme(val: boolean) {
    const darkMode = val ? "theme-light" : "theme-dark";
    this.render.setAttribute(this.document.body, 'class', darkMode);
  }
}
