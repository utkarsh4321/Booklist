import React, { useContext, useState } from "react";
import { BookListContext } from "../Context/BookList";

// class Booklist extends Component {
//   static contextType = ThemeContext;

//   render() {
//     const { isLight, dark, light } = this.context;
//     const theme = isLight ? light : dark;

//     return (
//       <div
//         className="book-list"
//         style={{ background: theme.bg, color: theme.tc }}
//       >
//         <ul>
//           <li style={{ background: theme.ui, color: theme.bg }}>
//             Think like a monk
//           </li>
//           <li style={{ background: theme.ui, color: theme.bg }}>
//             Three Mistakes of my life
//           </li>
//           <li style={{ background: theme.ui, color: theme.bg }}>
//             Dhoni the untold story
//           </li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default Booklist;
function Booklist(props) {
  const { state, fetchData } = useContext(BookListContext);
  const [isUpdateButtonClicked, setUpdates] = useState(false);
  const updateHandler = () => {
    setUpdates(!isUpdateButtonClicked);
  };

  return (
    <div className="book-list">
      {state.books.length > 0 ? (
        <ul>
          {state.books.map(({ id, title, author }) => (
            <li key={id} className="booklist__item">
              <div className="content">
                <div className="title">
                  {(isUpdateButtonClicked && (
                    <input type="text" value={title} onChange={() => null} />
                  )) ||
                    title}
                </div>
                <div className="author">{author}</div>
              </div>
              {/*<button onClick={() => fetchData({ method: "id", params: id })}>
                Update
          </button>*/}
              <button onClick={updateHandler}>Update</button>
              <button
                onClick={() => fetchData({ method: "DELETE", params: id })}
                className="remove_btn"
              >
                X
              </button>{" "}
            </li>
          ))}
        </ul>
      ) : (
        <div>No books found</div>
      )}
    </div>
  );
}

export default Booklist;
