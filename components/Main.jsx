import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [error, setError] = React.useState([]);
    const [recipe, setRecipe] = React.useState(false);

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

        setRecipe(receivedRecipe);

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
            {ingredients.length ? null : <h3>Add minimum four ingredients to get a recipe!</h3>}
            <div>{error.length ? <div className="showErr">{error[0]}</div> : null}</div>

            {ingredients.length > 0 && <IngredientList items={ingredients} getRecipe={getRecipe} />}
            {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
        </main>
    );
}
