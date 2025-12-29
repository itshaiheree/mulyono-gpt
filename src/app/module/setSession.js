'use server';

import { cookies } from 'next/headers';

export default async function setSession(sessionValue) {
  const cookieStore = await cookies(); // ✅ WAJIB await
  cookieStore.set('session', sessionValue);
}
