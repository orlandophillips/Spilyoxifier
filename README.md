# Spilyoxifier ![buildpassing](https://img.shields.io/badge/build-passing-brightgreen?style=flat) [![StarusonGitHub](https://img.shields.io/badge/Star_us_on_GitHub-blue?style=flat&logo=github)](https://github.com/orlandophillips/Spilyoxifier) [![GitHubrelease](https://img.shields.io/github/v/release/orlandophillips/Spilyoxifier)](https://github.com/orlandophillips/Spilyoxifier/releases) [![GitHubissues](https://img.shields.io/github/issues/orlandophillips/Spilyoxifier)](https://github.com/orlandophillips/Spilyoxifier/issues)

Spilyoxifier allows you to modify the Spicy Lyrics build or source file to inject a proxy for API access. This is especially useful for middleware integration or evading censorship by automated web filtering networks (such as FortiNet).

## Installation

Spilyoxifier features a CLI interface available as an npm package. Install it globally or locally via your terminal:

```console
npm install spilyoxifier
```

## Usage

The CLI application accepts two main parameters:

```console
spilyoxifier --proxy "https://example.com"
```

or specify a target file:

```console
spilyoxifier --file "./spicy-lyrics.mjs"
```

### Combined & Shorthand Commands
Both arguments can be combined to patch your Spicy Lyrics build directly without triggering the interactive terminal fallback. You can also use the shorthand alias **`spx`**:

```console
spx --proxy "https://example.com" --file "./spicy-lyrics.mjs"
```

To see all available flags and options, run:
```console
spx --help
```

## Build Configuration

To build all binaries from source, you can use the following command:

```console
bun run build
```

This will put all Linux, macOS, and Windows binaries in the `dist` folder. 

If you want to build the source for a specific target binary, you can run the corresponding command below:

### Linux (64-bit)
```console
bun build ./bin/spilyoxifier.js --compile --target=bun-linux-x64 --outfile ./dist/spilyoxifier-linux
```

### macOS (Apple Silicon M1/M2/M3/M4)
```console
bun build ./bin/spilyoxifier.js --compile --target=bun-darwin-arm64 --outfile ./dist/spilyoxifier-macos-arm
```

### macOS (Intel Processors)
```console
bun build ./bin/spilyoxifier.js --compile --target=bun-darwin-x64 --outfile ./dist/spilyoxifier-macos-intel
```

### Windows (64-bit)
```console
bun build ./bin/spilyoxifier.js --compile --target=bun-windows-x64 --outfile ./dist/spilyoxifier-windows.exe
```

## Proxy Support

Spilyoxifier currently only supports **cors-anywhere** instances or any custom HTTP proxy endpoint that routes directly to the SpicyLyrics API (e.g., `https://example.com`).

### Setting Up a Quick Proxy
If you do not have a proxy set up, you can deploy a local reverse proxy using the [cors-anywhere](https://github.com/Rob--W/cors-anywhere) package:

**For Linux / macOS:**
```console
npm init -y
npm install cors-anywhere
touch proxy.js
```

**For Windows:**
```console
npm init -y
npm install cors-anywhere
notepad proxy.js
```

Open `proxy.js`, paste the basic server initialization example from the [cors-anywhere](https://github.com/Rob--W/cors-anywhere) GitHub repository, save the file, and boot it up:

```console
node proxy.js
```

## System Support

* **Package Managers**: Currently supports npm installations.
* **Source Archives**: Source releases support Linux, MacOS and Windows (v1.0.1 onwards) 

## Contributing & Credits

* **orlandophillips** — Owner and Lead Maintainer

If you want to modify the source or suggest changes, please open an issue or submit a Pull Request. 

*Note: We do not accept PRs submitted directly to the `main` branch. Please target your pull requests to the `staged` branch for review.*

***

© Copyright 2026 - Spilyoxifier
