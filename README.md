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

### Automatic (recommended)

Pushes to `main` publish to the [VS Marketplace](https://marketplace.visualstudio.com/) when **`version` in `package.json` changes**.

1. Create a [Personal Access Token](https://dev.azure.com/_usersSettings/tokens) with **Marketplace → Manage**.
2. In GitHub: **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `VSCE_PAT`
   - Value: your token
3. Bump `version` in `package.json`, commit, and push to `main`.

The workflow is [`.github/workflows/publish.yml`](.github/workflows/publish.yml). Pushes that do not change `version` skip publishing (Marketplace rejects duplicate versions).

### Manual

```bash
npm install
export VSCE_PAT='your-token'
npm run publish:marketplace
```

For Open VSX:

```bash
npx ovsx publish -p "$OVSX_PAT"
```

## License

MIT.

## Attribution note

This is a new VS Code theme inspired by the aesthetic direction of Primary for Obsidian. It does not include copied Primary CSS, assets, or source files.
