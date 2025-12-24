<script lang="ts">
    import {onMount} from 'svelte';
    import {mealStore} from '../stores/meal.store';
    import {MealViewModel} from '../viewmodel/meal.viewmodel';

    const vm = new MealViewModel();
    let mealName = 'A';

    onMount(() => {
        vm.loadMeal(mealName);
    });
</script>

<div class="max-w-4xl mx-auto  p-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Meal Explorer</h2>

    <div class="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
                bind:value={mealName}
                class="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow"
                placeholder="Enter meal name"
        />
        <button
                class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 shadow transition duration-200"
                on:click={() => vm.loadMeal(mealName)}
        >
            Search
        </button>
    </div>

    {#if $mealStore.loading}
        <p class="text-center text-gray-500">Loading...</p>
    {:else if $mealStore.error}
        <p class="text-center text-red-500 font-semibold">{$mealStore.error}</p>
    {:else if $mealStore.data && $mealStore.data.meals?.length}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each $mealStore.data.meals as meal}
                <div
                        class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
                >
                    <img src={meal.strMealThumb} alt={meal.strMeal} class="w-full h-48 object-cover"/>
                    <div class="p-4 space-y-2">
                        <p class="text-xl font-semibold text-gray-800">{meal.strMeal}</p>
                        <p class="text-sm text-gray-500">{meal.strCategory} | {meal.strArea}</p>
                        <p class="text-gray-700 text-sm line-clamp-4">{meal.strInstructions}</p>
                    </div>
                    <div class="px-4 pb-4">
                        <button
                                class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                                on:click={() => vm.handleMealClick(meal)}
                        >
                            View Recipe
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-center text-gray-500">No meals found</p>
    {/if}
</div>
