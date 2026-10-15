/**
 * История команд терминала.
 *
 * Хранит последние 200 команд. Поддерживает:
 *   - навигацию ↑/↓,
 *   - сохранение черновика (что было набрано до ↑),
 *   - поиск (Ctrl+R),
 *   - сохранение в localStorage.
 */

const MAX_HISTORY = 200;
const STORAGE_KEY = 'vm_history';

export class History {
  private commands: string[] = [];
  private index = -1;
  private draft = '';

  constructor() {
    this.load();
  }

  /** Добавить команду в историю. */
  push(command: string): void {
    if (!command.trim()) return;
    if (this.commands[this.commands.length - 1] === command) return;

    this.commands.push(command);

    if (this.commands.length > MAX_HISTORY) {
      this.commands.shift();
    }

    this.index = -1;
    this.save();
  }

  /** Предыдущая команда (↑). Возвращает null, если истории нет. */
  prev(current: string): string | null {
    if (this.commands.length === 0) return null;

    if (this.index === -1) {
      this.draft = current;
      this.index = this.commands.length - 1;
    } else if (this.index > 0) {
      this.index--;
    } else {
      return this.commands[this.index];
    }

    return this.commands[this.index];
  }

  /** Следующая команда (↓). Возвращает null, если index = -1. */
  next(): string | null {
    if (this.index === -1) return null;

    if (this.index < this.commands.length - 1) {
      this.index++;
      return this.commands[this.index];
    }

    this.index = -1;
    return this.draft;
  }

  /** Все команды (копия). */
  all(): string[] {
    return [...this.commands];
  }

  /** Поиск по подстроке (Ctrl+R). Возвращает последние 20. */
  search(query: string): string[] {
    if (!query) return this.all().slice(-20);
    return this.commands.filter((c) => c.includes(query)).slice(-20);
  }

  /** Очистить историю. */
  clear(): void {
    this.commands = [];
    this.index = -1;
    this.save();
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.commands));
    } catch {
      // ignore (localStorage может быть недоступен)
    }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.commands = JSON.parse(raw);
      }
    } catch {
      this.commands = [];
    }
  }
}
