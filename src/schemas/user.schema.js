import * as Yup from 'yup';

export const userSchema = Yup.object({
    name: Yup.string()
        .min(2, 'minimo 2 caracteres!')
        .max(20, 'maximo 20 caracteres!')
        .required('Se necesita el nombre'),
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
        .min(6)
        .required('Es necesaria')

})