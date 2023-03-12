import { useRef } from "react";
import "./NewSubject.css";
import { getLocalData, setLocalData } from "../../Hooks/useLocalStorage";
import { Link } from "react-router-dom";

const NewSubject = () => {
    const subject = useRef();
    const attendedClasses = useRef();
    const totalClasses = useRef();

    function handleCreateSubject() {
        const subjectValue = subject.current.value;
        const attendedClassesValue = Number(attendedClasses.current.value);
        const totalClassesValue = Number(totalClasses.current.value);

        if (subjectValue === "") {
            alert("Enter subject");
            return;
        }

        const prevSubjects = getLocalData("subjects");
        for (let i = 0; i < prevSubjects.length; i++) {
            if (
                prevSubjects[i].subject.toLowerCase() ===
                subjectValue.toLowerCase()
            ) {
                alert(`${subjectValue} is present`);
                return;
            }
        }

        if (attendedClassesValue > totalClassesValue) {
            alert("Attended classes can't be more than total classes");
            return;
        }

        const val = {
            id: prevSubjects.length + 1,
            subject: subjectValue,
            attendedClasses: attendedClassesValue,
            totalClasses: totalClassesValue,
        };
        setLocalData("subjects", [...prevSubjects, val]);
    }

    return (
        <>
            <section className="create-subject-wrapper">
                <div>
                    <p>
                        <input
                            ref={subject}
                            type="text"
                            name="subject"
                            id="subject"
                            placeholder="Subject"
                            autoComplete="off"
                        />
                    </p>
                    <p>
                        <input
                            ref={attendedClasses}
                            type="number"
                            name="attendedClasses"
                            id="attendedClasses"
                            placeholder="Attended Classes"
                            autoComplete="off"
                        />
                    </p>
                    <p>
                        <input
                            ref={totalClasses}
                            type="number"
                            name="totalClasses"
                            id="totalClasses"
                            placeholder="Total Classes"
                            autoComplete="off"
                        />
                    </p>

                    <hr />
                    <button
                        className="border"
                        type="button"
                        onClick={handleCreateSubject}
                    >
                        Create Subject
                    </button>
                    <Link to={"/"}>
                        <button type="button" className="close-btn border">
                            Back
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default NewSubject;
