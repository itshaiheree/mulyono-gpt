'use server';

import { cookies } from 'next/headers';

export default async function getSession() {
  const cookieStore = await cookies(); // ✅ WAJIB await
  const session = cookieStore.get('session');

  return session?.value ?? null;
}
