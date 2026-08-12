import {Slogan} from "./Slogan.jsx";
import {ProductSlider} from "./ProductSlider.jsx";
import {TitleSection} from "./TitleSection.jsx";

export const MainPage = () => {
  return (
    <div className="flex flex-col gap-y-24">
        <section className="slogan mt-16">
            <Slogan/>
        </section>
        <section className="products">
            <TitleSection title="محصولات"/>
            <ProductSlider/>
        </section>
        <section className="footer">

        </section>
    </div>
  );
};