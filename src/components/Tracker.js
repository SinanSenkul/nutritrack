import React, { useState, useEffect } from "react";
import '../styles/tracker.css';
import seedMeals from '../seedMeals';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";

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
    var [eatenMeals, setEatenMeals] = useState([]);
    var [timeVal, setTimeVal] = useState(dayjs(new Date()));

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

    /* var timeOut = null; */
    function foodDigest() {
        if (eatenMeals.length > 0) {
            let newEatenMeals = eatenMeals;
            console.log('first meals remaining calories: ' + newEatenMeals[0].cal);
            if (dayjs(new Date()) > newEatenMeals[0].date) {
                newEatenMeals[0].cal = newEatenMeals[0].cal - (1.5625 * (dayjs(new Date()) - newEatenMeals[0].date) / 60 / 1000);
                newEatenMeals[0].prt = newEatenMeals[0].prt - (0.1171 * (dayjs(new Date()) - newEatenMeals[0].date) / 60 / 1000);
                newEatenMeals[0].vitc = newEatenMeals[0].vitc - (0.0625 * (dayjs(new Date()) - newEatenMeals[0].date) / 60 / 1000);
            }
            if (newEatenMeals[0].cal < 0) {
                newEatenMeals[0].cal = 0;
            }
            if (newEatenMeals[0].prt < 0) {
                newEatenMeals[0].prt = 0;
            }
            if (newEatenMeals[0].vitc < 0) {
                newEatenMeals[0].vitc = 0;
            }
            if (newEatenMeals[0].cal === 0 && newEatenMeals[0].prt === 0 && newEatenMeals[0].vitc === 0) {
                newEatenMeals.shift();
            }
            let newRemCal = 0;
            let newRemPrt = 0;
            let newRemVitc = 0;
            newEatenMeals.map((meal) => {
                newRemCal = newRemCal + meal.cal;
                newRemPrt = newRemPrt + meal.prt;
                newRemVitc = newRemVitc + meal.vitc;
            })
            setEatenMeals(newEatenMeals);
            setRemCal(newRemCal);
            setRemPrt(newRemPrt);
            setRemVitc(newRemVitc);
        }
    }

    function addMeal(i) {
        let c = grams / 100;
        let meal = searchedMeals[i];
        let name = meal.name;
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
            name: name,
            date: (timeVal),
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
        setEatenMeals(current => [...current, lastMeal]);
        handleBack();
    }

    function handleGrams(e) {
        setGrams(grams = e.target.value);
    }

    function deleteEatenMeal(i) {
        console.log('deleteeanmeal func ran')
        let newEatenMeals = eatenMeals;
        newEatenMeals.splice(i, 1);
        setEatenMeals(newEatenMeals);
        if (newEatenMeals.length === 0) {
            setVisiblePage('status');
            setRemCal(0);
            setRemPrt(0);
            setRemVitc(0);
        }
    }

    useEffect(() => {
        const interval = setInterval(foodDigest, 1000);
        return () => clearInterval(interval);
    })

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
                        <button onClick={() => setVisiblePage('editMeals')}>edit meals</button>
                    </div>
                </div>
            }
            {(visiblePage === 'addMeal') &&
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
            }
            {(visiblePage === 'editMeals') &&
                <div className="main_holder">
                    {eatenMeals &&
                        eatenMeals.map((meal, i) =>
                            <div>
                                <p className="editMeals_meal">{meal.name}-{Math.round(meal.cal)}</p>
                                <button onClick={() => deleteEatenMeal(i)}>delete</button>
                            </div>
                        )
                    }
                    {eatenMeals.length===0 &&
                        <p>there is no food in your system</p>
                    }
                    <button onClick={handleBack} className="addMeal_button">back</button>
                </div>
            }
        </div>
    )
}