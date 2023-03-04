import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/core/providers/credentials';

import type { RequestEvent, Handle } from '@sveltejs/kit';
import {locale} from './i18n/i18n-svelte';

export const handle:Handle = SvelteKitAuth({
  providers: [
    Credentials({});
  ],
});
/*
export const handle = (({ event, resolve }) => {
  return resolve(event, {

    transformPageChunk: ({ html }) => html.replace('%lang%', locale)
  });
}) satisfies Handle;
*/