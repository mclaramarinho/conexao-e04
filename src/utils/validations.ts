
export const password = [
    (v: string) => !!v || 'Senha é obrigatória',
    (v: string) => v.length >= 8 || 'Senha deve ter no mínimo 8 caracteres',
    (v: string) => v.length <= 20 || 'Senha deve ter no máximo 20 caracteres',
    (v: string) => /[A-Z]/.test(v) || 'Senha deve ter pelo menos uma letra maiúscula',
    (v: string) => /[a-z]/.test(v) || 'Senha deve ter pelo menos uma letra minúscula',
    (v: string) => /[0-9]/.test(v) || 'Senha deve ter pelo menos um número',
    (v: string) => /[!@#$%^&*()_+]/.test(v) || 'Senha deve ter pelo menos um caractere especial',
];

export const email = [
    (v: string) => !!v || 'Email é obrigatório',
    (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(v) || 'Email deve ser válido',
];

export const notEmpty = [
    (v : string) => !!v || 'Campo é obrigatório',
];

export const maxChars = (max : number, mandatory = true) => [
    ((v : string) => mandatory === false || !!v || 'Campo é obrigatório'),
    (v : string) => !v || v.length <= max || `Campo deve ter no máximo ${max} caracteres`,
];

export const telephone = [  
    (v : string) => !!v || 'Telefone é obrigatório',
    (v : string) => (/^[^A-Za-z]*[0-9]*[^A-Za-z]$/.test(v)) || 'Telefone deve conter apenas números',  
    (v : string) => (v.length >= 11 && v.length <= 15) || 'Telefone deve seguir o modelo 81 9 1234-5678',
]
