import React, { memo, useState } from "react";
import '../styles/createmeal.css';

function CreateMeal(props) {
    var storedMeals = JSON.parse(window.localStorage.getItem("meals"));
    const { handleBackToAddMeal } = props;
    var [name, setName] = useState(null);
    var [cal, setCal] = useState(null);
    var [fat, setFat] = useState(null);
    var [chol, setChol] = useState(null);
    var [sod, setSod] = useState(null);
    var [prt, setPrt] = useState(null);
    var [vitd, setVitd] = useState(null);
    var [calc, setCalc] = useState(null);
    var [irn, setIrn] = useState(null);
    var [pts, setPts] = useState(null);
    var [vitc, setVitc] = useState(null);
    var [warning, setWarning] = useState('');

    function handleSubmit() {
        setWarning('');
        let meal = {
            name: name,
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
        let foodExists = storedMeals.filter(meal => meal.name === name);
        if (foodExists.length > 0) {
            setWarning('there is already a food with this name');
        }
        else{
            storedMeals.push(meal);
            window.localStorage.setItem("meals", JSON.stringify(storedMeals));
            handleBackToAddMeal();
        }
    }

    function handleName(e) {
        setName(name = e.target.value);
    }
    function handleCal(e) {
        setCal(cal = e.target.value);
    }
    function handleFat(e) {
        setFat(fat = e.target.value);
    }
    function handleChol(e) {
        setChol(chol = e.target.value);
    }
    function handleSod(e) {
        setSod(sod = e.target.value);
    }
    function handlePrt(e) {
        setPrt(prt = e.target.value);
    }
    function handleVitd(e) {
        setVitd(vitd = e.target.value);
    }
    function handleCalc(e) {
        setCalc(calc = e.target.value);
    }
    function handleIrn(e) {
        setIrn(irn = e.target.value);
    }
    function handlePts(e) {
        setPts(pts = e.target.value);
    }
    function handleVitc(e) {
        setVitc(vitc = e.target.value);
    }
    return (
        <div className="createmeal_main_holder">
            <h2>{`create new meal (per 100 grams)`}</h2>
            <div /* onSubmit={handleSubmit}  */ className="createmeal_form">
                <label>
                    name:
                </label>
                <input type="text" onChange={handleName} />
                <label>
                    calories
                </label>
                <input type="text" onChange={handleCal} />
                <label>
                    fat:
                </label>
                <input type="text" onChange={handleFat} />
                <label>
                    cholesterol:
                </label>
                <input type="text" onChange={handleChol} />
                <label>
                    sodium:
                </label>
                <input type="text" onChange={handleSod} />
                <label>
                    protein:
                </label>
                <input type="text" onChange={handlePrt} />
                <label>
                    vitamin d:
                </label>
                <input type="text" onChange={handleVitd} />
                <label>
                    calcium:
                </label>
                <input type="text" onChange={handleCalc} />
                <label>
                    iron:
                </label>
                <input type="text" onChange={handleIrn} />
                <label>
                    potasium:
                </label>
                <input type="text" onChange={handlePts} />
                <label>
                    vitamin c:
                </label>
                <input type="text" onChange={handleVitc} />
                <button onClick={handleSubmit}>create meal</button>
                <p className="createMeal_warning">{warning}</p>
            </div>
            <button onClick={handleBackToAddMeal}>back</button>
        </div>
    )
}

export default memo(CreateMeal);

/* old form
<form onSubmit={handleSubmit} className="createmeal_form">
                <label>
                    name:
                    <input type="text" />
                </label>
                <label>
                    calories:
                    <input type="text" />
                </label>
                <label>
                    fat:
                    <input type="text" />
                </label>
                <label>
                    cholesterol:
                    <input type="text" />
                </label>
                <label>
                    sodium:
                    <input type="text" />
                </label>
                <label>
                    protein:
                    <input type="text" />
                </label>
                <label>
                    vitamin d:
                    <input type="text" />
                </label>
                <label>
                    calcium:
                    <input type="text" />
                </label>
                <label>
                    iron:
                    <input type="text" />
                </label>
                <label>
                    potasium:
                    <input type="text" />
                </label>
                <label>
                    vitamin c:
                    <input type="text" />
                </label>
                <input type="submit" value="Submit" />
            </form>
*/