import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API } from "../Global/Global";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = { title: "", author: "", isbn: "", publication_date: "" };

const AddBooks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(initialValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === "new") {
      setLoading(false);
    } else {
      const fetchBook = async () => {
        try {
          const { data } = await axios.get(`${API}/book/${id}`);
          setBook(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchBook();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center">
      <h1 className="m-3 heading">
        {id === "new" ? "Add Books...📚" : "Update Books...📚"}
      </h1>
      <Formik
        enableReinitialize
        initialValues={book}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (id === "new") {
              await axios.post(`${API}/book`, values);
              alert("Added Successfully...👍🏻");
            } else {
              await axios.put(`${API}/book/${id}`, values);
              alert("Updated Successfully...👍🏻");
            }
            navigate("/Books");
          } catch (error) {
            console.log(error);
          }
          resetForm();
        }}
        validationSchema={yup.object({
          title: yup.string().required("Please Enter The Book's title"),
          author: yup.string().required("Please Enter The author's Name"),
          isbn: yup.string().required("Please Enter the isbn Number"),
          publication_date: yup
            .string()
            .required("Please Enter the Publication Date"),
        })}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              className="my-2"
              label="title"
              name="title"
              color="secondary"
              focused
              error={Boolean(errors.title) && Boolean(touched.title)}
              helperText={Boolean(touched.title) && errors.title}
            />
            <Field
              as={TextField}
              fullWidth
              className="my-2"
              label="author"
              name="author"
              color="secondary"
              focused
              error={Boolean(errors.author) && Boolean(touched.author)}
              helperText={Boolean(touched.author) && errors.author}
            />
            <Field
              as={TextField}
              fullWidth
              className="my-2"
              label="isbn NO"
              name="isbn"
              color="secondary"
              focused
              error={Boolean(errors.isbn) && Boolean(touched.isbn)}
              helperText={Boolean(touched.isbn) && errors.isbn}
            />
            <Field
              as={TextField}
              fullWidth
              className="my-2"
              label="Publication Date"
              name="publication_date"
              type="date"
              color="secondary"
              focused
              error={
                Boolean(errors.publication_date) &&
                Boolean(touched.publication_date)
              }
              helperText={
                Boolean(touched.publication_date) && errors.publication_date
              }
            />
            <Button
              size="large"
              variant="contained"
              color="warning"
              type="submit"
              className="w-50 my-1"
              disabled={!dirty || !isValid}
            >
              {id === "new" ? "Add Book" : "Update Book"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBooks;