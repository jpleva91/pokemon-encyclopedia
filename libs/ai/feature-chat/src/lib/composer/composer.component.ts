import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-composer',
  imports: [FormsModule],
  template: `
    <div class="composer-container">
      <form (ngSubmit)="handleSubmit()" class="composer-form">
        <input
          type="text"
          [(ngModel)]="message"
          name="message"
          placeholder="> Enter command..."
          class="composer-input"
          [disabled]="isSubmitting"
        />
        <button
          type="submit"
          class="composer-button retro-btn"
          [disabled]="!message.trim() || isSubmitting"
        >
          @if (isSubmitting) {
          <span class="blink">...</span>
          } @else { SEND }
        </button>
      </form>

      <div class="example-queries">
        <span class="examples-label">TRY:</span>
        @for (example of exampleQueries; track example) {
        <button
          type="button"
          class="example-button"
          (click)="setMessage(example)"
        >
          {{ example }}
        </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .composer-container {
        padding: 16px;
        background: rgba(0, 0, 0, 0.05);
      }

      .composer-form {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }

      .composer-input {
        flex: 1;
        font-family: 'Press Start 2P', monospace;
        font-size: 10px;
        padding: 12px;
        border: 4px solid var(--gb-darkest);
        background-color: var(--gb-lightest);
        color: var(--gb-darkest);

        &::placeholder {
          color: var(--gb-medium);
        }

        &:focus {
          outline: none;
          background-color: white;
          box-shadow: 0 0 0 2px var(--gb-medium);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }

      .composer-button {
        min-width: 80px;
        font-size: 10px;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
      }

      .example-queries {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .examples-label {
        font-size: 10px;
        color: var(--gb-dark);
        font-weight: bold;
      }

      .example-button {
        padding: 6px 10px;
        background: var(--gb-light);
        border: 2px solid var(--gb-darkest);
        font-family: 'Press Start 2P', monospace;
        font-size: 8px;
        cursor: pointer;
        transition: all 0.1s;

        &:hover {
          background: var(--gb-medium);
          transform: translate(-1px, -1px);
          box-shadow: 2px 2px 0 var(--gb-darkest);
        }

        &:active {
          transform: translate(0, 0);
          box-shadow: none;
        }
      }
    `,
  ],
})
export class ComposerComponent {
  sendMessage = output<string>();

  message = '';
  isSubmitting = false;

  exampleQueries = [
    'Show Pikachu',
    'Fire types',
    'Compare Charizard and Blastoise',
    'Top attack Pokemon',
  ];

  handleSubmit() {
    if (this.message.trim() && !this.isSubmitting) {
      this.isSubmitting = true;
      this.sendMessage.emit(this.message);
      this.message = '';

      // Reset submitting state after a delay
      setTimeout(() => {
        this.isSubmitting = false;
      }, 1000);
    }
  }

  setMessage(example: string) {
    this.message = example;
  }
}
