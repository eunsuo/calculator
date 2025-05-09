import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./pages/HomeView";
import './App.css';

const App = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeView />} />
        </Routes>
    </BrowserRouter>
    );
};

export default App;