import axios from "axios";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API } from "../Global/Global";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

const GetBooks = () => {
  const [books, setBooks] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    axios.get(`${API}/book`).then((res) => setBooks(res.data));
  }, []);
  

  const handleDelete = async (book) => {
    const confirm = window.confirm("Are You Sure to Delete?");
    if (confirm) {
      try {
        await axios.delete(`${API}/book/${book.id}`);
        setBooks(books.filter((b) => b.id !== book.id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="header">Book Details...📚</h1>
      <div className="container-fluid">
        <div className="d-flex justify-content-end px-4 my-3">
          <IconButton
            aria-label="Add"
            color="success"
            size="small"
            onClick={() => Navigate("/Books/new")}
          >
            <AddBoxIcon />
            Add Books
          </IconButton>
        </div>
        <table className="table table-light border-dark table-bordered table-striped text-center ">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Book's Title</th>
              <th>Book's Author</th>
              <th>ISBN Number</th>
              <th>Publication Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.publication_date}</td>
                <td className="d-flex justify-content-center">
                  <IconButton
                    aria-label="edit"
                    color="secondary"
                    size="large"
                    onClick={() => Navigate(`/Books/${book.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    size="large"
                    onClick={() => {
                      handleDelete(book);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetBooks;
