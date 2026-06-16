# Spilyoxifier ![buildpassing](https://img.shields.io/badge/build-passing-brightgreen?style=flat) [![StarusonGitHub](https://img.shields.io/badge/Star_us_on_GitHub-blue?style=flat&logo=github)](https://github.com/orlandophillips/Spilyoxifier) [![GitHubrelease](https://img.shields.io/github/v/release/orlandophillips/Spilyoxifier)](https://github.com/orlandophillips/Spilyoxifier/releases) [![GitHubissues](https://img.shields.io/github/issues/orlandophillips/Spilyoxifier)](https://github.com/orlandophillips/Spilyoxifier/issues)

Spilyoxifier allows you to modify Spicy Lyrics build or source and add a proxy to access the API, especially useful for middleware or evading censorship by automated web filtering tools such as FortiNet.

## Installation
It uses a CLI Interface which can be installed via npm. To do so, enter the following into your terminal with npm installed:

```console
npm install Spilyoxifier
```

## Usage
To use the CLI App, it has two parameters:
```console
spilyoxifier --proxy "https://example.com"
```
or:
```console
spilyoxifier --file "./spicy-lyrics.mjs"
```
Both these can be combined to add the proxy to your build of Spicy Lyrics without the interactive terminal fallback. For shorthand operations, you can use the alias:

```console
spx [params]
```

## Proxy Support

Spilyoxifier currently only supports cors-anywhere instances or any custom HTTP proxy endpoint that routes directly to the SpicyLyrics API (e.g., https://example.com/api.spicylyrics.org)

If you don't know how to setup your own proxy refer to the [cors-anywhere](https://github.com/Rob--W/cors-anywhere) GitHub page and use the example setup. To setup your environment, install the cors-anywhere npm module and setup a normal Node.js workspace. For linux do:

```console
npm install cors-anywhere
npm init -y
touch proxy.js # Or for Windows use: notepad proxy.js
```

Open proxy.js and paste the example from the [cors-anywhere](https://github.com/Rob--W/cors-anywhere) GitHub page and save it then run it:

```console
node proxy.js
```

## Support

Currently this project only supports npm or for source, releases only support .zip file extensions. Soon, I hope to make source releases available to Linux and MacOS.

## Credits

- orlandophillips - Owner and Maintainer

If you want to edit the source or propose changes, I will review future PR requests and fix issues. I won't except PRs to the main branch but only staged.

© Copyright 2026 - Spilyoxifier
