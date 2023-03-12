import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AllSubjectsCard.css";
import DoughnutChart from "../../Components/DoughnutChart";
import colors, { grey } from "../../Data/colors";

const AllSubjectsCard = ({ subjects }) => {
    const [percentage, setPercentage] = useState(0);
    const attendedClassesVal = subjects.reduce(
        (sum, val) => sum + val.attendedClasses,
        0
    );
    const totalClassesVal = subjects.reduce(
        (sum, val) => sum + val.totalClasses,
        0
    );
    const data = {
        datasets: [
            {
                data: [
                    ...subjects.map((val) => val.attendedClasses),
                    totalClassesVal === 0
                        ? 2
                        : totalClassesVal - attendedClassesVal,
                ],
                backgroundColor: [
                    ...subjects.map((val) => colors[(val.id - 1) % 14]),
                    grey,
                ],
                borderRadius: 100,
                borderWidth: 0,
                spacing: 2,
            },
        ],
    };
    const options = {
        cutout: 83,
    };

    useEffect(() => {
        function findPercentage() {
            return Number(
                ((attendedClassesVal / totalClassesVal) * 100).toFixed(0)
            );
        }

        if (totalClassesVal !== 0 && percentage < findPercentage()) {
            const val = findPercentage();
            const time = Number((1000 / val).toFixed(5));
            const interval = setTimeout(() => {
                setPercentage((currState) => currState + 1);
            }, time);
            return () => {
                clearInterval(interval);
            };
        }
    }, [percentage, attendedClassesVal, totalClassesVal]);

    useEffect(() => {
        if (totalClassesVal !== 0) {
            setPercentage(
                Number(
                    ((attendedClassesVal / totalClassesVal) * 100).toFixed(0)
                )
            );
        }
    }, [attendedClassesVal, totalClassesVal]);

    return (
        <>
            <section className="all-subjects-card border">
                <div className="all-subjects-card-wrapper">
                    <h2>All Subjects</h2>
                    <p className="all-subjects-card-attendence">
                        attendence:{" "}
                        <span>
                            {attendedClassesVal}/{totalClassesVal}
                        </span>
                    </p>
                    <div>
                        <div className="all-subject-info">
                            <div className="all-subjects-chart-wrapper">
                                <DoughnutChart data={data} options={options} />
                            </div>
                            <div className="all-subject-percentage">
                                <h2>
                                    {percentage}
                                    <span>%</span>
                                </h2>
                            </div>
                        </div>
                        <div className="all-subjects-show-subjects">
                            {subjects.map((val) => (
                                <Link
                                    to={`/subject/${val.id}`}
                                    key={val.id}
                                    className="all-subjects-subject-wrapper"
                                >
                                    <p
                                        className="all-subjects-color"
                                        style={{
                                            backgroundColor: `${
                                                colors[(val.id - 1) % 14]
                                            }`,
                                        }}
                                    ></p>
                                    <p className="all-subjects-subject">
                                        {val.subject}
                                    </p>
                                </Link>
                            ))}
                            <div className="all-subjects-subject-wrapper">
                                <p
                                    className="all-subjects-color"
                                    style={{
                                        backgroundColor: `${grey}`,
                                    }}
                                ></p>
                                <p className="all-subjects-subject">Absents</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AllSubjectsCard;
