/**
 * Demo для cat-terminal.
 * Открывается на GitHub Pages.
 */

import '../src/styles/terminal.css';
import { Terminal, Result } from '../src/index';
import type { Command } from '../src/index';

const app = document.getElementById('app');
if (!app) throw new Error('#app not found');

// Контейнер — в стиле "терминального окна"
app.style.cssText = `
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 8px 8px 0;
  background: #0a0a0a;
  color: #e4e4e7;
  font-family: 'JetBrains Mono', monospace;
  box-sizing: border-box;
`;

const termWindow = document.createElement('div');
termWindow.className = 'term-window';
termWindow.innerHTML = `
  <div class="term-titlebar">
    <div class="term-dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <div class="term-title">cat-terminal · demo</div>
  </div>
`;
app.appendChild(termWindow);

const terminal = new Terminal(termWindow, {
  prompt: 'root@cat-terminal:~#',
  greeting: `
    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: 'Unbounded', sans-serif; font-size: 18px; font-weight: 800; letter-spacing: 1px;">
      <span style="color: #fafafa;">CAT</span><span style="color: #28c840;">TERMINAL</span>
    </div>
    <div style="font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 8px;">
      Demo build. Введи <b style="color: #f472b6;">help</b> для списка команд.
    </div>
  `,
});

// ─── Демо-команды ───

const helpCommand: Command = {
  name: 'help',
  description: 'Список команд',
  usage: 'help',
  async run(ctx) {
    const registry = (terminal as unknown as { registry: { all(): Command[] } }).registry;
    const commands = registry.all();
    return Result.table(
      ['Команда', 'Описание'],
      commands.map((c) => [c.name, c.description]),
    );
  },
};

const pingCommand: Command = {
  name: 'ping',
  description: 'Проверка связи',
  usage: 'ping',
  async run() {
    return Result.success('pong');
  },
};

const echoCommand: Command = {
  name: 'echo',
  description: 'Печатает аргументы',
  usage: 'echo <text>',
  examples: ['echo hello world', 'echo "hello world"'],
  async run(ctx) {
    return Result.text(ctx.args.join(' '));
  },
};

const kvCommand: Command = {
  name: 'status',
  description: 'Ключ-значение',
  async run() {
    return Result.kv([
      ['Status', 'OK', 'green'],
      ['Version', '0.1.0'],
      ['Uptime', '42s', 'blue'],
      ['Memory', '4.2 MB', 'gold'],
    ]);
  },
};

const boxCommand: Command = {
  name: 'warn',
  description: 'Пример предупреждения',
  async run() {
    return Result.warn('Это демонстрационное сообщение.');
  },
};

const errorCommand: Command = {
  name: 'fail',
  description: 'Пример ошибки',
  async run() {
    return Result.error('Что-то пошло не так.');
  },
};

const jsonCommand: Command = {
  name: 'json',
  description: 'Пример JSON-вывода',
  async run() {
    return Result.json({
      status: 'ok',
      version: '0.1.0',
      user: { id: 1, username: 'demo' },
    });
  },
};

const clearCommand: Command = {
  name: 'clear',
  description: 'Очистить экран',
  async run() {
    terminal.clear();
    return Result.empty();
  },
};

terminal.register(
  helpCommand,
  pingCommand,
  echoCommand,
  kvCommand,
  boxCommand,
  errorCommand,
  jsonCommand,
  clearCommand,
); 
