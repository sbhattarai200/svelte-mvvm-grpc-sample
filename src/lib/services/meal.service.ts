export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
}

export interface MealResponse {
    meals: Meal[] | null;
}

export async function fetchMealByName(name: string): Promise<MealResponse> {
    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch meal');
    }

    return res.json();
}
