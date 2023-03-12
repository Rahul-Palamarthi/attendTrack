import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Subject from "./Pages/Subject";
import NewSubject from "./Pages/NewSubject";
import About from "./Pages/About";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/attendTrack" element={<Home />} />
                    <Route path="/attendTrack/subject">
                        <Route
                            path="/attendTrack/subject/new"
                            element={<NewSubject />}
                        />
                        <Route
                            path={`/attendTrack/subject/:id`}
                            element={<Subject />}
                        />
                    </Route>
                    <Route path="/attendTrack/about" element={<About />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
