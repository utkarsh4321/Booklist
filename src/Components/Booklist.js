import React, { useContext, useState, useRef } from "react";
import { BookListContext } from "../Context/BookList";
import {
  setUpdateInputs,
  setInputTitle,
  fetchBooklistSucces,
  getSingleBooklist,
} from "../Actions/bookListActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  // const [draggedFrom, setDragFrom] = useState(null);
  // const [draggedTo, setDragTo] = useState(null);
  // const [dragged, setDragged] = useState(null);
  // const [dragedItem, setDragedItem] = useState(null);
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
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    console.log(result.destination, result.source);
    const items = reorder(
      state.books,
      result.source.index,
      result.destination.index
    );
    console.log(items);
    dispatch(fetchBooklistSucces(items));
    let obj = {};
    for (let i = 0; i <= items.length - 1; i++) {
      items[i].index = i;
      obj[items[i].id] = items[i];
    }

    // console.log(items);
    console.log(obj);
    // // this.setState({
    // //   items
    // // });
    // console.log(obj);
    fetchData({ method: "PUT", params: obj });
  }

  // function onDragHandler(id, index, e) {
  //   console.log(index, id);
  //   const dt = e.dataTransfer;
  //   dt.setData("text/plain", index);
  //   dt.effectAllowed = "move";
  //   setDragFrom(index);
  //   setDragged(true);
  //   setDragedItem(state.books[index]);
  //   console.log(e.dataTransfer);
  //   console.log("On drag handler");
  // }
  // function handleDrop(e, index) {
  //   const pieceOrder = e.dataTransfer.getData("text");
  //   const booksArray = [...state.books];

  //   // let dragedTo = booksArray[draggedTo];
  //   // setDragged(false);
  //   // console.log(
  //   //   booksArray,
  //   //   "This is bookArray from end",
  //   //   draggedTo,
  //   //   draggedFrom
  //   // );

  //   // let dragedFrom = booksArray[draggedFrom];
  //   // booksArray[draggedTo] = dragedFrom;
  //   // booksArray[draggedFrom] = dragedTo;
  //   console.log(dragedItem, index, pieceOrder);
  //   const data = booksArray.find((item, i) => i === index);
  //   booksArray.length = 0;
  //   console.log(booksArray);
  //   console.log(data);
  //   booksArray[index] = dragedItem;
  //   booksArray[+pieceOrder] = data;
  //   dispatch(fetchBooklistSucces(booksArray));
  // }
  // function onDragEnterHandler(id, index, e) {
  //   const booksArrays = [...state.books];
  //   console.log(booksArrays, "This is bookArray", draggedFrom, index);
  //   setDragTo(index);
  //   if (index !== draggedFrom) {
  //     let dragedTo = booksArrays[index];

  //     let dragedFrom = booksArrays[draggedFrom];
  //     // booksArrays[index] = {};
  //     booksArrays[draggedFrom] = dragedTo;
  //     console.log(dragedTo, dragedFrom, booksArrays);
  //     dispatch(fetchBooklistSucces(booksArrays));
  //   }
  //   // const data = booksArrays.find((item, i) => i === index);
  //   // booksArrays[dragFrom] = data;
  //   // booksArrays[index] = {};
  // }
  return (
    <div className="book-list" onClick={closeInput}>
      {state.books.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {state.books.map(({ id, title, author }, index) => (
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
                          onClick={() =>
                            fetchData({ method: "DELETE", params: id })
                          }
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
