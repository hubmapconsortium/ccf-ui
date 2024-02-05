import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { DecoratedRange, normalize } from './decorated-range';

// Reexport DecoratedRange
export { DecoratedRange };

/** A segment of text with additional classes and styles */
interface Segment {
  /** The piece of text to display */
  text: string;
  /** Classes to add to the text container */
  classes: string[];
  /** Styles to set on the text container */
  styles: Record<string, unknown>;
}

/** Represents an operation to apply to the stack when building segments */
interface StackOp {
  /** Text index at which the changes takes effect */
  index: number;
  /** Decorations to add */
  added: DecoratedRange[];
  /** Decorations to remove */
  removed: DecoratedRange[];
}

/**
 * Class to display text with additional styling on ranges of the text.
 */
@Component({
  selector: 'ccf-decorated-text',
  templateUrl: './decorated-text.component.html',
  styleUrls: ['./decorated-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecoratedTextComponent implements OnChanges {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-decorated-text';

  /**
   * Text to display
   */
  @Input() text!: string;

  /**
   * Classes and styles to apply to ranges of the text.
   * For overlapping ranges later values takes precedence.
   */
  @Input() decorations?: Partial<DecoratedRange>[];

  /**
   * Computed segments of text with decorations resolved.
   */
  segments: Segment[] = [];

  /**
   * Apply changes and recalculate cached values.
   *
   * @param changes Instance properties that have changed
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('text' in changes || 'decorations' in changes) {
      this.segments = this.createSegments();
    }
  }

  /**
   * Creates an array of decorated text segments based on
   * the latest text and decorations.
   *
   * @returns The new segments
   */
  private createSegments(): Segment[] {
    const { text } = this;
    if (!text) {
      // No styling can be applied to empty text fields
      return [this.makeUndecoratedSegment(text)];
    }

    const decorations = this.getNormalizedDecorations();
    if (decorations.length === 0) {
      // No styling available
      return [this.makeUndecoratedSegment(text)];
    }

    const stackOps = this.createStackOps(decorations);
    const segments: Segment[] = [];
    let stack: DecoratedRange[] = [];
    let lastIndex = 0;

    // If the first op starts at index zero apply stack changes
    // but don't push a segment by shifing out the first op
    if (stackOps[0].index === 0) {
      stack = this.updateStack(stack, stackOps.shift() as StackOp);
    }

    // Build segments based on the stack operations
    for (const op of stackOps) {
      segments.push(
        this.makeDecoratedSegment(text.slice(lastIndex, op.index), stack)
      );

      lastIndex = op.index;
      stack = this.updateStack(stack, op);
    }

    // Push the last segment if not already done
    if (lastIndex !== text.length) {
      segments.push(this.makeDecoratedSegment(text.slice(lastIndex), stack));
    }

    return segments;
  }

  /**
   * Creates an ordered array of stack operations to apply when building segments.
   *
   * @param ranges The decorated ranges to apply
   * @returns The array of operations
   */
  private createStackOps(ranges: DecoratedRange[]): StackOp[] {
    const ops: Record<number, StackOp> = {};
    const getOp = (index: number) =>
      (ops[index] ??= { index, added: [], removed: [] });

    for (const range of ranges) {
      getOp(range.start).added.push(range);
      getOp(range.end).removed.push(range);
    }

    return Object.entries(ops)
      .sort((i1, i2) => +i1[0] - +i2[0]) // Sort by index
      .map((entry) => entry[1]);
  }

  /**
   * Applies the stack changes specified by the stack operation.
   *
   * @param stack The current stack
   * @param op The operation
   * @returns The new stack
   */
  private updateStack(stack: DecoratedRange[], op: StackOp): DecoratedRange[] {
    return (
      stack
        .filter((item) => !op.removed.includes(item))
        // Note - A new array is created by the above filter statement
        // so it is safe to modify it with concat
        .concat(op.added)
    );
  }

  /**
   * Normalizes and filters valid decorated ranges.
   *
   * @returns The normalized ranges with properties filled
   */
  private getNormalizedDecorations(): DecoratedRange[] {
    const {
      decorations = [],
      text: { length },
    } = this;
    return (
      decorations
        // Turn partials into full objects
        .map((range) => normalize(range, length))
        // Remove empty and out of bounds ranges
        .filter((range) => range.start < length && range.start < range.end)
    );
  }

  /**
   * Creates a segment without any decoration
   *
   * @param text The text for the segment
   * @returns A segment without any decoration
   */
  private makeUndecoratedSegment(text: string): Segment {
    return { text, classes: [], styles: {} };
  }

  /**
   * Creates a segment with decoration
   *
   * @param text The text for the segment
   * @param decorations Decorations for this segment
   * @returns A decorated segment
   */
  private makeDecoratedSegment(
    text: string,
    decorations: DecoratedRange[]
  ): Segment {
    const classes = decorations.reduce<string[]>(
      (result, range) => result.concat(range.classes),
      []
    );
    const styles = decorations.reduce(
      (result, range) => ({ ...result, ...range.styles }),
      {}
    );

    return { text, classes, styles };
  }
}
