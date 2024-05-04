import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API } from "../Global/Global";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = { name: "", email: "", dob: "", country: "" };

const AddAuthorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [author, setAuthor] = useState(initialValues);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id !== "new") {
      const fetchAuthor = async () => {
        try {
          const { data } = await axios.get(`${API}/author/${id}`);
          setAuthor(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAuthor();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center">
      <h1 className="m-3 heading">
        {id === "new" ? "Add Author's Records...👨🏻‍🌾" : "Update Author's Records...👨🏻‍🌾"}
      </h1>
      <Formik
        enableReinitialize
        initialValues={author}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (id === "new") {
              await axios.post(`${API}/author`, values);
              alert("Added Successfully...👍🏻");
            } else {
              await axios.put(`${API}/author/${id}`, values);
              alert("Updated Successfully...👍🏻");
            }
            navigate("/Author");
          } catch (error) {
            console.log(error);
          }
          resetForm();
        }}
        validationSchema={yup.object({
          name: yup.string().required("Please Enter The Author's name"),
          email: yup.string().required("Please Enter The Author's email").email("Invalid email"),
          dob: yup.string().required("Please Enter the Author's Date of Birth"),
          country: yup.string().required("Please Enter the Author's country"),
        })}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              className="my-2"
              label="name"
              name="name"
              color="secondary"
              focused
              error={Boolean(errors.name) && Boolean(touched.name)}
              helperText={Boolean(touched.name) && errors.name}
            />
            <Field
              as={TextField}
              fullWidth
              className="my-2"
              label="email"
              name="email"
              type="email"
              color="secondary"
              focused
              error={Boolean(errors.email) && Boolean(touched.email)}
              helperText={Boolean(touched.email) && errors.email}
            />
            <Field
              as={TextField}
              fullWidth
              className="my-2"
              label="Date of Birth"
              type="date"
              name="dob"
              color="secondary"
              focused
              error={Boolean(errors.dob) && Boolean(touched.dob)}
              helperText={Boolean(touched.dob) && errors.dob}
            />
            <Field
              as={TextField}
              fullWidth
              className="my-2"
              label="country"
              name="country"
              color="secondary"
              focused
              error={Boolean(errors.country) && Boolean(touched.country)}
              helperText={Boolean(touched.country) && errors.country}
            />
            <Button
              size="large"
              variant="contained"
              color="warning"
              type="submit"
              className="w-50 my-1"
              disabled={!dirty || !isValid}
            >
              {id === "new" ? "Add Author" : "Update Author"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAuthorDetails;