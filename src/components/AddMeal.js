import React, { memo } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import '../styles/addmeal.css';

function AddMeal(props) {
    const { handleSearch, findMeals, searchedMeals, timeVal, setTimeVal,
        handleGrams, checked, handleCheck, addMeal, handleBack } = props;
    return (
        <div className="main_holder">
            <p><b>search meal:</b></p>
            <div className="addMeal_search_holder">
                <input type="text" onChange={handleSearch} className="addMeal_search_input"></input>
                <button onClick={findMeals} className="addMeal_button" id="addMeal_search_button">search</button>
            </div>
            {searchedMeals.length > 0 &&
                <div className="addMeal_meals">
                    {searchedMeals.map((meal, i) =>
                        <div className="addMeal_meal_detail">
                            <div className="addMeal_date_holder">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker
                                            value={timeVal}
                                            onChange={(newValue) => setTimeVal(newValue)}
                                            sx={{
                                                backgroundColor: 'white',
                                                fontSize: 'medium',
                                                borderRadius: '10px',
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                                {(dayjs(new Date()) < timeVal) &&
                                    <p style={{ color: 'red' }}>{'timer error: select current or past time'}</p>
                                }
                            </div>
                            <div className="addMeal_meal_qty">
                                <p>{meal.name}</p>
                                <span><input type="text" className="addMeal_meal_input" onChange={handleGrams}></input> grams</span>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={handleCheck}
                                    />
                                    cooked
                                </label>
                                <button onClick={() => addMeal(i)} className="addMeal_button">add</button>
                            </div>
                        </div>
                    )}
                </div>
            }
            <button onClick={handleBack} className="addMeal_button">back</button>
        </div>
    )
}

export default memo(AddMeal)