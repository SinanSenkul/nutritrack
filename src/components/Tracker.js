import React, { useState, useEffect } from "react";
import '../styles/tracker.css';
import seedMeals from '../seedMeals';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Tracker() {
    const storedMeals = JSON.parse(window.localStorage.getItem("meals"))
    var [meals, setMeals] = useState(storedMeals || seedMeals);
    var [remCal, setRemCal] = useState(0);
    var [remPrt, setRemPrt] = useState(0);
    var [remVitc, setRemVitc] = useState(0);
    var [visiblePage, setVisiblePage] = useState('status');
    var [searchedMeals, setSearchedMeals] = useState([]);
    var [search, setSearch] = useState('');
    var [grams, setGrams] = useState(0);
    var [checked, setChecked] = useState(false);
    var [lastEatenMeals, setLastEatenMeals] = useState([]);
    var [dateVal, setDateVal] = useState(null);

    function handleCheck() {
        setChecked(!checked);
    };

    function findMeals() {
        let searchRes = meals.filter(meal => meal.name === search);
        setSearchedMeals(searchRes);
    }

    function handleSearch(e) {
        setSearch(search = e.target.value);
    }

    function handleBack() {
        setVisiblePage('status');
        setSearchedMeals([]);
        setSearch('');
    }

    var timeOut;
    function nutriReducer() {
        timeOut = setTimeout(() => {
            if (remCal > 1.5625) {
                setRemCal(remCal - 1.5625);
            }
            if (remPrt > 0.1171) {
                setRemPrt(remPrt - 0.1171);
            }
            if (remVitc > 0.0625) {
                setRemVitc(remVitc - 0.0625);
            }
        }, 60000)
    }

    useEffect(() => {
        nutriReducer();
    });

    function addMeal(i) {
        let c = grams / 100;
        let meal = searchedMeals[i];
        let cal = meal.cal * c;
        let fat = meal.fat * c;
        let chol = meal.chol * c;
        let sod = meal.sod * c;
        let prt = meal.prt * c;
        let vitd = meal.vitd * c;
        let calc = meal.calc * c;
        let irn = meal.irn * c;
        let pts = meal.pts * c;
        let vitc = meal.vitc * c;
        if (checked) {
            vitc = 0;
        }
        let lastMeal = {
            cal: cal,
            fat: fat,
            chol: chol,
            sod: sod,
            prt: prt,
            vitd: vitd,
            calc: calc,
            irn: irn,
            pts: pts,
            vitc: vitc
        }
        setLastEatenMeals(current => [...current, lastMeal])
        console.log('lastmeal: ' + lastMeal)
        console.log('lasteatenmeals: ' + lastEatenMeals);
        console.log('length of lasteatenmeals: ' + lastEatenMeals.length)
        setRemCal(remCal + cal);
        setRemPrt(remPrt + prt);
        setRemVitc(remVitc + vitc);
        handleBack();
    }

    function handleGrams(e) {
        setGrams(grams = e.target.value);
    }

    function undoMeal() {
        let newLastEatenMeals = lastEatenMeals;
        if (newLastEatenMeals.length > 0) {
            let lastMeal = newLastEatenMeals[newLastEatenMeals.length - 1];
            console.log('meal to be deleted: ' + lastMeal)
            let cal = lastMeal.cal;
            let prt = lastMeal.prt;
            let vitc = lastMeal.vitc;
            if (remCal > cal) {
                setRemCal(remCal - cal);
            }
            if (remPrt > prt) {
                setRemPrt(remPrt - prt);
            }
            if (remVitc > vitc) {
                setRemVitc(remVitc - vitc);
            }
            newLastEatenMeals.pop();
            setLastEatenMeals(newLastEatenMeals);
        }
    }

    return (
        <div>
            {(visiblePage === 'status') &&
                <div className="main_holder">
                    <p><b>current status:</b></p>
                    <div className="status_data_holder">
                        <span>remaining calories: {Math.round(remCal / 2250 * 100)}% </span>
                        <span>protein in bloodstream: {Math.round(remPrt / 168.75 * 100)}% </span>
                        <span>vitamin c in bloodstream: {Math.round(remVitc / 75 * 100)}% </span>
                    </div>
                    <div className="status_button_holder">
                        <button onClick={() => setVisiblePage('addMeal')}>add meal</button>
                        <button>add activity</button>
                        <button onClick={undoMeal}>undo meal</button>
                    </div>
                </div>
            }
            {(visiblePage === 'addMeal') &&
                <div className="main_holder">
                    <p><b>search meal:</b></p>
                    <div className="addMeal_search_holder">
                        <input type="text" onChange={handleSearch}></input>
                        <button onClick={findMeals} className="addMeal_button" id="addMeal_search_button">search</button>
                    </div>
                    {searchedMeals.length > 0 &&
                        <div className="addMeal_meals">
                            {searchedMeals.map((meal, i) =>
                                <div className="addMeal_meal_detail">
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker value={dateVal} onChange={(newValue) => setDateVal(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div>
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
            }
        </div>
    )
}