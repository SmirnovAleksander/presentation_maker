/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_UNSPLASH_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
} 