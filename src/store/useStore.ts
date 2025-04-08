import { create } from 'zustand';
import { ImageSlice, createImageSlice } from './slices/imageSlice';
import { TextSlice, createTextSlice } from './slices/textSlice';

export const useStore = create<ImageSlice & TextSlice>()((...args) => ({
  ...createImageSlice(...args),
  ...createTextSlice(...args),
}));
