
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI("AIzaSyChgvHZjn1mLjBrJXv9OiZ4IHTkfOzGoxs");

async function generateImage() {
    // Load the image from the local file system
    const imagePath = './IMG-20250316-WA0048.jpg';
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');

    // Prepare the content parts
    const contents = [
        { text: "make a cat in this image" },
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Image
          }
        }
    ];

    // Set responseModalities to include "Image" so the model can generate an image
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp-image-generation",
        generationConfig: {
            responseModalities: ['Text', 'Image']
        },
    });

    try {
        const result = await model.generateContent(contents);
        const response = await result.response;
        
        if (response.candidates && response.candidates[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.text) {
                    console.log(part.text);
                } else if (part.inlineData) {
                    const imageData = part.inlineData.data;
                    const buffer = Buffer.from(imageData, 'base64');
                    fs.writeFileSync('gemini-native-image.png', buffer);
                    console.log('Image saved as gemini-native-image.png');
                }
            }
        } else {
            console.log('No valid response parts found');
            console.log('Response:', JSON.stringify(response, null, 2));
        }
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

generateImage();
