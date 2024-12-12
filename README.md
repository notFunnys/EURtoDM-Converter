# Currency to DM Conversion Browser Addon

This JavaScript addon converts EUR (or €) prices found in text content into Deutsche Mark (DM) and rounds them to attractive values (e.g., `x.99` or `x.49`).

## Features

- **Currency Conversion**: Converts EUR to DM using a fixed conversion rate (1.99 DM = 1.95583 DM).
- **Attractive Rounding**: Rounds the converted prices to `x.99` or `x.49` for a more appealing look.
- **DOM Integration**: Automatically scans and updates the entire document, including dynamically loaded content, using `MutationObserver`.

## Code Overview

### `replaceTextContent(node)`

Recursively scans the DOM for text nodes containing EUR or € prices and replaces them with the rounded DM price.

### `getAttractivePrice(normalizedValue)`

Converts EUR to DM and rounds the result to the nearest `x.99` or `x.49`.

### `MutationObserver`

Listens for changes in the DOM (e.g., dynamically added content) and processes new nodes as they appear.
