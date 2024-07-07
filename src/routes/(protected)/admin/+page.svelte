<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';
   import type { PageServerLoad } from "./$types";

  export let data: PageData;



  
  export const load = (({  }) => {
    
  }) satisfies PageServerLoad;

  $: ({ pendingUsers, approvedUsers } = data);


  let activeTab = 'pending';

  function toggleTab(tab: string) {
    activeTab = tab;
  }

  function formatDate(date: Date) {
    return new Date(date).toLocaleString();
  }
</script>

<div class="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
  <h1 class="text-3xl font-semibold mb-8 text-gray-800">User Management Dashboard</h1>

  <div class="mb-6 bg-white shadow-md rounded-lg p-4">
    <div class="flex border-b border-gray-200">
      <button
        class="py-2 px-4 font-medium {activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
        on:click={() => toggleTab('pending')}
      >
        Pending Approvals
      </button>
      <button
        class="py-2 px-4 font-medium ml-4 {activeTab === 'approved' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
        on:click={() => toggleTab('approved')}
      >
        Approved Users
      </button>
    </div>
  </div>

  {#if activeTab === 'pending'}
    {#if pendingUsers.length === 0}
      <p class="text-center text-gray-600 bg-white shadow-md rounded-lg p-4">No pending users to approve.</p>
    {:else}
      <div class="bg-white shadow-md rounded-lg overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each pendingUsers as user (user.id)}
              <tr transition:fade="{{ duration: 300 }}">
                <td class="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">{user.phoneNo}</td>
                <td class="px-6 py-4 whitespace-nowrap">{user.role.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{formatDate(user.createdAt)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{formatDate(user.updatedAt)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <form method="POST" action="?/approve" use:enhance class="inline-block mr-2">
                    <input type="hidden" name="userId" value={user.id} />
                    <button type="submit" class="text-blue-600 hover:text-blue-900">Approve</button>
                  </form>
                  <form method="POST" action="?/decline" use:enhance class="inline-block">
                    <input type="hidden" name="userId" value={user.id} />
                    <button type="submit" class="text-red-600 hover:text-red-900">Decline</button>
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {:else}
    {#if approvedUsers.length === 0}
      <p class="text-center text-gray-600 bg-white shadow-md rounded-lg p-4">No approved users yet.</p>
    {:else}
      <div class="bg-white shadow-md rounded-lg overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each approvedUsers as user (user.id)}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td class="px-6 py-4 whitespace-nowrap">{user.phoneNo}</td>
                <td class="px-6 py-4 whitespace-nowrap">{user.role.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{formatDate(user.createdAt)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">{formatDate(user.updatedAt)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/if}
</div>

<style>
  /* You can add any additional custom styles here */
</style>