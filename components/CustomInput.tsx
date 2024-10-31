import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldPath, useForm, Control } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authFormSchema } from "@/lib/utils"

const formSchema = authFormSchema('sign-up')
interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    type: string
}
const CustomInput = ({ control, name, label, placeholder, type }: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className="form-label">
                        {label}
                    </FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className='input-class'
                                type={name === "password" ? "password" : "text"}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-1' />


                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput
