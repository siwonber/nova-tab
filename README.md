# Nova Tab

Firefox new tab extension as a starting point for a Tabliss-like but more modular dashboard.

## Goal

Nova Tab replaces the default new tab page and provides a base for:

- widgets with a clean registry
- future drag-and-drop layout logic
- themes and backgrounds
- local persistence through Firefox `storage.local`
- import/export and future integrations

## Start

```bash
npm install
npm run build
```

Then in Firefox:

1. Open `about:debugging`
2. Select `This Firefox`
3. Click `Load Temporary Add-on`
4. Choose `dist/manifest.json`

## Current Status

- new tab override through the manifest
- React frontend with a modular structure
- three initial widgets: time, focus, quick links
- persistent base settings

## Next Logical Steps

- widget editor and real widget configurations
- drag-and-drop layout
- weather, calendar, todo, notes
- image and video backgrounds
- import/export for dashboard setups
