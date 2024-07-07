import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ locals }) => {
  // Redirect user if not logged in
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  const pendingUsers = await prisma.user.findMany({
    where: { isApproved: false },
    include: { role: true }
  });

  const approvedUsers = await prisma.user.findMany({
    where: { isApproved: true },
    include: { role: true }
  });

  return { pendingUsers, approvedUsers };
};

export const actions: Actions = {
  approve: async ({ request, locals }) => {
    // Check if user is logged in
    if (!locals.user) {
      throw redirect(302, '/login');
    }

    const data = await request.formData();
    const userId = data.get('userId') as string;
    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true }
    });
    return { success: true };
  },
  decline: async ({ request, locals }) => {
    // Check if user is logged in
    if (!locals.user) {
      throw redirect(302, '/login');
    }

    const data = await request.formData();
    const userId = data.get('userId') as string;
    await prisma.user.delete({
      where: { id: userId }
    });
    return { success: true };
  },
  logout: ({ cookies }) => {
    // Clear the session cookie
    cookies.set('session', '', {
      path: '/',
      expires: new Date(0),
    });

    // Redirect the user to the login page
    throw redirect(302, '/login');
  }
};