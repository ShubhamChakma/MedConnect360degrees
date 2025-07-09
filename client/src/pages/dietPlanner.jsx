import React, { useState, useEffect } from "react";

const indianMeals = {
  vegetarian: {
    weightLoss: {
      breakfast: [
        { name: "Sprouts Salad", calories: 150, protein: 10, carbs: 15, fat: 2, fiber: 6 },
        { name: "Poha", calories: 200, protein: 4, carbs: 30, fat: 5, fiber: 2 },
      ],
      lunch: [
        { name: "Khichdi + Curd", calories: 350, protein: 9, carbs: 45, fat: 7, fiber: 4 },
        { name: "Dal + Roti + Salad", calories: 400, protein: 12, carbs: 40, fat: 10, fiber: 5 },
      ],
      dinner: [
        { name: "Veg Soup + Toast", calories: 250, protein: 6, carbs: 30, fat: 8, fiber: 2 },
        { name: "Paneer Bhurji + Roti", calories: 300, protein: 14, carbs: 18, fat: 15, fiber: 3 },
      ]
    },
    diabetic: {
      breakfast: [
        { name: "Oats Upma", calories: 180, protein: 5, carbs: 22, fat: 4, fiber: 4 },
        { name: "Boiled Moong", calories: 120, protein: 9, carbs: 12, fat: 1, fiber: 3 }
      ],
      lunch: [
        { name: "Mixed Veg + Roti", calories: 280, protein: 8, carbs: 35, fat: 6, fiber: 5 },
        { name: "Low GI Rice + Dal", calories: 300, protein: 10, carbs: 38, fat: 5, fiber: 6 }
      ],
      dinner: [
        { name: "Dalia + Curd", calories: 220, protein: 8, carbs: 30, fat: 3, fiber: 5 },
        { name: "Vegetable Soup", calories: 150, protein: 4, carbs: 20, fat: 2, fiber: 3 }
      ]
    }
  },
  nonVegetarian: {
    weightLoss: {
      breakfast: [
        { name: "Boiled Eggs (3)", calories: 210, protein: 18, carbs: 1, fat: 15, fiber: 0 },
        { name: "Omelette + Toast", calories: 300, protein: 14, carbs: 25, fat: 12, fiber: 2 }
      ],
      lunch: [
        { name: "Grilled Chicken + Rice", calories: 450, protein: 30, carbs: 40, fat: 18, fiber: 3 },
        { name: "Fish Curry + Brown Rice", calories: 400, protein: 25, carbs: 35, fat: 16, fiber: 3 }
      ],
      dinner: [
        { name: "Chicken Soup + Salad", calories: 300, protein: 20, carbs: 8, fat: 10, fiber: 2 },
        { name: "Egg Curry + Chapati", calories: 350, protein: 18, carbs: 25, fat: 14, fiber: 2 }
      ]
    },
    diabetic: {
      breakfast: [
        { name: "Egg Whites + Boiled Veg", calories: 180, protein: 15, carbs: 5, fat: 6, fiber: 2 }
      ],
      lunch: [
        { name: "Fish Curry + Low GI Rice", calories: 350, protein: 28, carbs: 30, fat: 10, fiber: 3 }
      ],
      dinner: [
        { name: "Chicken Stew + Veggies", calories: 300, protein: 22, carbs: 10, fat: 12, fiber: 2 }
      ]
    }
  }
};

const DietPlanner = () => {
  const [dietType, setDietType] = useState("vegetarian");
  const [customGoal, setCustomGoal] = useState("");
  const [mealPlan, setMealPlan] = useState({});
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    const fetchedHealthData = {
      weight: 95,
      height: "5'7\"",
      glucose: 160,
      cholesterol: 230,
      goal: "Lose 20kg in 2 months"
    };
    setHealthData(fetchedHealthData);
  }, []);

  const generatePlan = () => {
    const condition =
      customGoal.toLowerCase().includes("lose") || healthData.weight > 85
        ? "weightLoss"
        : healthData.glucose > 140
        ? "diabetic"
        : "weightLoss"; // fallback

    const meals = indianMeals[dietType][condition];
    setMealPlan(meals);
  };

  const renderMealCards = (meals, title) => (
    <div>
      <h3 className="text-xl font-bold text-blue-700 mt-6 mb-2">{title} 🍽️</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.map((meal, idx) => (
          <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-lg font-semibold text-green-800">{meal.name}</h4>
            <ul className="text-gray-700 mt-2 text-sm space-y-1">
              <li> <b>Calories:</b> {meal.calories} kcal</li>
              <li><b>Protein:</b> {meal.protein} g</li>
              <li><b>Carbs:</b> {meal.carbs} g</li>
              <li><b>Fat:</b> {meal.fat} g</li>
              <li><b>Fiber:</b> {meal.fiber} g</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white rounded-xl shadow-lg space-y-10">
      <p className="text-center text-gray-600 text-lg">Tailored diet suggestions based on your health & fitness goal</p>

      {healthData && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
          <h2 className="text-xl font-bold text-blue-800 mb-2">🧍‍♂️ Your Health Summary</h2>
          <div className="flex flex-wrap gap-6 text-gray-800">
            <div>📏 <b>Height:</b> {healthData.height}</div>
            <div>⚖️ <b>Weight:</b> {healthData.weight} kg</div>
            <div>🩸 <b>Glucose:</b> {healthData.glucose} mg/dL</div>
            <div>❤️ <b>Cholesterol:</b> {healthData.cholesterol} mg/dL</div>
            <div>🎯 <b>Goal:</b> {healthData.goal}</div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <label className="block text-md font-semibold mb-1">Choose Diet Type:</label>
          <select
            className="w-full p-2 border rounded-md"
            value={dietType}
            onChange={(e) => setDietType(e.target.value)}
          >
            <option value="vegetarian">Vegetarian </option>
            <option value="nonVegetarian">Non-Vegetarian </option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-md font-semibold mb-1">Custom Goal:</label>
          <input
            className="w-full p-2 border rounded-md"
            placeholder="e.g. I want to lose 20kg in 2 months"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={generatePlan}
        className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg"
      >
        🥗 Generate Diet Plan
      </button>

      {Object.keys(mealPlan).length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📅 Your Daily Meal Plan</h2>
          {mealPlan.breakfast && renderMealCards(mealPlan.breakfast, "Breakfast")}
          {mealPlan.lunch && renderMealCards(mealPlan.lunch, "Lunch")}
          {mealPlan.dinner && renderMealCards(mealPlan.dinner, "Dinner")}
        </div>
      )}
    </div>
  );
};

export default DietPlanner;
