/**
 * Типы команд терминала.
 *
 * `Command` — что описывает команду.
 * `CommandContext` — что получает команда при выполнении.
 */

import type { CommandResult } from './result';

/**
 * Контекст выполнения команды.
 *
 * Что доступно внутри `run()`:
 *   ctx.args   — аргументы (без флагов)
 *   ctx.flags  — флаги (--key=value или --key)
 *   ctx.input  — результат предыдущей команды в пайпе
 *   ctx.repo   — репозиторий данных
 *   ctx.print  — вывод в терминал
 *   ctx.user   — текущий пользователь
 */
export interface CommandContext {
  /** Аргументы (без флагов). */
  args: string[];

  /** Флаги (--key=value или --key). */
  flags: Record<string, string | true>;

  /** Вход из пайпа (результат предыдущей команды). */
  input: CommandResult | null;

  /** Репозиторий данных (передаётся потребителем). */
  repo: unknown;

  /** Вывод в терминал (сырой HTML). */
  print: (html: string) => void;

  /** Текущий пользователь. */
  user: {
    telegramId: number;
    username: string;
    role: 'owner' | 'admin' | 'moderator' | 'helper' | 'support' | 'player';
  };
}

/**
 * Определение команды.
 *
 * Пример:
 *   const hello: Command = {
 *     name: 'hello',
 *     description: 'Say hello',
 *     usage: 'hello [--name=world]',
 *     async run(ctx) {
 *       const name = String(ctx.flags.name ?? ctx.user.username);
 *       return Result.success(`Hello, ${name}!`);
 *     },
 *   };
 */
export interface Command {
  /** Имя команды (без пробелов, латиница). */
  name: string;

  /** Короткое описание для `help`. */
  description: string;

  /** Строка использования. Показывается в `help <command>`. */
  usage?: string;

  /** Примеры. Показываются в `help <command>`. */
  examples?: string[];

  /** Минимальная роль. Если не указана — доступна всем. */
  permission?: 'owner' | 'admin' | 'moderator' | 'helper' | 'support' | 'player';

  /** Обработчик. Вызывается при выполнении. */
  run: (ctx: CommandContext) => Promise<CommandResult>;
} 
