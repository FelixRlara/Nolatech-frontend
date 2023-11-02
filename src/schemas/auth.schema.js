import * as Yup from 'yup';


export const registerSchema = Yup.object({
    name: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .required('Es necesario el nombre'),

    lastname: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .required('Es necesario el apellido'),

    username: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .required('Es necesario usuario'),

    email: Yup.string()
        .email('Este correo ya esta en uso')
        .required('Es necesario el correo'),

    password: Yup.string()
        .min(6, 'tu contraseña es muy corta!')
        .required('Es necesaria la contraseña')

});

export const loginSchema = Yup.object({
    username: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .optional(),
    email: Yup.string()
        .email('Este correo ya esta en uso')
        .optional(),
    password: Yup.string()
        .min(6, 'tu contraseña es muy corta!')
        .required('Es necesaria')

});