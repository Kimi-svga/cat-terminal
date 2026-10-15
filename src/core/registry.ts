/**
 * Реестр команд терминала.
 *
 * Хранит команды в Map по имени. Позволяет:
 *   - регистрировать команды,
 *   - получать по имени,
 *   - получать список всех,
 *   - искать по префиксу (для автодополнения).
 *
 * Каждая команда — объект `Command` из `../types/command`.
 */

import type { Command } from '../types/command';

export class Registry {
  private commands = new Map<string, Command>();

  /** Зарегистрировать одну команду. */
  register(command: Command): void {
    this.commands.set(command.name, command);
  }

  /** Зарегистрировать несколько команд сразу. */
  registerAll(commands: Command[]): void {
    for (const cmd of commands) {
      this.register(cmd);
    }
  }

  /** Получить команду по имени. */
  get(name: string): Command | undefined {
    return this.commands.get(name);
  }

  /** Есть ли команда с таким именем. */
  has(name: string): boolean {
    return this.commands.has(name);
  }

  /** Все команды. */
  all(): Command[] {
    return Array.from(this.commands.values());
  }

  /** Имена всех команд (отсортированы). */
  names(): string[] {
    return Array.from(this.commands.keys()).sort();
  }

  /** Поиск команд по префиксу — для автодополнения. */
  search(prefix: string): Command[] {
    return this.all().filter((cmd) => cmd.name.startsWith(prefix));
  }
}
