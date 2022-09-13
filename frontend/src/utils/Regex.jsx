// Création de REGEX Password & Email

export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
)

// export const validPassword = new RegExp(
//     '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$'
// )
// export const validPassword = password => {
//     const re = '^[A-Za-z0-9]$';
//     return re.test(password);
//   };
