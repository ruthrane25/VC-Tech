<!-- src/lib/components/StageUpdateModal.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SalesOrder } from '$lib/types';

  export let salesOrder: SalesOrder;
  
  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    closeModal();
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }
</script>

<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" on:click|self={closeModal}>
  <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
    <h2 class="text-2xl font-bold mb-4">Update Stage</h2>
    <form on:submit={handleSubmit}>
      <!-- API data fields -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="so_number">
            SO Number
          </label>
          <input id="so_number" type="text" value={salesOrder.salesorder_number} readonly class="w-full px-3 py-2 border rounded-md bg-gray-100">
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="so_date">
            SO Date
          </label>
          <input id="so_date" type="text" value={new Date(salesOrder.date).toLocaleDateString()} readonly class="w-full px-3 py-2 border rounded-md bg-gray-100">
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="client_name">
            Client Name
          </label>
          <input id="client_name" type="text" value={salesOrder.customer_name} readonly class="w-full px-3 py-2 border rounded-md bg-gray-100">
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="purchase_order">
            Purchase Order
          </label>
          <input id="purchase_order" type="text" value={salesOrder.reference_number} readonly class="w-full px-3 py-2 border rounded-md bg-gray-100">
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="so_subtotal">
            SO Subtotal
          </label>
          <input id="so_subtotal" type="text" value={formatCurrency(salesOrder.sub_total)} readonly class="w-full px-3 py-2 border rounded-md bg-gray-100">
        </div>
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="so_total">
            SO Total
          </label>
          <input id="so_total" type="text" value={formatCurrency(salesOrder.total)} readonly class="w-full px-3 py-2 border rounded-md bg-gray-100">
        </div>
      </div>

      <!-- Line Items Table -->
      <div class="mb-4">
        <h3 class="text-lg font-bold mb-2">Line Items</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each salesOrder.line_items as item}
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity} {item.unit}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.rate)}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.item_total)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Editable fields -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="current_stage">
          Current Stage
        </label>
        <select id="current_stage" class="w-full px-3 py-2 border rounded-md">
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="notes">
          Notes
        </label>
        <textarea id="notes" class="w-full px-3 py-2 border rounded-md" rows="3"></textarea>
      </div>

      <div class="flex justify-end">
        <button type="button" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2" on:click={closeModal}>Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button>
      </div>
    </form>
  </div>
</div>