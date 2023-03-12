import { useState } from "react";
import { Link } from "react-router-dom";
import { getLocalData, setLocalData } from "../../Hooks/useLocalStorage.js";
import "./Home.css";
import SubjectCard from "../../Components/SubjectCard";
import AllSubjectsCard from "./AllSubjectsCard.js";
import { ReactComponent as New } from "../../assets/Images/New.svg";

const Home = () => {
    const [subjects, setSubjects] = useState(getLocalData("subjects"));

    function handleHybridData(key, val) {
        setSubjects(val);
        setLocalData(key, val);
    }

    function handlePresent(e) {
        const id = e.target.getAttribute("data-id");

        const val = subjects.map((val) => {
            if (val.id === Number(id)) {
                return {
                    id: val.id,
                    subject: val.subject,
                    attendedClasses: val.attendedClasses + 1,
                    totalClasses: val.totalClasses + 1,
                };
            }
            return val;
        });
        handleHybridData("subjects", val);
    }

    function handleAbsent(e) {
        const id = e.target.getAttribute("data-id");

        const val = subjects.map((val) => {
            if (val.id === Number(id)) {
                return {
                    id: val.id,
                    subject: val.subject,
                    attendedClasses: val.attendedClasses,
                    totalClasses: val.totalClasses + 1,
                };
            }
            return val;
        });
        handleHybridData("subjects", val);
    }

    return (
        <>
            <section className="home">
                <div className="home-wrapper">
                    <Link to={"/subject/new"}>
                        <button className="new-btn border">
                            <New /> <p className="offset-1">New Subject</p>
                        </button>
                    </Link>
                    <AllSubjectsCard subjects={subjects} />

                    {subjects.length === 0 ? (
                        <p>No Subjects</p>
                    ) : (
                        subjects.map((val) => {
                            return (
                                <SubjectCard
                                    key={val.id}
                                    val={val}
                                    handlePresent={handlePresent}
                                    handleAbsent={handleAbsent}
                                />
                            );
                        })
                    )}
                </div>
            </section>
        </>
    );
};

export default Home;
