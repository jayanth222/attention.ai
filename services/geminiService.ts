
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';

const SYSTEM_INSTRUCTION = `You are attention.ai, a friendly and encouraging AI Doubt Buddy for students. 
Your goal is to help students understand concepts without just giving away the answer.
Explain concepts clearly, simply, and in a supportive tone.
If a student is struggling, offer hints and break down the problem into smaller steps.
Use emojis to make the conversation engaging and fun.
Keep your responses concise and easy to read.`;

let chat: Chat | null = null;

const getChat = () => {
    if (!chat) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
        });
    }
    return chat;
}

export const sendMessageToAI = async (message: string, history: ChatMessage[]): Promise<string> => {
    try {
        const chatSession = getChat();
        
        // Note: The current @google/genai chat doesn't directly take history in each call.
        // A more robust implementation would re-initialize the chat with history if needed,
        // but for a simple session, the `chat` object maintains state.
        
        const result = await chatSession.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Oops! I'm having a little trouble thinking right now. Please try again in a moment.";
    }
};