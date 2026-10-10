import { Routes, Route } from "react-router";
import { AppLayout } from "./components/AppLayout.jsx";
import { MainPage } from "./components/MainPage.jsx";
import { AfterSalesContainer } from "./components/AfterSalesContainer.jsx";
import { ProductDetails } from "@/components/ProductDetails.jsx";
import { AboutUsContainer } from "@/components/AboutUsContainer.jsx";
import StandardsPage from "@/components/StandardsPage.jsx";
import Products from '@/components/Products.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<MainPage />} />
                <Route path="/after-sales-service" element={<AfterSalesContainer />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/aboutus" element={<AboutUsContainer />} />
                <Route path="/standards" element={<StandardsPage />} />
              <Route path="/products" element={<Products />} />
            </Route>
        </Routes>
    );
}

export default App;
