# Primary-ish Warm

A warm, paper-like VS Code theme with optional soft 3D/custom CSS effects.

This project is inspired by the general design direction of [Primary for Obsidian](https://github.com/primary-theme/obsidian): warm paper surfaces, restrained contrast, soft functional colors, and a slightly nostalgic interface. It is **not** a direct port and does not copy Primary's CSS implementation.

## Themes

- **Primary-ish Warm Light** — cream paper background, warm sidebar surfaces, red/orange accents.
- **Primary-ish Warm Dark** — low-contrast dark brown background, parchment text, muted semantic colors.

## Optional UI effects

VS Code's normal theme API cannot add real layout effects such as transforms, blur, shadows, or animations. For that layer, this repo includes:

```txt
custom-css/primary-ish-effects.css
```

You can use it with tools such as APC or Custom CSS and JS Loader. This is intentionally optional because custom CSS selectors can break after VS Code updates.

## Local development

```bash
npm install
npm run package
code --install-extension primary-ish-vscode-0.1.0.vsix
```

## Publishing

```bash
npm install
npx @vscode/vsce login GreatGesture
npm run publish:marketplace
```

For Open VSX:

```bash
npx ovsx publish
```

## License

MIT.

## Attribution note

This is a new VS Code theme inspired by the aesthetic direction of Primary for Obsidian. It does not include copied Primary CSS, assets, or source files.
