# Primary-ish Warm

A warm, paper-like VS Code color theme inspired by the design direction of [Primary for Obsidian](https://github.com/primary-theme/obsidian): paper surfaces, restrained contrast, soft functional colors, and a slightly nostalgic feel. It is **not** a port of Primary and does not use its CSS or assets.

![Primary-ish Warm Light](images/shotLight.png)

![Primary-ish Warm Dark](images/shotDark.png)

## Themes

- **Primary-ish Warm Light** — cream paper background, warm sidebar surfaces, red/orange accents.
- **Primary-ish Warm Dark** — low-contrast dark brown background, parchment text, muted semantic colors.

Select with `Cmd+K` then `Cmd+T`, or set in settings:

```json
"workbench.colorTheme": "Primary-ish Warm Light"
```

## Install

Search **Primary-ish Warm** in the VS Code Extensions view, or:

```bash
code --install-extension greatgesture.primary-ish-vscode
```

## Optional experimental CSS (not recommended)

The repo includes `custom-css/primary-ish-effects.css` for rounded panels and shadows. That requires patching the VS Code app (e.g. Custom CSS loaders) and is **unsupported**, **security-sensitive**, and **breaks on updates**. The published extension uses only the official color-theme API — no app patching.

## Local development

```bash
npm install
npm run package
code --install-extension primary-ish-vscode-0.1.3.vsix
```

## License

MIT.
