import * as Yup from 'yup';


export const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .required('Es necesario'),

    lastname: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .required('Es necesario'),

    username: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .required('Es necesario'),

    email: Yup.string()
        .email('Este correo ya esta en uso')
        .required('Es necesario'),

    password: Yup.string()
        .min(6, 'tu contraseña es muy corta!')
        .required('Es necesaria')

});

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .required('Es necesario')
        .optional(),
    email: Yup.string()
        .email('Este correo ya esta en uso')
        .required('Es necesario')
        .optional(),
    password: Yup.string()
        .min(6, 'tu contraseña es muy corta!')
        .required('Es necesaria')

});