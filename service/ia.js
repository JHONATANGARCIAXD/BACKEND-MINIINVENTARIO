const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
import { GoogleGenAI } from "@google/genai";


const usarIA = async (promptUsuario, instruccionSistema) => {
    const chat = ai.chats.create({
        model: "gemini-2.0-flash",
        config: {
            systemInstruction: instruccionSistema,
        },
    });

    const response = await chat.sendMessage({ message: promptUsuario });
    return response.text;
};

export {usarIA}