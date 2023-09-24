import React, { memo } from "react";
import '../styles/editmeals.css';

function EditMeals(props) {
    const {eatenMeals, deleteEatenMeal, handleBack} = props;
    return (
        <div className="main_holder">
            {eatenMeals &&
                eatenMeals.map((meal, i) =>
                    <div>
                        <p className="editMeals_meal">{meal.name}-{Math.round(meal.cal)}</p>
                        <button onClick={() => deleteEatenMeal(i)}>delete</button>
                    </div>
                )
            }
            {eatenMeals.length === 0 &&
                <p>there is no food in your digestive system</p>
            }
            <button onClick={handleBack} className="editMeals_back_button">back</button>
        </div>
    )
}

export default memo(EditMeals)