import { Container, Content, Sidebar, Sidenav, Nav } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Footerr } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Header />
        <main className="container mx-auto h-screen">{children}</main>
        <Footerr />
      </Container>
    </>
  );
};
