import React, { useContext, useState, useRef } from "react";
import { BookListContext } from "../Context/BookList";
import {
  setUpdateInputs,
  setInputTitle,
  fetchBooklistSucces,
} from "../Actions/bookListActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { AuthContext } from "../Context/AuthContext";

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
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

function Booklist(props) {
  const { state, fetchData, dispatch } = useContext(BookListContext);
  const [bookItem, setUpdates] = useState({});

  const bookUpdateTitleInput = useRef(null);
  const bookUpdateAuthorInput = useRef(null);

  function updateHandler(bookObj, e) {
    e.stopPropagation();

    setUpdates(bookObj);
    setTimeout(() => {
      if (bookUpdateTitleInput.current) {
        bookUpdateTitleInput.current.focus();
      }
    });
    dispatch(setInputTitle(bookObj));
    dispatch(setUpdateInputs(bookObj.id));
  }

  const onChangeTitleHandler = (e) => {
    dispatch(setInputTitle({ ...state.booksData, title: e.target.value }));
  };
  const onChangeAuthorHandler = (e) => {
    dispatch(setInputTitle({ ...state.booksData, author: e.target.value }));
  };

  const onFocusTitle = (e) => {
    if (e.key === "Enter") {
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
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      state.books,
      result.source.index,
      result.destination.index
    );
    dispatch(fetchBooklistSucces(items));
    let obj = {};
    for (let i = 0; i <= items.length - 1; i++) {
      items[i].index = i;
      obj[items[i].id] = items[i];
    }

    fetchData({ method: "PUT", params: obj });
  }

  function removeBooklistHandler({ id, index: removedIndex }, e) {
    const booksList = JSON.parse(JSON.stringify(state.books));

    let newBook = booksList.reduce((accumulator, current, index) => {
      if (current.id !== id) {
        accumulator[current.id] = current;
        if (current.index > removedIndex) {
          accumulator[current.id]["index"] = index - 1;
        }
      }
      return accumulator;
    }, {});

    fetchData({ method: "DELETE", params: { obj: newBook, id } });
  }
  return (
    <div className="book-list">
      {state.books.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {state.books.map(({ id, title, author, userId }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div className="content">
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
                        <button
                          onClick={updateHandler.bind(this, {
                            id,
                            title,
                            author,
                            index,
                            userId,
                          })}
                        >
                          Update
                        </button>
                        <button
                          onClick={removeBooklistHandler.bind(this, {
                            id,
                            index,
                          })}
                          className="remove_btn"
                        >
                          X
                        </button>{" "}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div>No books found</div>
      )}
    </div>
  );
}

export default Booklist;
