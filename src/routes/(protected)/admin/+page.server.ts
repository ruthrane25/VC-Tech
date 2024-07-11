import { PrismaClient } from '@prisma/client';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

  const roles = await prisma.roles.findMany();

  return { pendingUsers, approvedUsers, roles };
};

export const actions: Actions = {
  approve: async ({ request, locals }) => {
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

  editUser: async ({ request, locals }) => {
    if (!locals.user) {
      throw redirect(302, '/login');
    }

    const data = await request.formData();
    const userId = data.get('userId') as string;
    const roleId = parseInt(data.get('roleId') as string);

    await prisma.user.update({
      where: { id: userId },
      data: { roleId }
    });

    return { success: true };
  },

  deleteUser: async ({ request, locals }) => {
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

  logout: async ({ cookies }) => {
    cookies.set('session', '', {
      path: '/',
      expires: new Date(0),
    });

    throw redirect(302, '/login');
  }
};