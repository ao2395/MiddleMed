import React, { useState, useEffect } from 'react';
import './SymptomAndDiagnosis.css';

function SymptomAndDiagnosis() {
    const [symptomsList, setSymptomsList] = useState([]);
    const [search, setSearch] = useState('');
    const [checkedState, setCheckedState] = useState({});
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [diagnosis, setDiagnosis] = useState([]);
    const [useLiveAPI, setUseLiveAPI] = useState(false);  // State to toggle between live and sandbox

    const sandboxToken = process.env.REACT_APP_SANDBOX_TOKEN;
    console.log(sandboxToken)
    const liveToken = process.env.REACT_APP_LIVE_TOKEN;
    const apiBaseURL = useLiveAPI ? "https://healthservice.priaid.ch" : "https://sandbox-healthservice.priaid.ch";
    const token = useLiveAPI ? liveToken : sandboxToken;
    useEffect(() => {
        fetch(`${apiBaseURL}/symptoms?token=${token}&format=json&language=en-gb`)
            .then(response => response.json())
            .then(data => {
                setSymptomsList(data);
                const initialState = data.reduce((state, symptom) => ({
                    ...state,
                    [symptom.ID]: false
                }), {});
                setCheckedState(initialState);
            })
            .catch(error => console.error('Error fetching symptoms:', error));
    }, [token, apiBaseURL]);

    const handleCheckboxChange = (id) => {
        setCheckedState(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const handleDiagnosis = () => {
        const selectedSymptoms = Object.entries(checkedState)
            .filter(([key, value]) => value)
            .map(([key]) => key);

        if (selectedSymptoms.length > 0) {
            fetch(`${apiBaseURL}/diagnosis?symptoms=[${selectedSymptoms}]&gender=${gender}&year_of_birth=${age}&token=${token}&format=json&language=en-gb`)
                .then(response => response.json())
                .then(data => {
                    setDiagnosis(data);
                })
                .catch(error => console.error('Error fetching diagnosis:', error));
        } else {
            console.log("Please select at least one symptom for a detailed diagnosis.");
        }
    };

    return (
        <div className="container">
            <header className="header">
                <div className="header-content">
                    <h1>MiddleMed</h1>
                    <label className="switch">
                        <input type="checkbox" checked={useLiveAPI} onChange={() => setUseLiveAPI(!useLiveAPI)} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </header>
            <div className="body">
                <div className="left-column">
                    <input
                        type="number"
                        className="input-text"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        placeholder="Enter your age"
                    />
                    <select
                        className="input-select"
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <button className="submit-button" onClick={handleDiagnosis}>Diagnose</button>
                    <input
                        type="text"
                        className="search-input"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search symptoms"
                    />
                    <div className="symptom-checkboxes">
                        {symptomsList.filter(symptom => symptom.Name.toLowerCase().includes(search.toLowerCase())).map(symptom => (
                            <label key={symptom.ID} className="checkbox-container">
                                {symptom.Name}
                                <input
                                    type="checkbox"
                                    checked={checkedState[symptom.ID]}
                                    onChange={() => handleCheckboxChange(symptom.ID)}
                                />
                                <span className="checkmark"></span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="right-column">
                    {diagnosis.length > 0 && (
                        <ul className="diagnosis-list">
                            {diagnosis.map((diag, index) => (
                                <li key={index}>
                                    <strong>{diag.Issue.Name}</strong> (Accuracy: {diag.Issue.Accuracy}%)
                                    <ul>
                                        {diag.Specialisation.map((spec, specIndex) => (
                                            <li key={specIndex}>{spec.Name}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SymptomAndDiagnosis;