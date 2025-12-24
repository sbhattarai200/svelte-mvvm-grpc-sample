// src/lib/viewmodel/meal.viewmodel.ts
import { mealStore } from '../stores/meal.store';
import { fetchMealByName } from '../services/meal.service';

export class MealViewModel {
    async loadMeal(name: string) {
        mealStore.update(s => ({ ...s, loading: true, error: null }));

        try {
            const data = await fetchMealByName(name);
            mealStore.set({ data, loading: false, error: null });
        } catch (e) {
            mealStore.set({
                data: null,
                loading: false,
                error: (e as Error).message
            });
        }
    }

    handleMealClick(meal: any) {
        console.log(meal);
    }
}
