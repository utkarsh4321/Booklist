import React, { useContext, useState, useRef } from "react";
import { BookListContext } from "../Context/BookList";
import {
  setUpdateInputs,
  setInputTitle,
  fetchBooklistSucces,
} from "../Actions/bookListActions";

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
  const { state, fetchData, dispatch } = useContext(BookListContext);
  const [bookItem, setUpdates] = useState({});
  const bookUpdateTitleInput = useRef(null);
  const bookUpdateAuthorInput = useRef(null);

  function updateHandler(bookObj, e) {
    e.stopPropagation();
    console.log(bookObj);
    // bookUpdateTitleInput.current.focus();
    setUpdates(bookObj);
    setTimeout(() => {
      if (bookUpdateTitleInput.current) {
        bookUpdateTitleInput.current.focus();
      }
    });
    dispatch(setInputTitle(bookObj));
    dispatch(setUpdateInputs(bookObj.id));
    // console.log(ReactDOM.findDOMNode());
  }
  // window.onclick = () => {
  //   dispatch(setUpdateInputs(false));
  // };
  // document.onclick = () => {
  //   dispatch(setUpdateInputs(false));
  // };
  const closeInput = () => {
    // console.log("ssaga");
    dispatch(setUpdateInputs(""));
  };
  const onChangeTitleHandler = (e) => {
    dispatch(setInputTitle({ ...state.booksData, title: e.target.value }));
  };
  const onChangeAuthorHandler = (e) => {
    dispatch(setInputTitle({ ...state.booksData, author: e.target.value }));
  };
  // function Input({ type, onChange, value }, ref) {
  //   return <input type={type} onChange={onChange} value={value} ref={ref} />;
  // }
  const onFocusTitle = (e) => {
    if (e.key === "Enter") {
      // console.log(e);
      bookUpdateAuthorInput.current.focus();
    }
  };
  const onFocusAuthor = (e) => {
    if (e.key === "Enter") {
      if (
        state.booksData.title.length > 0 &&
        state.booksData.author.length > 0
      ) {
        if (
          bookItem.title !== state.booksData.title ||
          bookItem.author !== state.booksData.author
        ) {
          fetchData({
            method: "UPDATE",
            params: { id: state.booksData.id, data: state.booksData },
          });
        }
      }
    }
  };
  function onDragHandler(id, index, e) {
    console.log(index, id);
    const dt = e.dataTransfer;
    dt.setData("text/plain", index);
    dt.effectAllowed = "move";
    console.log(e.dataTransfer);
  }
  function handleDrop(e, index) {
    const pieceOrder = e.dataTransfer.getData("text");
    const booksArray = [...state.books];
    const data = booksArray.find((item, i) => i === +pieceOrder);
    booksArray[+pieceOrder] = booksArray[index];
    booksArray[index] = data;
    dispatch(fetchBooklistSucces(booksArray));
  }
  return (
    <div className="book-list" onClick={closeInput}>
      {state.books.length > 0 ? (
        <ul>
          {state.books.map(({ id, title, author }, index) => (
            <div
              style={{
                border: 2,
                borderColor: "black",
                padding: 2,
                borderStyle: "solid",
              }}
              key={id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
            >
              <li
                className="booklist__item"
                draggable
                onDragStart={onDragHandler.bind(this, id, index)}
              >
                <div className="content" onClick={(e) => e.stopPropagation()}>
                  <div className="title">
                    {(state.updatedId === id && (
                      <input
                        className="titleInput"
                        type="text"
                        ref={bookUpdateTitleInput}
                        value={state.booksData.title}
                        onChange={onChangeTitleHandler}
                        onKeyDown={onFocusTitle}
                      />
                    )) ||
                      title}
                  </div>
                  <div className="author">
                    {(state.updatedId === id && (
                      <input
                        type="text"
                        ref={bookUpdateAuthorInput}
                        value={state.booksData.author}
                        onChange={onChangeAuthorHandler}
                        onKeyDown={onFocusAuthor}
                      />
                    )) ||
                      author}
                  </div>
                </div>
                {/*<button onClick={() => fetchData({ method: "id", params: id })}>
                Update
          </button>*/}
                <button
                  onClick={updateHandler.bind(this, {
                    id,
                    title,
                    author,
                    index,
                  })}
                >
                  Update
                </button>
                <button
                  onClick={() => fetchData({ method: "DELETE", params: id })}
                  className="remove_btn"
                >
                  X
                </button>{" "}
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <div>No books found</div>
      )}
    </div>
  );
}

export default Booklist;
