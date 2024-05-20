import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

const DynamicForm = forwardRef(({fields, onSubmit}, ref) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {}),
  );
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const field = fields.find(field => field.name === name);
    let errorMessage = '';

    if (field && field.validation) {
      if (field.validation.required && !value) {
        errorMessage = field.validation.required;
      }
      if (
        field.validation.pattern &&
        value &&
        !field.validation.pattern.value.test(value)
      ) {
        errorMessage = field.validation.pattern.message;
      }
    }

    setErrors({...errors, [name]: errorMessage});
  };

  const handleSubmit = () => {
    // Implement form submission logic here
    onSubmit(formData);
    console.log(formData);
  };

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit,
  }));

  return (
    <View style={styles.container}>
      {fields.map((field, index) => (
        <View key={index} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            onChangeText={value => handleChange(field.name, value)}
            value={formData[field.name]}
            placeholder={field.label}
            keyboardType={field.type === 'text' ? 'default' : field.type}
          />
          {errors[field.name] && (
            <Text style={styles.error}>{errors[field.name]}</Text>
          )}
        </View>
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default DynamicForm;
