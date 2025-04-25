// src/domain/value-objects/gradient.ts
import { Color } from '../services/image.service';

export class Gradient {
  constructor(private readonly from: Color, private readonly to: Color) {}

  toString(): string {
    return `from-${this.from} to-${this.to}`;
  }

  static fromString(value: string): Gradient {
    const match = value.match(/from-([^\s]+)\s+to-([^\s]+)/);
    if (!match) {
      throw new Error('Invalid gradient format');
    }

    return new Gradient(new Color(match[1]), new Color(match[2]));
  }
}
