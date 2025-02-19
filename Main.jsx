import React from "react";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [error, setError] = React.useState([]);

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

    const ingredientsListItems = ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
    ));

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

            {ingredients.length > 0 && (
                <section>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredients-list" aria-live="polite">
                        {ingredientsListItems}
                    </ul>
                    {ingredients.length >= 4 && (
                        <div className="get-recipe-container">
                            <div>
                                <h3>Ready for a recipe?</h3>
                                <p>Generate a recipe from your list of ingredients.</p>
                            </div>
                            <button>Get a recipe</button>
                        </div>
                    )}
                </section>
            )}
        </main>
    );
}
