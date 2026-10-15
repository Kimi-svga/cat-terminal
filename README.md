# cat-terminal

> Terminal engine that works anywhere there's a browser.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)](./package.json)
[![Live Demo](https://img.shields.io/badge/demo-live-28c840?style=flat-square)](https://kimi-svga.github.io/cat-terminal/)

**cat-terminal** is a terminal engine for browser-based applications.
Not a terminal — the engine *for* one. Command parsing, pipelines,
autocomplete, history, keybindings, mobile keypad, themes.

Built for **Telegram Mini Apps**, works in **any browser environment**.

---

## Why it works anywhere

The engine has no knowledge of:

- **Frameworks** — no React, no Vue, no Svelte. Plain DOM.
- **Network** — no fetch, no WebSocket, no API. Commands decide.
- **Data** — `ctx.repo` is `unknown`. Consumer plugs in whatever.
- **Environment** — Telegram, Discord, Slack, Electron, Tauri, extension, plain web.
- **Theme** — CSS variables. Consumer overrides `--ct-*` as needed.

If it runs in a browser — cat-terminal fits.

---

## Cat Plugin Harness

The core is small. Everything else is a plugin.

**Cat Plugin Harness** is the architecture that makes this possible:

- every command is a plain object (`Command`),
- every result is a discriminated union (`CommandResult`),
- every plugin is just an array of commands,
- consumer registers plugins via `terminal.register(...)`.

No magic. No registry of registries. No DI container.

```ts
import type { Command } from 'cat-terminal';
import { Result } from 'cat-terminal';

export const pingCommand: Command = {
  name: 'ping',
  description: 'Check connection',
  async run() {
    return Result.success('pong');
  },
};
```

That's a plugin. Fifteen lines. Register it — it works.

Want a WebSocket plugin? Write commands that talk WebSocket.
Want an HTTP plugin? Write commands that fetch.
Want a theme plugin? Ship a CSS file.

The harness doesn't care what the plugin does. It only cares
that the plugin is a Command.

---

Quick start

```bash
npm install cat-terminal
```

```ts
import { Terminal, Result } from 'cat-terminal';
import type { Command } from 'cat-terminal';
import 'cat-terminal/styles.css';

const app = document.getElementById('app')!;

const terminal = new Terminal(app, {
  prompt: 'app:~#',
  greeting: 'Welcome.',
});

const echo: Command = {
  name: 'echo',
  description: 'Print arguments',
  async run(ctx) {
    return Result.text(ctx.args.join(' '));
  },
};

terminal.register(echo);
```

Three steps. Works.

---

Live demo

kimi-svga.github.io/cat-terminal

Opens in any browser. Try:

· help — list commands
· status — key-value output
· ping — success result
· json — JSON output
· pi + Tab — autocomplete
· ↑ — command history

On mobile — keypad at the bottom replaces Ctrl/Tab/arrows.

---

Features

· Command parser — quotes, escapes, pipes, flags
· Pipelines — cmd1 | cmd2 with ctx.input

· Tab autocomplete — commands and subcommands

· History — ↑/↓, Ctrl+R, localStorage

· Keybindings — Ctrl+A/E/U/K/W/L, Tab, Escape

· Mobile keypad — sticky Ctrl modifier, long-press for history

· Discriminated union results — text, kv, table, json, box, error, success, warn, raw

· Themes — CSS variables, no rebuild

· Zero runtime dependencies

---

Where to use it



· Telegram Mini Apps — admin panels, dev tools, easter eggs

· Discord Activities — embedded apps with terminal UI

· Slack / Teams apps — internal tools

· Electron / Tauri — desktop apps with CLI interface

· Browser extensions — dev tools panel

· Plain web apps — anything that needs a command palette

---

Philosophy

Small core. Everything is a plugin.

The engine does three things:

1. Parse input into commands.
2. Execute commands with a context.
3. Render results into HTML.

Everything else — repo, user, print, theme, commands — comes from outside.

This is why cat-terminal works in Mini Apps, Discord, Slack, Electron,
and any other place where there's a browser. It doesn't know where it is.
It just knows how to run commands.

---

Design

By Expo.

License

MIT. 
