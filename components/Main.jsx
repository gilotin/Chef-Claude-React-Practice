import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientList";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([
        "all the main spices",
        "pasta",
        "ground beef",
        "tomato paste",
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

    function getRecipe() {
        setRecipeShown((prevState) => !prevState);
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
            {recipeShown ? <ClaudeRecipe /> : null}
        </main>
    );
}
