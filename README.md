# Cascade

Cascade is a browser-based Draw One Klondike solitaire game. Build four suit foundations from Ace to King, arrange tableau columns in descending alternating colors, and send every card home to trigger the card-launching victory cascade.

## Run it

```sh
npm ci
npm run dev
```

For a production build, run `npm run build`; the static site is emitted to `dist/`. `npm run preview` serves that build locally.

## Controls

Click or touch a card to pick it up, drag it to a legal pile, and release. Click the stock to draw one card. Double-click a playable card to send it to its foundation. The title screen and HUD can also be operated with Up/W, Down/S, Enter/Space, and Escape.

The HUD offers a fresh deal, a return to the menu, and sound muting. A click during the victory cascade starts a new game.
