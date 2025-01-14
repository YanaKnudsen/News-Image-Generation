"use client"
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import createAIImg from "@/app/actions/client/create-ai-img";

const newsSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title must not exceed 100 characters")
        .refine((val) => val.replace(/\s/g, '').length >= 5, {
            message: "Title must have at least 5 non-empty characters",
        })
        .refine(val => val !== '', {
            message: "Title cannot be empty", // Ensure the description is not empty after trimming
        }),
    description: z
        .string()
        .trim()
        .min(20, "Post text must be at least 20 characters long")
        .refine((val) => val.replace(/\s/g, '').length >= 20, {
            message: "Description must have at least 20 non-empty characters",
        })
        .refine(val => val !== '', {
            message: "Description cannot be empty", // Ensure the description is not empty after trimming
        }),
});

export default function PostForm() {
    type Schema = z.infer<typeof newsSchema>
    const { register, setValue,getValues ,reset,setError,
        formState: { errors,isValid }, } = useForm<Schema>({ mode: 'onChange' ,
        resolver: zodResolver(newsSchema),
    })

    function generateImg(){
        const values = getValues();
        createAIImg(values);
    }


    return (
        <div className="w-full min-w-screen flex p-8 pb-20 sm:p-20 flex-col p">
            <form  className="flex flex-col gap-5 w-full">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Write
                </h1>
                <div className="flex flex-col gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">title</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder={"title"}
                            {...register("title")}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">content</Label>
                        <Textarea placeholder={"content"}
                                  id="description"
                                  required
                                  className="min-h-[350px] max-h-[350px]"
                                  {...register("description")}
                        />
                    </div>

                </div>
            </form>
            <Button onClick={generateImg}>generate image</Button>

        </div>
    );
}