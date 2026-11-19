import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';

// basicSsl: the Visual Editor only loads https URLs, also locally (https://localhost:5173/).
export default defineConfig({ plugins: [basicSsl(), sveltekit()] });
