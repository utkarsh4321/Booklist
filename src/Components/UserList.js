import React from "react";
import Booklist from "./Booklist";
import BookListContextProvide from "../Context/BookList";
import ToogleButton from "./ToogleButton";

function UserList(props) {
  return (
    <BookListContextProvide>
      {props.state.freshedLogin && <div>Login successfully</div>}
      <ToogleButton />
      <Booklist />
    </BookListContextProvide>
  );
}

export default UserList;
