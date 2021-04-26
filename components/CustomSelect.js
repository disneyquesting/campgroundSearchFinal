import Select from "react-select";
import { useField } from "formik";
import { useState, useCallback } from "react";

export default function SelectField(props, initialValues) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

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
      aria-label="Select Features to Search By"
      onChange={onChange}
      onBlur={setTouched}
      instanceId="campFeatures"
    />
  );
}
