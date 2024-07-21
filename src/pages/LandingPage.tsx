import { Outlet } from "react-router-dom";
import { Container, Header, Footer } from "../components/index";

function LandingPageLayout() {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
