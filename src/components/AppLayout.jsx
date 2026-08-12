import {Container} from "./Container.jsx";
import {Outlet} from "react-router";
import {Header} from "./Header.jsx";
import {Footer} from "./Footer.jsx";

export const AppLayout = () => {
  return (
      <div>
        <Container>
          <Header/>
          <Outlet/>
        </Container>
         <Footer/>
      </div>
  );
};