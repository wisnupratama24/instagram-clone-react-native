import React from "react";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import firebase from "firebase";

import { globalStyles } from "../../assets";
import { color } from "../../constants/color";
import { FormButton, FormInput } from "../../components";
import { min } from "../../constants/error";

const initalValues = {
  email: "",
  password: "",
  name: "",
};

const regisetSchema = yup.object({
  name: yup.string().required().min(4, min("Name", 4)),
  email: yup.string().required().email(),
  password: yup.string().required().min(5, min("Password", 5)),
});

const Register = () => {
  const submitHandler = (values, actions) => {
    const { email, name, password } = values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
    actions.resetForm();
  };

  return (
    <>
      <View style={globalStyles.container}>
        <Formik
          validationSchema={regisetSchema}
          initialValues={initalValues}
          onSubmit={(values, actions) => submitHandler(values, actions)}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <View style={styles.view}>
              <Text style={styles.textTitle}> Instaclone</Text>
              <FormInput
                isValid={errors.name && touched.name}
                placeholder='Name'
                errorMessage={errors.name}
                name='name'
                value={values.name}
                onBlur={handleBlur("name")}
                onChangeText={handleChange("name")}
              />

              <FormInput
                isValid={errors.email && touched.email}
                errorMessage={errors.email}
                placeholder='Email'
                keyboardType='email-address'
                name='email'
                value={values.email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
              />

              <FormInput
                isValid={errors.password && touched.password}
                errorMessage={errors.password}
                placeholder='Password'
                name='password'
                secureTextEntry={true}
                onBlur={handleBlur("password")}
                value={values.password}
                onChangeText={handleChange("password")}
              />

              <FormButton
                validForm={isValid && dirty}
                label='Create an Account'
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
      <View style={styles.divider} />
      <View style={styles.footer}>
        <Text style={styles.textFooter}> Have an account? </Text>
        <Pressable>
          <Text style={styles.textHref}> Sign in now</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textTitle: {
    fontSize: 45,
    fontFamily: "GrandHotel-Regular",
  },
  divider: {
    width: "100%",
    borderColor: color.gray[200],
    borderWidth: 1,
  },
  footer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textFooter: {
    textAlign: "center",
    color: color.gray[400],
    fontSize: 13,
  },
  textHref: {
    fontSize: 13,
    color: color.indigo[900],
    fontWeight: "bold",
  },
});
