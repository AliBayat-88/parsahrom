import {Container} from "./Container.jsx";
import {Outlet} from "react-router";
import {Header} from "./Header.jsx";

export const AppLayout = () => {
  return (
    <Container>
      <Header/>
      <Outlet/>
    </Container>
  );
};