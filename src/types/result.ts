/**
 * Типы результатов команд терминала.
 *
 * Дискриминированный union: каждая ветка имеет поле `type`,
 * по которому TS понимает, какие ещё поля доступны.
 *
 * Например, в ветке `kv` есть `data`, а в ветке `table` — `headers` и `rows`.
 */

/** Результат выполнения команды. */
export type CommandResult =
  | { type: 'text'; text: string; className?: string }
  | { type: 'kv'; data: Array<[string, string, string?]> }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'json'; data: unknown }
  | { type: 'box'; content: string; variant: 'info' | 'success' | 'error' | 'warn' }
  | { type: 'error'; message: string }
  | { type: 'success'; message: string }
  | { type: 'warn'; message: string }
  | { type: 'raw'; html: string }
  | { type: 'empty' };

/**
 * Помощники для создания результатов.
 *
 * Используй вместо ручного создания объектов — короче и безопаснее.
 *
 * Пример:
 *   return Result.success('Готово');
 *   return Result.error('Что-то не так');
 *   return Result.kv([['Баланс', '1000', 'gold']]);
 */
export const Result = {
  /** Простой текст. */
  text: (text: string, className?: string): CommandResult => ({
    type: 'text',
    text,
    className,
  }),

  /** Ключ-значение. Цвет — опциональный. */
  kv: (data: Array<[string, string, string?]>): CommandResult => ({
    type: 'kv',
    data,
  }),

  /** Таблица с заголовками и строками. */
  table: (headers: string[], rows: string[][]): CommandResult => ({
    type: 'table',
    headers,
    rows,
  }),

  /** JSON-объект. */
  json: (data: unknown): CommandResult => ({
    type: 'json',
    data,
  }),

  /** Рамка с цветом. */
  box: (
    content: string,
    variant: 'info' | 'success' | 'error' | 'warn' = 'info',
  ): CommandResult => ({
    type: 'box',
    content,
    variant,
  }),

  /** Ошибка. */
  error: (message: string): CommandResult => ({
    type: 'error',
    message,
  }),

  /** Успех. */
  success: (message: string): CommandResult => ({
    type: 'success',
    message,
  }),

  /** Предупреждение. */
  warn: (message: string): CommandResult => ({
    type: 'warn',
    message,
  }),

  /** Сырой HTML. Не экранируется. */
  raw: (html: string): CommandResult => ({
    type: 'raw',
    html,
  }),

  /** Пустой результат. */
  empty: (): CommandResult => ({ type: 'empty' }),
}; 
