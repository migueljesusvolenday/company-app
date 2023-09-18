import * as yup from 'yup';

export const userSchema = yup.object().shape({

    firstname: yup.string().required("Firstname is required")
    .min(2, "Firstname must have 2 min. letters")
    .trim()
    .max(100, "Firstname must have 100 max. letters")
    .matches(/^[a-zA-Z\s]+$/, "Firstname must have only letters"),
    lastname: yup.string().required("Lastname is required")
    .min(2, "Lastname must have 2 min. letters")
    .trim()
    .max(100, "Lastname must have 100 max. letters")
    .matches(/^[a-zA-Z\s]+$/, "Lastname must have only letters"),
    birthday: yup.string().required("Birthday is required")
    

});

export const userSchemaUpdate = yup.object().shape({
    updatefirstname: yup.string()
    .trim()
    .max(100, "Firstname must have 100 max. letters")
    .matches(/^[a-zA-Z\s]+$/, "Firstname must have only letters"),
    updatelastname: yup.string()
    .trim()
    .max(100, "Lastname must have 100 max. letters")
    .matches(/^[a-zA-Z\s]+$/, "Lastname must have only letters"),

});