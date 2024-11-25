'use strict';
const cakeRecipes = require('./cake-recipes.json');
const prompt = require('prompt-sync')();

console.log("Welcome to the Recipe Management System!");

let savedIngredients = [];

function getUniqueAuthors(recipes) {
    const authors = [];
    recipes.forEach(recipe => {
        if (recipe.Author && !authors.includes(recipe.Author)) {
            authors.push(recipe.Author); 
        }
    });
    return authors;
}

function logRecipeNames(recipes) {
    if (!recipes || recipes.length === 0) {
        console.log("No recipes found.");
        return;
    }

    recipes.forEach(({ Name }) => {
        console.log(Name);
    });
}

function getRecipesByAuthor(recipes, author) {
    const authorRecipes = recipes.filter(recipe => recipe.Author === author);

    if (authorRecipes.length > 0) {
        console.log(`Recipes by ${author}:`);
        logRecipeNames(authorRecipes);
    } else {
        console.log(`No recipes found for author: ${author}`);
    }

    return authorRecipes;
}

function getRecipesByIngredient(recipes, ingredient) {
    const recipesWithIngredient = recipes.filter(recipe =>
        recipe.Ingredients && recipe.Ingredients.some(item => item.toLowerCase().includes(ingredient.toLowerCase()))
    );

    if (recipesWithIngredient.length > 0) {
        console.log(`Recipes containing "${ingredient}":`);
        logRecipeNames(recipesWithIngredient);
    } else {
        console.log(`No recipes found containing "${ingredient}".`);
    }

    return recipesWithIngredient;
}

function findRecipeByName(recipes, name) {
    const recipe = recipes.find(recipe => recipe.Name.toLowerCase().includes(name.toLowerCase()));

    if (recipe) {
        console.log("Recipe Found:");
        console.log(recipe);

        const save = prompt("Would you like to save the ingredients of this recipe? (yes/no): ").toLowerCase();
        if (save === "yes") {
            savedIngredients = savedIngredients.concat(recipe.Ingredients);
            console.log("Ingredients saved successfully.");
        }
    } else {
        console.log(`No recipe found with the name "${name}".`);
    }

    return recipe;
}

function getAllIngredientsFromSaved() {
    if (savedIngredients.length === 0) {
        console.log("No ingredients saved yet.");
    } else {
        const uniqueIngredients = [...new Set(savedIngredients)]; 
        console.log("Ingredients from saved recipes:");
        uniqueIngredients.forEach((ingredient, index) => console.log(`${index + 1}. ${ingredient}`));
    }
}

const displayMenu = () => {
    console.log("\nRecipe Management System Menu:");
    console.log("1. Show All Authors");
    console.log("2. Show Recipe Names by Author");
    console.log("3. Show Recipe Names by Ingredient");
    console.log("4. Get Recipe by Name");
    console.log("5. Get All Ingredients of Saved Recipes");
    console.log("0. Exit");
    const choice = prompt("Enter a number (1-5) or 0 to exit: ");
    return parseInt(choice);
};

let choice;

do {
    choice = displayMenu();

    switch (choice) {
        case 1:
            console.log("Authors List:");
            const allAuthors = getUniqueAuthors(cakeRecipes);
            allAuthors.forEach((author, index) => console.log(`${index + 1}. ${author}`));
            break;
        case 2:
            const authorName = prompt("Enter the author's name: ");
            getRecipesByAuthor(cakeRecipes, authorName);
            break;
        case 3:
            const ingredient = prompt("Enter an ingredient: ");
            getRecipesByIngredient(cakeRecipes, ingredient);
            break;
        case 4:
            const recipeName = prompt("Enter the recipe name: ");
            findRecipeByName(cakeRecipes, recipeName);
            break;
        case 5:
            getAllIngredientsFromSaved();
            break;
        case 0:
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid input. Please enter a number between 0 and 5.");
    }
} while (choice !== 0);
