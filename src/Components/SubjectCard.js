import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/SubjectCard.css";
import DoughnutChart from "./DoughnutChart.js";
import colors, { grey } from "../Data/colors";

const SubjectCard = ({ val, handlePresent, handleAbsent }) => {
    const [percentage, setPercentage] = useState(0);
    const navigate = useNavigate();
    const data = {
        datasets: [
            {
                data: [
                    val.attendedClasses,
                    val.totalClasses === 0
                        ? 2
                        : val.totalClasses - val.attendedClasses,
                ],
                backgroundColor: [`${colors[(val.id - 1) % 14]}`, grey],
                borderRadius: 100,
                borderWidth: 0,
                spacing: 2,
            },
        ],
    };

    const options = {
        cutout: 38,
    };

    function handleHybridPresent(e) {
        e.stopPropagation();
        handlePresent(e);
        setPercentage(
            Number(((val.attendedClasses / val.totalClasses) * 100).toFixed(0))
        );
    }

    function handleHybridAbsent(e) {
        e.stopPropagation();
        handleAbsent(e);
        setPercentage(
            Number(((val.attendedClasses / val.totalClasses) * 100).toFixed(0))
        );
    }

    useEffect(() => {
        function findPercentage() {
            return Number(
                ((val.attendedClasses / val.totalClasses) * 100).toFixed(0)
            );
        }

        if (val.totalClasses !== 0 && percentage < findPercentage()) {
            const val = findPercentage();
            const time = Number((1000 / val).toFixed(5));
            const interval = setTimeout(() => {
                setPercentage((currState) => currState + 1);
            }, time);
            return () => {
                clearInterval(interval);
            };
        }
    }, [percentage, val.attendedClasses, val.totalClasses]);

    useEffect(() => {
        if (val.totalClasses !== 0) {
            setPercentage(
                Number(
                    ((val.attendedClasses / val.totalClasses) * 100).toFixed(0)
                )
            );
        }
    }, [val.attendedClasses, val.totalClasses]);

    return (
        <>
            <div
                className="subject-card"
                onClick={() => navigate(`/subject/${val.id}`)}
                style={{
                    backgroundImage: `linear-gradient(to right bottom, ${
                        colors[(val.id - 1) % 14]
                    }, ${grey})`,
                }}
            >
                <div className="subject-info-wrappper">
                    <p className="subject">{val.subject}</p>
                    <p className="attendence">
                        attendence:{" "}
                        <span>
                            {val.attendedClasses}/{val.totalClasses}
                        </span>
                    </p>
                    <div className="subject-button-wrapper">
                        <button
                            className="present"
                            data-id={val.id}
                            onClick={handleHybridPresent}
                            style={{
                                backgroundImage: `linear-gradient(to right bottom, ${
                                    colors[(val.id - 1) % 14]
                                }, ${grey})`,
                            }}
                        >
                            Present
                        </button>
                        <button
                            className="absent"
                            data-id={val.id}
                            onClick={handleHybridAbsent}
                            style={{
                                backgroundImage: `linear-gradient(to right bottom, ${
                                    colors[(val.id - 1) % 14]
                                }, ${grey})`,
                            }}
                        >
                            Absent
                        </button>
                    </div>
                </div>
                <div
                    className="subject-chart-wrapper"
                    data-percentage={`${percentage}%`}
                >
                    <DoughnutChart data={data} options={options} />
                </div>
            </div>
        </>
    );
};

export default SubjectCard;
