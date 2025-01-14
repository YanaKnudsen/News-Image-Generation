import {NextResponse} from "next/server";
import openai from "../../../../../utils/openai"


export async function POST(req: Request) {
    const userPrompt=""
    const body=await req.json();
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Generate a detailed and realistic prompt for DALL·E to create an image illustrating the following news: "${userPrompt}".`}],
        model: 'gpt-4o-mini',
    });
    console.log("prompt for dalle",chatCompletion.choices[0].message.content)
    const response = await openai.images.generate({
            model: "dall-e-3",
            prompt:`${chatCompletion.choices[0].message.content}`,
            n: 1,
            size: "1024x1024",
        });

    console.log("res",response);

        // return NextResponse.json({AIDescription:chatCompletionDescription.choices[0].message.content,AITitle:chatCompletionTitle.choices[0].message.content}, { status:200 })


}