/**
 * cat-terminal — Terminal engine for Telegram Mini Apps.
 *
 * Public API.
 *
 * Всё, что экспортируется здесь, доступно потребителю пакета.
 * Всё, что не экспортируется — внутренние детали.
 *
 * Usage:
 *   import { Terminal, Result } from 'cat-terminal';
 *   import type { Command, CommandResult } from 'cat-terminal';
 *   import 'cat-terminal/styles.css';
 */

// ─────────────────────────────────────────────
// CORE · Terminal
// ─────────────────────────────────────────────

export { Terminal } from './core/terminal';
export type { TerminalOptions, TerminalContext } from './core/terminal';

// ─────────────────────────────────────────────
// CORE · Engine
// ─────────────────────────────────────────────

export { Registry } from './core/registry';
export { Renderer } from './core/renderer';
export { Executor } from './core/executor';
export { Completer } from './core/completer';
export type { Completion } from './core/completer';

// ─────────────────────────────────────────────
// CORE · Parser
// ─────────────────────────────────────────────

export {
  parse,
  tokenize,
  splitPipeline,
  parseFlags,
} from './core/parser';
export type { ParsedCommand } from './core/parser';

// ─────────────────────────────────────────────
// CORE · History
// ─────────────────────────────────────────────

export { History } from './core/history';
export { HistoryModal } from './core/history-modal';

// ─────────────────────────────────────────────
// CORE · Input
// ─────────────────────────────────────────────

export { Keybindings } from './core/keybindings';
export type { KeybindingsHandlers } from './core/keybindings';

export { Keypad } from './core/keypad';
export type { KeypadAction } from './core/keypad';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type { Command, CommandContext } from './types/command';

export { Result } from './types/result';
export type { CommandResult } from './types/result'; 
