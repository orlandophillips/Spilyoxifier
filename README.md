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
