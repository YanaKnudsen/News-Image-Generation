import { OpenAI } from 'openai';
import * as process from "process";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Access the environment variable directly
});
export default openai
