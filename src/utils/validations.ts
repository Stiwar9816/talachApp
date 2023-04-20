import { email, required, maxLength, helpers } from '@vuelidate/validators'
// Interface
import type { Rules } from '@/interface'

export const rules: Rules = {
    name: { required: helpers.withMessage('El campo nombre es requerido', required) },
    email: {
        required: helpers.withMessage('El campo correo electronico es requerido', required),
        email: helpers.withMessage('El texto ingresado no es correo electronico valido', email)
    },
    phone: {
        required: helpers.withMessage('El campo teléfono es requerido', required),
        maxLengthValue: helpers.withMessage('Este campo admite máximo 10 caracteres', maxLength(10))
    }
}