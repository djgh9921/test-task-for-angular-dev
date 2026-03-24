import { Component, input, signal, computed, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatObject, Block } from './block-builder.models';
import { flattenObject } from './block-builder.utils';

@Component({
  selector: 'lib-block-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './block-builder.component.html',
  styleUrls: ['./block-builder.component.scss'],
})
export class BlockBuilderComponent implements OnChanges {
  readonly data = input.required<Record<string, unknown>>();

  readonly flatData = signal<FlatObject>({});
  readonly keys = computed(() => Object.keys(this.flatData()));
  readonly blocks = signal<Block[]>([]);

  ngOnChanges() {
    const flat = flattenObject(this.data());
    this.flatData.set(flat);

    const keys = Object.keys(flat);
    this.blocks.set(
      keys.map((key) => ({
        id: crypto.randomUUID(),
        selectedKey: key,
      })),
    );
  }

  getValue(key: string): string {
    return String(this.flatData()[key] ?? '');
  }

  updateKey(blockId: string, newKey: string) {
    this.blocks.update((blocks) => blocks.map((b) => (b.id === blockId ? { ...b, selectedKey: newKey } : b)));
  }

  removeBlock(blockId: string) {
    this.blocks.update((blocks) => blocks.filter((b) => b.id !== blockId));
  }

  addBlock() {
    const firstKey = this.keys()[0];
    if (!firstKey) return;
    this.blocks.update((blocks) => [...blocks, { id: crypto.randomUUID(), selectedKey: firstKey }]);
  }

  moveUp(index: number) {
    if (index === 0) return;
    this.blocks.update((blocks) => {
      const arr = [...blocks];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  }

  moveDown(index: number) {
    this.blocks.update((blocks) => {
      if (index === blocks.length - 1) return blocks;
      const arr = [...blocks];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
  }
}
