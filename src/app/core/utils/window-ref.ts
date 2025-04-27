import { InjectionToken } from '@angular/core';

export type WindowRef = Window & typeof globalThis;
export const WINDOW_REF = new InjectionToken<WindowRef>('WINDOW_REF', {
  factory: (): WindowRef => globalThis as WindowRef,
});
