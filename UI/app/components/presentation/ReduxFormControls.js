import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

// Method to create a validatable TextArea control
export const ReduxFormTextArea = ({ input: { onChange }, label, touched, error, warning }) => {
    return _renderField({
        controlJsx: (<TextInput style={styles.control} onChange={onChange} />), 
        label,
        touched,
        error, 
        warning
    });
};

// Generic method to create a Field
const _renderField = ({ controlJsx, label, touched, error, warning }) => {
    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.label}>{label}: </Text>
                {controlJsx}
            </View>
            {touched && 
                (error && 
                    <Text styles={styles.error}>{error}</Text>
                ) || 
                (warning && 
                    <Text styles={styles.warning}>{warning}</Text>
                )
            }
        </View>
    );
};

// PropTypes for all Controls
const TextRenderInput = {
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    touched: PropTypes.string,
    error: PropTypes.string,
    warning: PropTypes.string
};

const ControlProps = {
    controlJsx: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    touched: PropTypes.string,
    error: PropTypes.string,
    warning: PropTypes.string
};

_renderField.propTypes = PropTypes.shape(ControlProps).isRequired;
ReduxFormTextArea.propTypes = PropTypes.shape(TextRenderInput).isRequired;

// Validation methods
export const required = (value) => (value ? undefined : 'Required');
export const maxLength = (max) => (value => value && value.length > max ? 'Must be ${max} characters or less' : undefined);
export const minLength = (min) => (value => value && value.length < min ? 'Must be ${min} characters or more' : undefined);
export const maxDescriptionLength = maxLength(1024); 
export const number = (value) => (value && isNaN(Number(value)) ? 'Must be numeric' : undefined);
export const minValue = min => (value) => (value && value < min ? 'Must be at least ${min}' : undefined);
export const minValue18 = minValue(18);
export const email = (value) => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined);


// StyleSheet 
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },

    label: {
        flex: 1
    },

    control: {
        flex: 2
    },

    error: {
        color: 'red'
    },

    warning: {
        color: 'orange'
    }
});