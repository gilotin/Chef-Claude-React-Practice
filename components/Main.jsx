import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";
import { getRecipeFromMistral } from "../ai";

/**
 * Challenge: Get a recipe from the AI!
 *
 * This will be a bit harder of a challenge that will require you
 * to think critically and synthesize the skills you've been
 * learning and practicing up to this point.
 *
 * We'll start with a mini-quiz:
 *
 * 1. Think about where the recipe response should live and how you're
 *    going to make sure it doesn't disappear between each state change in
 *    the app. (I don't mean between refreshes of your mini-browser.
 *    You don't need to save this to localStorage or anything more permanent
 *    than in React's memory for now.)
 *
 *
 * 2. What action from the user should trigger getting the recipe?
 *
 */

export default function Main() {
    const [ingredients, setIngredients] = React.useState([
        "green salad",
        "tomatoes",
        "avocado",
        "olives",
    ]);
    const [error, setError] = React.useState([]);
    const [recipeShown, setRecipeShown] = React.useState(false);

    const checkIngredients = (array, value) => {
        setError([]);
        return array.some((arrayIngredient) => value === arrayIngredient);
    };

    function addIngredient(formData) {
        const data = formData.get("ingredient");
        const newIngredient = data[0].toUpperCase() + data.slice(1);

        if (checkIngredients(ingredients, newIngredient)) {
            const newError = "cannot have the same ingredient twice";
            setError((prevError) => [...prevError, newError]);
            return;
        }
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }

    async function getRecipe() {
        const receivedRecipe = await getRecipeFromMistral(ingredients);

        setRecipeShown(receivedRecipe);

        return;
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    required
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            <div>{error.length ? <div className="showErr">{error[0]}</div> : null}</div>

            {ingredients.length > 0 && <IngredientList items={ingredients} getRecipe={getRecipe} />}
            {recipeShown ? <ClaudeRecipe recipe={recipeShown} /> : null}
        </main>
    );
}
