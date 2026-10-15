/**
 * Выполнение команд с поддержкой пайпов.
 *
 * Принимает `ParsedCommand[]` — массив команд из парсера.
 * Для каждой команды:
 *   1. Ищет её в реестре.
 *   2. Вызывает `run()` с контекстом.
 *   3. Передаёт результат следующей команде через `ctx.input`.
 *
 * Возвращает результат последней команды.
 *
 * Пример:
 *   parser.parse('card list | count')
 *   →
 *   Executor выполняет card list → результат идёт в count → возвращает результат count.
 */

import type { CommandContext } from '../types/command';
import type { CommandResult } from '../types/result';
import { Result } from '../types/result';
import type { ParsedCommand } from './parser';
import type { Registry } from './registry';

export class Executor {
  constructor(private registry: Registry) {}

  /**
   * Выполнить pipeline.
   *
   * `ctx` — базовый контекст (repo, print, user) из Terminal.
   * Аргументы и флаги добавляются для каждой команды.
   */
  async execute(
    pipeline: ParsedCommand[],
    ctx: Omit<CommandContext, 'args' | 'flags' | 'input'>,
  ): Promise<CommandResult> {
    if (pipeline.length === 0) {
      return Result.empty();
    }

    let input: CommandResult | null = null;

    for (const cmd of pipeline) {
      const handler = this.registry.get(cmd.name);

      if (!handler) {
        return Result.error(`command not found: ${cmd.name}`);
      }

      try {
        input = await handler.run({
          ...ctx,
          args: cmd.args,
          flags: cmd.flags,
          input,
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return Result.error(`execution failed: ${message}`);
      }
    }

    return input ?? Result.empty();
  }
}
