import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "";
const generateAction = async (request, response) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${request.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
        model: "text-ada-001",
        prompt: `${basePromptPrefix}${request.body.userInput}`,
        temperature: 0.5,
        max_tokens: 250
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    response.status(200).json({ output: basePromptOutput });
};

export default generateAction;
