import * as z from "zod"

export const RecipeFormSchema = z.object({
    name: z.string().min(1, {
        message: "Please input your name"
    }),
    email: z.string().email({
        message: "Please set a valid email."
    }),
    title: z.string().min(1, {
        message: "Please input the recipe title"
    }),
    description: z.optional(z.string()),
    ingredients: z.string().min(1, {
        message: "Please input the ingredients"
    }),
    instructions: z.string().min(1, {
        message: "Please input the instructions"
    })
})