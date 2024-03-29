import { Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import "rsuite/dist/rsuite.min.css";
import ulogo from "../assets/img/ulogo.png";
import CharacterAuthorizeIcon from "@rsuite/icons/CharacterAuthorize";
import MemberIcon from "@rsuite/icons/Member";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <>
      <Navbar className="shadow-lg">
        <div className="container mx-auto">
          <Navbar.Brand href="/">
            <img className="w-20" src={ulogo} alt="logo" />
          </Navbar.Brand>
          <Nav>
            <Nav.Item icon={<HomeIcon />}>ANA SAYFA</Nav.Item>
            <Nav.Item>
              <Link to="/services">HİZMETLER</Link>
            </Nav.Item>
            <Nav.Menu title="About">
              <Nav.Item>Company</Nav.Item>
              <Nav.Item>Team</Nav.Item>
              <Nav.Menu title="Contact">
                <Nav.Item>Via email</Nav.Item>
                <Nav.Item>Via telephone</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>
          </Nav>
          <Nav pullRight>
            {!isLoggedIn ? (
              <Nav.Item icon={<CharacterAuthorizeIcon />}>
                <Link to="/login">GİRİŞ</Link>
              </Nav.Item>
            ) : (
              <Nav.Item icon={<MemberIcon />}>
                <Link to="/profile">PROFİL</Link>
              </Nav.Item>
            )}
          </Nav>
        </div>
      </Navbar>
    </>
  );
};
