import Select from 'react-select';
import { useField } from 'formik';
import { useState, useCallback } from 'react';

export default function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = ({ value }) => {
    setValue(value.value);
  };

  return (
    <Select
      isMulti
      isClearable
      {...props}
      onChange={e => {
        e.map(feature => {
          console.log(feature.label);
          return setValue(feature.value);
        });
      }}
      onBlur={setTouched}
    />
  );
}
