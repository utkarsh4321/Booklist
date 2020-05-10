import React, { useContext } from "react";
import { BookListContext } from "../Context/BookList";

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
  const { state } = useContext(BookListContext);
  return (
    <nav>
      <h1>My Booklist on react hooks</h1>
      <p>Currently we have {state.books.length} books </p>
    </nav>
  );
}
export default Navbar;
