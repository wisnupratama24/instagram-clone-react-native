import React from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import { globalStyles } from "../../assets";
import { color } from "../../constants/color";
import { ErrorMessage } from "../../components";
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
              <TextInput
                style={[
                  styles.textInput,
                  errors.name && touched.name ? styles.textInputError : null,
                ]}
                placeholder='Name'
                name='name'
                value={values.name}
                onBlur={handleBlur("name")}
                onChangeText={handleChange("name")}
              />

              {errors.name && touched.name ? (
                <ErrorMessage message={errors.name} />
              ) : null}

              <TextInput
                style={[
                  styles.textInput,
                  errors.email && touched.email ? styles.textInputError : null,
                ]}
                placeholder='Email'
                keyboardType='email-address'
                name='email'
                value={values.email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
              />

              {errors.email && touched.email ? (
                <ErrorMessage message={errors.email} />
              ) : null}

              <TextInput
                style={[
                  styles.textInput,
                  errors.password && touched.password
                    ? styles.textInputError
                    : null,
                ]}
                placeholder='Password'
                name='password'
                secureTextEntry={true}
                onBlur={handleBlur("password")}
                value={values.password}
                onChangeText={handleChange("password")}
              />

              {errors.password && touched.password ? (
                <ErrorMessage message={errors.password} />
              ) : null}

              <Pressable
                onPress={handleSubmit}
                disabled={isValid && dirty}
                style={
                  isValid && dirty
                    ? [
                        styles.button,
                        {
                          backgroundColor: color.primary,
                        },
                      ]
                    : [
                        styles.button,
                        {
                          backgroundColor: color.blue[300],
                        },
                      ]
                }>
                <Text style={styles.textButton}>Create an Account</Text>
              </Pressable>
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
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
  },
  textInputError: {
    borderColor: color.red[600],
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    marginTop: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 12,
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
