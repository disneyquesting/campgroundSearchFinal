import Select from "react-select";
import { useField } from "formik";
import { useState, useCallback } from "react";

export default function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  console.log("props: ", props.initialValues);

  // value is an array now
  const onChange = (value) => {
    setValue(value);
  };

  // use value to make this a  controlled component
  // now when the form receives a value for 'campfeatures' it will populate as expected
  return (
    <Select
      {...props}
      value={state?.value}
      isMulti
      onChange={onChange}
      onBlur={setTouched}
    />
  );
}
