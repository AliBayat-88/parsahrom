import { Routes, Route } from "react-router"; // یا react-router
import { AppLayout } from "./components/AppLayout.jsx";
import {MainPage} from "./components/MainPage.jsx";
import {AfterSalesContainer} from "./components/AfterSalesContainer.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<MainPage/>}/>
                <Route path="/after-sales-service" element={<AfterSalesContainer/>}/>
            </Route>
        </Routes>
    );
}

// #0f172a

export default App;