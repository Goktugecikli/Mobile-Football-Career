/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME?: string;
  readonly VITE_GAME_WIDTH?: string;
  readonly VITE_GAME_HEIGHT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
