import React, { memo } from "react";
import '../styles/status.css';

function Status(props) {
    const { setVisiblePage, remCal, remPrt, remVitc } = props;
    return (
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
    )
}

export default memo(Status)