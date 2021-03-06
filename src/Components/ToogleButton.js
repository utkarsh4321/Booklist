import React, { useContext, useState, useRef, useEffect } from "react";
import { BookListContext } from "../Context/BookList";
import { AuthContext } from "../Context/AuthContext";

// class ToogleButton extends Component {
//   static contextType = ThemeContext;
//   render() {
//     return <button onClick={this.context.themeToggler}>Toogle Theme</button>;
//   }
// }

// export default ToogleButton;

const ToogleButton = () => {
  const { state, fetchData } = useContext(BookListContext);
  const { state: authState } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const bookTitleInput = useRef(null);
  const bookAuthorInput = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    bookTitleInput.current.focus();
  }, [state.books]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let storedBooks = [...state.books];
    if (storedBooks.length > 0) {
      fetchData({
        method: "POST",
        params: {
          title,
          author,
          index: storedBooks.length - 1 + 1,
          userId: authState.authData.localId,
        },
      });
    } else {
      fetchData({
        method: "POST",
        params: { title, author, index: 0, userId: authState.authData.localId },
      });
    }
    setTitle("");
    setAuthor("");
  };
  function onKeyTitleHandler(e) {
    if (e.key === "Enter") {
      bookAuthorInput.current.focus();
    }
  }
  function onKeyAuthorHandler(e) {
    if (e.key === "Enter") {
      submitRef.current.focus();
    }
  }
  function onKeySubmitHandler(e) {
    formSubmitHandler(e);
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        name="bookName"
        placeholder="Enter book Name "
        value={title}
        ref={bookTitleInput}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyTitleHandler}
        required
      />
      <input
        name="bookAuthor"
        placeholder="Enter book Author"
        ref={bookAuthorInput}
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        onKeyDown={onKeyAuthorHandler}
        required
      />
      <button type="submit" onKeyDown={onKeySubmitHandler} ref={submitRef}>
        Submit
      </button>
    </form>
  );
};

export default ToogleButton;
