import { Container, Logo, LogoutBtn } from "../index";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { Link } from "react-router-dom";
import { UserRootState } from "../../redux/slices/UserSlice";

function Header() {
  const useTypedSelector: TypedUseSelectorHook<UserRootState> = useSelector;
  const authStatus = useTypedSelector((state) => state.user.isLoggedIn);
  const role=useTypedSelector((state)=>state.user.role);

  const navItems = [
    {
      name: "Home",
      slug: "/user",
      active: (authStatus && role!=='doctor'),
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: (!authStatus),
    },
    
    {
      name: "Your Problem",
      slug: `/user/problem`,
      active: (authStatus && role!=='doctor'),
    },
    {
      name: "Blog",
      slug: `/user/blog`,
      active: authStatus,
    },
    {
      name: "Profile",
      slug: `/user/profile`,
      active: (authStatus && role!=='doctor'),
    },
    {
      name:'Home',
      slug:'/doctor',
      active:(authStatus && role==='doctor')
    },
    {
      name:'Schedule',
      slug:'/doctor/schedule',
      active:(authStatus && role==='doctor')
    },
    // {
    //   name:'Signup',
    //   slug:'/doctor/signup',
    //   active:(authStatus && role==='doctor')
    // },
    {
      name:'Profile',
      slug:'/doctor/profile',
      active:(authStatus && role==='doctor')
    }
  ];

  return (
    <header>
      <Container>
        <nav>
          <div>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul>
            {navItems.map((item) => {
              if (item.active) {
                return (
                  <li key={item.slug}>
                    <Link to={item.slug}>{item.name}</Link>
                  </li>
                );
              }
              return null;
            })}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
