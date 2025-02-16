// ==UserScript==
// @name         KulinarneDodatki
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Plugin that adds various simplifications to "kwestiasmaku"
// @author       Wojciech Haberek
// @match        *://*.kwestiasmaku.com/*
// ==/UserScript==

(function() {
    'use strict';

    const STYLES = `
        input[type="checkbox"] {
            display: block;
            margin: 0px 8px 0px 0px;
            padding: 8px;
        }

        .field-name-field-skladniki li {
            display: flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
        }

        .ingredient-checkbox {
            -webkit-appearance: none;
            appearance: none;
            border: 2px solid #4CAF50;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            float: left;
        }

        .ingredient-checkbox:checked {
            background: #4CAF50;
        }

        .ingredient-checkbox:checked::after {
            content: '';
            position: absolute;
            left: 5px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }

        .ingredient-checkbox:hover {
            background-color: #f0f0f0;
        }

        .ingredient-checkbox:checked:hover {
            background-color: #45a049;
        }

        .col-md-9 {
            width: 100%;
        }

        .col-md-9.col-srodek {
            padding: 0 2.3% 0 2.3%;
        }
    `;

    const StorageManager = {
        getStates() {
            return JSON.parse(sessionStorage.getItem('ingredientStates') || '{}');
        },

        getRecipeStates(recipeId) {
            return this.getStates()[recipeId] || {};
        },

        saveState(recipeId, index, checked) {
            const currentStates = this.getStates();
            if (!currentStates[recipeId]) {
                currentStates[recipeId] = {};
            }
            currentStates[recipeId][index] = checked;
            sessionStorage.setItem('ingredientStates', JSON.stringify(currentStates));
        }
    };

    const DOMManager = {
        addStyles() {
            const style = document.createElement('style');
            style.textContent = STYLES;
            document.head.appendChild(style);
        },

        createCheckbox() {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'ingredient-checkbox';
            return checkbox;
        },

        wrapIngredientText(ingredient) {
            const wrapper = document.createElement('span');
            while (ingredient.firstChild) {
                wrapper.appendChild(ingredient.firstChild);
            }
            return wrapper;
        }
    };

    function setupIngredient(ingredient, index, recipeId) {
        const wrapper = DOMManager.wrapIngredientText(ingredient);
        ingredient.appendChild(wrapper);

        const checkbox = DOMManager.createCheckbox();
        ingredient.insertBefore(checkbox, wrapper);

        const recipeStates = StorageManager.getRecipeStates(recipeId);
        if (recipeStates[index]) {
            checkbox.checked = true;
            wrapper.style.textDecoration = 'line-through';
            wrapper.style.opacity = 0.5;
        }

        ingredient.addEventListener('click', (e) => {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                wrapper.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
                wrapper.style.opacity = checkbox.checked ? 0.5 : 1;
                StorageManager.saveState(recipeId, index, checkbox.checked);
            }
        });

        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    function addCheckboxesToIngredients() {
        const ingredientsContainer = document.querySelector('.field-name-field-skladniki');
        if (!ingredientsContainer) return;

        const recipeId = window.location.pathname;
        const ingredients = ingredientsContainer.getElementsByTagName('li');

        DOMManager.addStyles();
        Array.from(ingredients).forEach((ingredient, index) => {
            setupIngredient(ingredient, index, recipeId);
        });
    }

    window.addEventListener('load', addCheckboxesToIngredients);
})();
