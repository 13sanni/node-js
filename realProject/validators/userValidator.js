import { z } from "zod"

export const registerUserSchema = z.object({
name:z.string().min(1),
email:z.email({
    message:"invalid email"
}),
password:z.string().min(6)
}).strict();

 export const loginUserSchema = z.object({
email:z.email({
    message:"invalid email"
}),
password:z.string().min(6)
}).strict();

