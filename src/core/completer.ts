/**
 * Автодополнение команд (Tab).
 *
 * Логика:
 *   1. Первое слово — имя команды. Ищем по префиксу в реестре.
 *   2. Второе слово — подкоманда. Извлекаем из `examples` команды.
 *   3. Третье и дальше — не подсказываем.
 *
 * Пример:
 *   complete('ca')      → [{ value: 'card', hint: 'Управление картами' }]
 *   complete('card l')  → [{ value: 'list' }]
 */

import type { Registry } from './registry';

/** Одна подсказка. */
export interface Completion {
  /** Что вставить. */
  value: string;

  /** Подсказка справа (описание). */
  hint?: string;
}

export class Completer {
  constructor(private registry: Registry) {}

  /** Получить подсказки для текущего ввода. */
  complete(input: string): Completion[] {
    const tokens = input.split(/\s+/);
    const current = tokens[tokens.length - 1] || '';

    // 1. Первое слово — имя команды
    if (tokens.length === 1) {
      return this.registry
        .search(current)
        .map((cmd) => ({ value: cmd.name, hint: cmd.description }));
    }

    // 2. Второе слово — подкоманды (из examples)
    if (tokens.length === 2) {
      const cmd = this.registry.get(tokens[0]);
      if (!cmd?.examples) return [];

      const actions = new Set<string>();
      for (const example of cmd.examples) {
        const parts = example.split(/\s+/);
        if (parts[1]) actions.add(parts[1]);
      }

      return Array.from(actions)
        .filter((a) => a.startsWith(current))
        .map((a) => ({ value: a }));
    }

    return [];
  }

  /** Применить подсказку к строке ввода. */
  apply(input: string, completion: Completion): string {
    const tokens = input.split(/\s+/);

    if (tokens.length === 1) {
      return completion.value + ' ';
    }

    tokens[tokens.length - 1] = completion.value;
    return tokens.join(' ') + ' ';
  }
}
