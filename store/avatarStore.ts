import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { assistantApi } from '../api/services/assistant';

interface AvatarState {
  // Avatar state
  photos: File[];
  currentModel: string | null;
  isTraining: boolean;
  error: string | null;
  
  // Avatar configuration
  expression: string;
  animation: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  
  // Actions
  addPhotos: (newPhotos: File[]) => void;
  removePhoto: (index: number) => void;
  clearPhotos: () => void;
  setModel: (modelId: string) => void;
  trainAvatar: () => Promise<void>;
  
  // Avatar control actions
  setExpression: (expression: string) => void;
  setAnimation: (animation: string) => void;
  setPosition: (position: { x: number; y: number; z: number }) => void;
  setRotation: (rotation: { x: number; y: number; z: number }) => void;
  setScale: (scale: { x: number; y: number; z: number }) => void;
  resetTransform: () => void;
}

export const useAvatarStore = create<AvatarState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        photos: [],
        currentModel: null,
        isTraining: false,
        error: null,
        expression: 'neutral',
        animation: 'idle',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },

        // Photo management
        addPhotos: (newPhotos) =>
          set((state) => ({ photos: [...state.photos, ...newPhotos] })),
        
        removePhoto: (index) =>
          set((state) => ({
            photos: state.photos.filter((_, i) => i !== index),
          })),
        
        clearPhotos: () => set({ photos: [] }),

        // Model selection
        setModel: (modelId) => set({ currentModel: modelId }),

        // Avatar training
        trainAvatar: async () => {
          const { photos } = get();
          if (photos.length === 0) {
            set({ error: 'No photos available for training' });
            return;
          }

          set({ isTraining: true, error: null });
          try {
            await assistantApi.trainAvatar(photos);
            set({ isTraining: false });
          } catch (error) {
            set({
              error: 'Failed to train avatar: ' + (error as Error).message,
              isTraining: false,
            });
          }
        },

        // Avatar control
        setExpression: (expression) => set({ expression }),
        
        setAnimation: (animation) => set({ animation }),
        
        setPosition: (position) =>
          set((state) => ({
            position: { ...state.position, ...position },
          })),
        
        setRotation: (rotation) =>
          set((state) => ({
            rotation: { ...state.rotation, ...rotation },
          })),
        
        setScale: (scale) =>
          set((state) => ({
            scale: { ...state.scale, ...scale },
          })),
        
        resetTransform: () =>
          set({
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
          }),
      }),
      {
        name: 'avatar-storage',
        partialize: (state) => ({
          currentModel: state.currentModel,
          position: state.position,
          rotation: state.rotation,
          scale: state.scale,
        }),
      }
    )
  )
);
