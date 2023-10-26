import React, { useState, useEffect } from "react";
import '../styles/tracker.css';
import seedMeals from '../seedMeals';
import dayjs from "dayjs";
import Status from "./Status";
import AddMeal from "./AddMeal";
import EditMeals from "./EditMeals";

export default function Tracker() {
    var storedMeals = JSON.parse(window.localStorage.getItem("meals"));
    var storedEatenMeals = JSON.parse(window.localStorage.getItem("eatenmeals"));
    var [meals, setMeals] = useState(storedMeals || seedMeals);
    var [remCal, setRemCal] = useState(0);
    var [remPrt, setRemPrt] = useState(0);
    var [remVitc, setRemVitc] = useState(0);
    var [visiblePage, setVisiblePage] = useState('status');
    var [searchedMeals, setSearchedMeals] = useState([]);
    var [search, setSearch] = useState('');
    var [grams, setGrams] = useState(0);
    var [eatenMeals, setEatenMeals] = useState(storedEatenMeals || []);
    var [timeVal, setTimeVal] = useState(dayjs(new Date()));

    function syncLocalStorage() {
        window.localStorage.setItem("meals", JSON.stringify(meals));
        window.localStorage.setItem("eatenmeals", JSON.stringify(eatenMeals));
    }

    function findMeals() {
        /* setMeals(JSON.parse(window.localStorage.getItem("meals"))); */
        /* let searchRes = meals.filter(meal => meal.name === search); */
        let searchRes = [];
        meals.map((meal) => {
            if (meal.name.includes(search)){
                searchRes.push(meal)
            }
        })
        setSearchedMeals(searchRes);
    }

    function handleSearch(e) {
        setSearch(search = e.target.value);
    }

    function handleBack() {
        setVisiblePage('status');
        setSearchedMeals([]);
        setSearch('');
        setTimeVal(dayjs(new Date()));
    }

    function foodDigest() {
        if (eatenMeals.length > 0) {
            let newEatenMeals = eatenMeals;
            if (dayjs(new Date()) > newEatenMeals[0].date) {
                newEatenMeals[0].cal = newEatenMeals[0].cal - (1.5625 * (dayjs(new Date()) - newEatenMeals[0].date) / 10000000);
                newEatenMeals[0].prt = newEatenMeals[0].prt - (0.1171 * (dayjs(new Date()) - newEatenMeals[0].date) / 10000000);
                newEatenMeals[0].vitc = newEatenMeals[0].vitc - (0.0625 * (dayjs(new Date()) - newEatenMeals[0].date) / 10000000);
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
            syncLocalStorage();
        }
    }

    function addMeal(i) {
        if (dayjs(new Date()) >= timeVal) {
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
            let lastMeal = {
                name: name,
                date: '' + (timeVal) + '',
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
            setTimeVal(dayjs(new Date()));
            syncLocalStorage();
        }
    }

    function handleGrams(e) {
        setGrams(grams = e.target.value);
    }

    function deleteEatenMeal(i) {
        let newEatenMeals = eatenMeals;
        newEatenMeals.splice(i, 1);
        setEatenMeals(newEatenMeals);
        if (newEatenMeals.length === 0) {
            setRemCal(0);
            setRemPrt(0);
            setRemVitc(0);
        }
        syncLocalStorage();
    }

    useEffect(() => {
        const interval = setInterval(foodDigest, 1000);
        return () => clearInterval(interval);
    })

    return (
        <div>
            {(visiblePage === 'status') &&
                <Status
                    remCal={remCal}
                    remPrt={remPrt}
                    remVitc={remVitc}
                    setVisiblePage={setVisiblePage}
                />
            }
            {(visiblePage === 'addMeal') &&
                <AddMeal
                    handleSearch={handleSearch}
                    findMeals={findMeals}
                    searchedMeals={searchedMeals}
                    timeVal={timeVal}
                    setTimeVal={setTimeVal}
                    handleGrams={handleGrams}
                    addMeal={addMeal}
                    handleBack={handleBack}
                />

            }
            {(visiblePage === 'editMeals') &&
                <EditMeals
                    eatenMeals={eatenMeals}
                    deleteEatenMeal={deleteEatenMeal}
                    handleBack={handleBack}
                />
            }
        </div>
    )
}