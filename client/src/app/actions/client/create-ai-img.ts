export default async function createAIImg(userPrompt) {
    const res=await fetch("/api/ai/img",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            userPrompt:userPrompt,
        })

    })
    return res
};