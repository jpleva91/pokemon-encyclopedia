import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonChatComponent } from '@pokemon-encyclopedia/feature-chat';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PokemonChatComponent],
  template: `
    <div class="pokedex-container">
      <div class="pokedex-frame">
        <!-- Top section with LED and title -->
        <div class="pokedex-top">
          <div class="led-container">
            <div class="led-outer">
              <div class="led-inner blink"></div>
            </div>
            <div class="small-led red"></div>
            <div class="small-led yellow"></div>
            <div class="small-led green"></div>
          </div>
        </div>

        <!-- Main screen area -->
        <div class="pokedex-screen-container">
          <div class="screen-frame">
            <div class="screen">
              <lib-pokemon-chat></lib-pokemon-chat>
            </div>
          </div>
        </div>

        <!-- Bottom controls -->
        <div class="pokedex-bottom">
          <div class="button-container">
            <button class="dpad">
              <div class="dpad-up"></div>
              <div class="dpad-right"></div>
              <div class="dpad-down"></div>
              <div class="dpad-left"></div>
              <div class="dpad-center"></div>
            </button>

            <div class="action-buttons">
              <button class="action-btn a-btn">A</button>
              <button class="action-btn b-btn">B</button>
            </div>
          </div>

          <div class="speaker-grille">
            <div class="speaker-line"></div>
            <div class="speaker-line"></div>
            <div class="speaker-line"></div>
            <div class="speaker-line"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'Bills PC - Pokémon Encyclopedia';
}
