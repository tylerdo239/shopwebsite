import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../store/store";
import "./Navbar.css";

// Navbar component inside Home Page
function Navbar() {
  // Use redux to set login state and data state of login user
  const login = useSelector((state) => state.login.login);
  const userData = useSelector((state) => state.login.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function handle log out and change to Home page
  const logout = () => {
    dispatch(loginActions.ON_LOGOUT());
    localStorage.removeItem("loginArr");
    navigate("/");
    window.scrollTo(0, 0);
  };

  // Data for navbar when not have user log in
  const dataNavbar = [
    {
      name: "Home",
      path: "/",
    },
    { name: "Shop", path: "/shop" },
    { name: "Cart", path: "/cart" },
    { name: "Login", path: "/login/signin" },
  ];

  let content = "";

  if (login) {
    // Check if have user log in then clear the Login on navbar and render user name with log out button
    dataNavbar.pop();
    content = (
      <div className="user-login">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        <p>{userData[0].name}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
        </svg>
        <button onClick={logout}>{`( Logout )`}</button>
      </div>
    );
  }

  return (
    <nav>
      <div className="nav-link">
        {dataNavbar.map((page) => (
          <NavLink
            key={page.name}
            to={page.path}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {page.name === "Cart" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
              >
                <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64H48c8.8 0 16 7.2 16 16V368c0 44.2 35.8 80 80 80h18.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H450.7c-1.8 5-2.7 10.4-2.7 16c0 26.5 21.5 48 48 48s48-21.5 48-48c0-5.6-1-11-2.7-16H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H144c-8.8 0-16-7.2-16-16V80C128 35.8 92.2 0 48 0H32zM192 80V272c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H464V176c0 5.9-3.2 11.3-8.5 14.1s-11.5 2.5-16.4-.8L400 163.2l-39.1 26.1c-4.9 3.3-11.2 3.6-16.4 .8s-8.5-8.2-8.5-14.1V32H240c-26.5 0-48 21.5-48 48z" />
              </svg>
            )}
            {page.name === "Login" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            )}
            <p>{page.name}</p>
          </NavLink>
        ))}
        {login && content}
        <div></div>
      </div>
      <h1>BOUTIQUE</h1>
    </nav>
  );
}

export default Navbar;
