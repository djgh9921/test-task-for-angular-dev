import { FlatObject } from './block-builder.models';

export function flattenObject(obj: Record<string, unknown>): FlatObject {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value !== 'object' || value === null) {
      acc[key] = value as string | number | boolean;
    }
    return acc;
  }, {} as FlatObject);
}
