import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Subject.css";
import { getLocalData, setLocalData } from "../../Hooks/useLocalStorage.js";
import DoughnutChart from "../../Components/DoughnutChart";
import colors, { grey } from "../../Data/colors.js";

const Subject = () => {
    const [percentage, setPercentage] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const sub = getLocalData("subjects").find((val) => val.id === Number(id));
    const [subject, setSubject] = useState(sub);

    const data = {
        datasets: [
            {
                data: [
                    subject.attendedClasses,
                    subject.totalClasses === 0
                        ? 2
                        : subject.totalClasses - subject.attendedClasses,
                ],
                backgroundColor: [`${colors[(subject.id - 1) % 15]}`, grey],
                borderRadius: 100,
                borderWidth: 0,
                spacing: 2,
            },
        ],
    };

    const options = {
        cutout: 85,
    };

    function handleSubjectDelect() {
        const res = window.confirm(
            "Are you sure you want to delete this subject"
        );
        if (!res) {
            return;
        }
        const subjects = getLocalData("subjects");
        const val = subjects
            .filter((val) => val.id !== subject.id)
            .map((val, index) => ({
                id: index + 1,
                subject: val.subject,
                attendedClasses: val.attendedClasses,
                totalClasses: val.totalClasses,
            }));
        setLocalData("subjects", val);
        navigate("/attendTrack");
    }

    function handleAttendedClassesIncrement() {
        if (subject.attendedClasses === subject.totalClasses) {
            alert("Attended classes can't be more than total classes");
            return;
        }
        setSubject((currState) => ({
            ...currState,
            attendedClasses: currState.attendedClasses + 1,
        }));
    }

    function handleAttendedClassesDecrement() {
        setSubject((currState) => ({
            ...currState,
            attendedClasses:
                currState.attendedClasses !== 0
                    ? currState.attendedClasses - 1
                    : 0,
        }));
    }

    function handleTotalClassesIncrement() {
        setSubject((currState) => ({
            ...currState,
            totalClasses: currState.totalClasses + 1,
        }));
    }

    function handleTotalClassesDecrement() {
        if (subject.attendedClasses === subject.totalClasses) {
            alert("Attended classes can't be less than the total classes");
            return;
        }
        setSubject((currState) => ({
            ...currState,
            totalClasses:
                currState.totalClasses !== 0 ? currState.totalClasses - 1 : 0,
        }));
    }

    function handlePresent() {
        setSubject((currState) => ({
            ...currState,
            attendedClasses: currState.attendedClasses + 1,
            totalClasses: currState.totalClasses + 1,
        }));
    }

    function handleAbsent() {
        setSubject((currState) => ({
            ...currState,
            totalClasses: currState.totalClasses + 1,
        }));
    }

    useEffect(() => {
        const subjects = getLocalData("subjects");
        const val = subjects.map((val) => {
            if (val.id === subject.id) {
                return subject;
            }
            return val;
        });

        setLocalData("subjects", val);
    }, [subject]);

    useEffect(() => {
        function findPercentage() {
            return Number(
                (
                    (subject.attendedClasses / subject.totalClasses) *
                    100
                ).toFixed(0)
            );
        }

        if (subject.totalClasses !== 0 && percentage < findPercentage()) {
            const val = findPercentage();
            const time = Number((1000 / val).toFixed(5));
            const interval = setTimeout(() => {
                setPercentage((currState) => currState + 1);
            }, time);
            return () => {
                clearInterval(interval);
            };
        }
    }, [percentage, subject.attendedClasses, subject.totalClasses]);

    useEffect(() => {
        if (subject.totalClasses !== 0) {
            setPercentage(
                Number(
                    (
                        (subject.attendedClasses / subject.totalClasses) *
                        100
                    ).toFixed(0)
                )
            );
        }
    }, [subject.attendedClasses, subject.totalClasses]);

    return (
        <>
            <section className="each-subject">
                <div className="each-subject-wrapper">
                    {subject === undefined ? (
                        <p>subject not present</p>
                    ) : (
                        <>
                            <div className="each-subject-info">
                                <h2
                                    style={{
                                        color: `${
                                            colors[
                                                (subject.id - 1) % colors.length
                                            ]
                                        }`,
                                    }}
                                >
                                    {subject.subject}
                                </h2>
                                <p className="attendence">
                                    attendence:{" "}
                                    <span>
                                        {subject.attendedClasses}/
                                        {subject.totalClasses}
                                    </span>
                                </p>
                            </div>
                            <div className="each-subject-chart-wrapper">
                                <div
                                    className="each-subject-chart"
                                    data-percentage={`${percentage}%`}
                                >
                                    <DoughnutChart
                                        data={data}
                                        options={options}
                                    />
                                </div>
                                <div className="chart-info">
                                    <p
                                        className="each-subject-prsent"
                                        data-info={"Present"}
                                        style={{
                                            backgroundColor: `${
                                                colors[
                                                    (sub.id - 1) % colors.length
                                                ]
                                            }`,
                                        }}
                                    ></p>
                                    <p
                                        className="each-subject-absent"
                                        data-info={"Absent"}
                                        style={{
                                            backgroundColor: `${grey}`,
                                        }}
                                    ></p>
                                </div>
                            </div>
                            <div className="classes-wrapper">
                                <p>
                                    Attendenced classes:{" "}
                                    {subject.attendedClasses}
                                </p>
                                <div>
                                    <button
                                        className="border"
                                        onClick={handleAttendedClassesDecrement}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="border"
                                        onClick={handleAttendedClassesIncrement}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>total classes: {subject.totalClasses}</p>
                                <div>
                                    <button
                                        className="border"
                                        onClick={handleTotalClassesDecrement}
                                    >
                                        -
                                    </button>

                                    <button
                                        className="border"
                                        onClick={handleTotalClassesIncrement}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <hr
                                style={{
                                    border: `1.25px solid ${
                                        colors[(sub.id - 1) % colors.length]
                                    }`,
                                }}
                            />
                            <div className="status-wrapper">
                                <button
                                    className="border"
                                    onClick={handlePresent}
                                >
                                    Present
                                </button>
                                <button
                                    className="border"
                                    onClick={handleAbsent}
                                >
                                    Absent
                                </button>
                            </div>
                            <div className="outro">
                                <Link to="/attendTrack">
                                    <button className="border">Back</button>
                                </Link>
                                <button
                                    className="border"
                                    onClick={handleSubjectDelect}
                                >
                                    Delete Subject
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Subject;
