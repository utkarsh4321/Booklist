import React, { useContext } from "react";
// import { BookListContext } from "../Context/BookList";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { authLogout } from "../Actions/bookListActions";
// const CouunterContext = React.createContext("123");

// class Navbar extends Component {
//   // static contextType = ThemeContext;

//   render() {
//     return (
//       <AuthContext.Consumer>
//         {(authContext) => (
//           <ThemeContext.Consumer>
//             {(themeContext) => {
//               const { isAuthenticated, toggleAuth } = authContext;
//               const { name, hobby, isLight, dark, light } = themeContext;
//               // console.log(this.context.name);
//               const theme = isLight ? light : dark;
//               return (
//                 <div style={{ background: theme.bg, color: theme.tc }}>
//                   <nav>
//                     <h1>{name + " " + hobby}</h1>
//                     <button onClick={toggleAuth}>
//                       {isAuthenticated ? "Log IN" : "Log out"}
//                     </button>
//                     <ul>
//                       <li>Home</li>
//                       <li>About</li>
//                       <li>Contact</li>
//                     </ul>
//                   </nav>
//                 </div>
//               );
//             }}
//           </ThemeContext.Consumer>
//         )}
//       </AuthContext.Consumer>
//     );
//   }
// }

// export default Navbar;
function Navbar(props) {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const onLogout = () => {
    dispatch(authLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    history.push("/");
  };
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>

      {state?.authData?.idToken ? null : (
        <li>
          <Link to="login">Login</Link>
        </li>
      )}
      <li>
        {state?.authData?.idToken ? (
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <Link to="signup">Signup</Link>
        )}
      </li>
    </ul>
  );
}
export default Navbar;
