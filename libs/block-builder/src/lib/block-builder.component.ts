import { Component, input, signal, computed, OnChanges, OnDestroy } from '@angular/core';
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
export class BlockBuilderComponent implements OnChanges, OnDestroy {
  readonly data = input.required<Record<string, unknown>>();
  readonly challengeEnabled = input(false);
  readonly challengeDelayMs = input(60000);

  readonly flatData = signal<FlatObject>({});
  readonly keys = computed(() => Object.keys(this.flatData()));
  readonly blocks = signal<Block[]>([]);
  readonly challengeBlockId = signal<string | null>(null);
  readonly challengeInitialKey = signal<string | null>(null);
  readonly challengeActive = computed(() => this.challengeBlockId() !== null);

  private challengeTimerId: ReturnType<typeof setTimeout> | null = null;

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

    this.resetChallenge();
    this.scheduleChallenge();
  }

  ngOnDestroy() {
    this.clearChallengeTimer();
  }

  getValue(key: string): string {
    return String(this.flatData()[key] ?? '');
  }

  updateKey(blockId: string, newKey: string) {
    this.blocks.update((blocks) => blocks.map((b) => (b.id === blockId ? { ...b, selectedKey: newKey } : b)));

    if (this.challengeBlockId() === blockId && this.challengeInitialKey() !== newKey) {
      this.resetChallenge();
      this.scheduleChallenge();
    }
  }

  removeBlock(blockId: string) {
    this.blocks.update((blocks) => blocks.filter((b) => b.id !== blockId));

    if (this.challengeBlockId() === blockId) {
      this.resetChallenge();
      this.scheduleChallenge();
    }
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

  isChallengeBlock(blockId: string): boolean {
    return this.challengeBlockId() === blockId;
  }

  private scheduleChallenge() {
    this.clearChallengeTimer();

    if (!this.challengeEnabled() || this.blocks().length === 0) {
      return;
    }

    this.challengeTimerId = setTimeout(() => {
      const blocks = this.blocks();
      if (!blocks.length) {
        return;
      }

      const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
      this.challengeBlockId.set(randomBlock.id);
      this.challengeInitialKey.set(randomBlock.selectedKey);
      this.challengeTimerId = null;
    }, this.challengeDelayMs());
  }

  private resetChallenge() {
    this.clearChallengeTimer();
    this.challengeBlockId.set(null);
    this.challengeInitialKey.set(null);
  }

  private clearChallengeTimer() {
    if (this.challengeTimerId !== null) {
      clearTimeout(this.challengeTimerId);
      this.challengeTimerId = null;
    }
  }
}
