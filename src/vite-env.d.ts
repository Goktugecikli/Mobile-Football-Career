/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAME_WIDTH?: string;
  readonly VITE_GAME_HEIGHT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
