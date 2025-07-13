import { Component, input } from '@angular/core';
import { RenderMessageComponent } from '@hashbrownai/angular';

@Component({
  selector: 'lib-messages',
  imports: [RenderMessageComponent],
  template: `
    <div class="messages-container">
      @for (message of messages(); track message.id) {
      <div
        class="message"
        [class.user]="message.role === 'user'"
        [class.assistant]="message.role === 'assistant'"
      >
        <div class="message-role">
          {{ message.role === 'user' ? 'TRAINER' : 'BILL' }}
        </div>
        <div class="message-content">
          @if (message.role === 'user') {
          {{ message.content }}
          } @else if (message.role === 'assistant') { @if (message.content) {
          {{ message.content }}
          } @if (message.ui) {
          <hb-render-message [message]="message" />
          } }
        </div>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .messages-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        height: 100%;
        overflow-y: auto;
        padding-right: 8px;
      }

      .message {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 12px;
        border: 4px solid var(--gb-darkest);
        background-color: var(--gb-lightest);
        position: relative;

        &.user {
          margin-left: 20%;
          background-color: var(--gb-light);

          &::before {
            content: '>';
            position: absolute;
            left: -20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 16px;
            color: var(--gb-darkest);
          }
        }

        &.assistant {
          margin-right: 20%;
          background-color: var(--gb-lightest);
        }
      }

      .message-role {
        font-weight: bold;
        font-size: 10px;
        color: var(--gb-dark);
        letter-spacing: 1px;
        margin-bottom: 4px;
      }

      .message-content {
        font-size: 10px;
        line-height: 1.6;
        color: var(--gb-darkest);

        :deep(p) {
          margin: 0 0 8px 0;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .component-container {
        margin-top: 8px;
        padding: 8px;
        background: rgba(0, 0, 0, 0.05);
        border: 2px solid var(--gb-dark);
      }
    `,
  ],
})
export class MessagesComponent {
  messages = input<any[]>([]);
}
