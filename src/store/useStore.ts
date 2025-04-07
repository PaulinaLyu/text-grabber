import { create } from 'zustand';
import { ImageSlice, createImageSlice } from './slices/imageSlice';

export const useStore = create<ImageSlice>()((...args) => ({
  ...createImageSlice(...args),
}));
