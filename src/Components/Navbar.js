import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { authLogout } from "../Actions/bookListActions";
import { myApp } from "../App";
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
  const onLogout = () => {
    dispatch(authLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    myApp
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>

      {state?.isAuthenticated ? null : (
        <li>
          <Link to="login">Login</Link>
        </li>
      )}
      <li>
        {state?.isAuthenticated ? (
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
