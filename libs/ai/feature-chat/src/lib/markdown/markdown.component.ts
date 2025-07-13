import { Component, input, ViewEncapsulation } from '@angular/core';
import { MarkdownComponent as NgxMarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'lib-chat-markdown',
  imports: [NgxMarkdownComponent],
  template: '<markdown [data]="data()" class="pokemon-markdown"></markdown>',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .pokemon-markdown {
      display: block;
      font-family: 'Press Start 2P', monospace;
      line-height: 1.8;
      color: var(--gb-darkest);
      font-size: 9px;
    }

    .pokemon-markdown h1,
    .pokemon-markdown h2,
    .pokemon-markdown h3,
    .pokemon-markdown h4,
    .pokemon-markdown h5,
    .pokemon-markdown h6 {
      font-weight: normal;
      margin: 1em 0 0.5em;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .pokemon-markdown h1 {
      font-size: 12px;
      border-bottom: 3px solid var(--gb-dark);
      padding-bottom: 4px;
    }

    .pokemon-markdown h2 {
      font-size: 10px;
      border-bottom: 2px solid var(--gb-medium);
      padding-bottom: 2px;
    }

    .pokemon-markdown h3,
    .pokemon-markdown h4,
    .pokemon-markdown h5,
    .pokemon-markdown h6 {
      font-size: 9px;
    }

    .pokemon-markdown p {
      margin: 0.5em 0;
    }

    .pokemon-markdown strong {
      color: var(--gb-dark);
      text-transform: uppercase;
    }

    .pokemon-markdown em {
      font-style: normal;
      color: var(--gb-dark);
      text-decoration: underline;
      text-decoration-style: dotted;
    }

    .pokemon-markdown a {
      color: var(--gb-dark);
      text-decoration: underline;
      text-decoration-style: dashed;
    }

    .pokemon-markdown a:hover {
      background-color: var(--gb-dark);
      color: var(--gb-lightest);
      text-decoration: none;
    }

    .pokemon-markdown ul,
    .pokemon-markdown ol {
      margin: 0.5em 0;
      padding-left: 1.5em;
    }

    .pokemon-markdown ul {
      list-style: none;
    }

    .pokemon-markdown ul li:before {
      content: '▸ ';
      position: absolute;
      margin-left: -1.5em;
    }

    .pokemon-markdown ol {
      list-style: none;
      counter-reset: pokemon-list;
    }

    .pokemon-markdown ol li {
      counter-increment: pokemon-list;
    }

    .pokemon-markdown ol li:before {
      content: counter(pokemon-list) '. ';
      position: absolute;
      margin-left: -2em;
    }

    .pokemon-markdown li {
      margin: 0.5em 0;
      position: relative;
    }

    .pokemon-markdown blockquote {
      margin: 0.5em 0;
      padding: 0.5em 1em;
      background-color: rgba(0, 0, 0, 0.05);
      border-left: 4px solid var(--gb-dark);
      font-size: 8px;
    }

    .pokemon-markdown code {
      font-family: 'Press Start 2P', monospace;
      background-color: var(--gb-medium);
      padding: 0.2em 0.4em;
      font-size: 8px;
      color: var(--gb-darkest);
    }

    .pokemon-markdown pre {
      background-color: var(--gb-medium);
      padding: 8px;
      border: 2px solid var(--gb-dark);
      overflow-x: auto;
      margin: 0.5em 0;
    }

    .pokemon-markdown pre code {
      background-color: transparent;
      padding: 0;
    }

    .pokemon-markdown table {
      width: 100%;
      border-collapse: collapse;
      margin: 0.5em 0;
      font-size: 8px;
    }

    .pokemon-markdown th,
    .pokemon-markdown td {
      border: 2px solid var(--gb-dark);
      padding: 4px 8px;
      text-align: left;
    }

    .pokemon-markdown th {
      background-color: var(--gb-dark);
      color: var(--gb-lightest);
      text-transform: uppercase;
    }

    .pokemon-markdown tr:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.05);
    }

    .pokemon-markdown hr {
      border: none;
      border-top: 3px solid var(--gb-dark);
      margin: 1em 0;
    }

    .pokemon-markdown :first-child {
      margin-top: 0;
    }

    .pokemon-markdown :last-child {
      margin-bottom: 0;
    }

    /* Animations for streaming text effect */
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .pokemon-markdown.streaming::after {
      content: '█';
      animation: blink 1s infinite;
      color: var(--gb-dark);
    }
  `,
})
export class ChatMarkdownComponent {
  data = input<string>('');
}
