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
                    <Route path="/" element={<Home />} />
                    <Route path="/subject">
                        <Route path="/subject/new" element={<NewSubject />} />
                        <Route path={`/subject/:id`} element={<Subject />} />
                    </Route>
                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
