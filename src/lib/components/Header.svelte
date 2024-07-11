<script lang="ts">
 import '../styles/app.css'
 import { page } from '$app/stores';
 import { Search, Bell, LogOut } from 'lucide-svelte';
 import { applyAction, enhance } from '$app/forms';
 import { invalidateAll } from '$app/navigation';

 $: user = $page.data.user;

</script>

<header class="bg-gray-300 shadow-sm z-10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-14">
      <div class="flex items-center">
        <div class="relative">
          <input type="text" placeholder="Search" class="bg-gray-100 rounded-full py-1.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm">
          <Search class="absolute left-3 top-2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div class="flex items-center">
        <button type="button" class="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300">
          <span class="sr-only">View notifications</span>
          <Bell class="h-5 w-5" />
        </button>
        <div class="ml-3 relative">
          <button type="button" class="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300">
            <span class="sr-only">Open user menu</span>
            <img class="h-8 w-8 rounded-full" src="data:image;base64,{user.image}" alt="">
          </button>
        </div>
        <div class="ml-2 relative">
    {#if $page.data.user}
      <form action="/logout" method="POST" use:enhance={() => {
        return async ({result}) => {
          invalidateAll()
          await applyAction(result)
        }
      }}>
        <button type="submit" class="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"><LogOut class="h-5 w-5" /></button>
      </form>
    {/if}
    </div>
      </div>
    </div>
  </div>
</header>