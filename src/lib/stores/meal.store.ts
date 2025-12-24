import { writable } from 'svelte/store';
import type { MealResponse } from '../services/meal.service';

export const mealStore = writable<{
    data: MealResponse | null;
    loading: boolean;
    error: string | null;
}>({
    data: null,
    loading: false,
    error: null
});
