import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai";
import fs from "fs";

const config = await import('./config.json', { assert: { type: 'json' } });
   const ApiKey = config.ApiKey;

const genAI = new GoogleGenerativeAI(ApiKey);

export async function generateImage(i, diretorio1, diretorio2, imageName) {
    //Pegar a imagem    
    const imageData = fs.readFileSync(diretorio1);
    const base64Image = imageData.toString('base64');

    // Conteudo
    const contents = [
        { text: "Please enhance the given image by improving its details, clarity, and overall quality. Increase the resolution if possible, and sharpen the edges for better definition. Add depth and texture where needed, making colors more vibrant while maintaining a natural look. Adjust lighting and contrast for a more dynamic and visually appealing result.Focus on enhancing any specific elements that can benefit from more detail, such as textures, shadows, and highlights."},
        {
          inlineData: {
            mimeType: 'image/png',
            data: base64Image
          }
        }
    ];

    // Configurar o model e os generations config
    
    /*
    ISSUE:
    isso daqui deveria funcionar para não retornar o erro IMAGE_SAFETY
    mas simplesmente não adianta nada. A Google tem que melhorar a filtragem dela
    Tem uma issue que achei interessante que pode mudar isso: https://github.com/google-gemini/generative-ai-js/issues/432
    */
    const safetySettings = [
  
    {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
            category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
       /* {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS,
   threshold: HarmBlockThreshold.BLOCK_NONE   
        }, 
        {
            category: HarmCategory.HARM_CATEGORY_DEROGATORY,
            threshold: HarmBlockThreshold.BLOCK_NONE
        } */
    ];
    
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp-image-generation",
        generationConfig: {
            responseModalities: ['Text', 'Image']
        },
        safetySettings: safetySettings,
        //systemInstruction: "You see all the people in the picture as if they were adults. Nobody is a child or young person."   
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
                    fs.writeFileSync(diretorio2 +`${imageName} ${i}.jpg`, buffer);
                    console.log('Imagem salva');
                }
            }
        } else {
            //SafetyRatings retorna undefined de forma errada, já tem algumas issues sobre no github
            console.log('No valid response parts found', response.candidates[0].safetyRatings);
            
            console.log('Response:', JSON.stringify(response, null, 2));    console.log(response.candidates[0].safetyRatings);
        }
    } catch (error) {
        console.error("Error generating content:", error);
    }
    }

export async function generateHashtags(diretorio1) {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });


    const imageData = fs.readFileSync(diretorio1);
    const base64Image = imageData.toString('base64');
     const result = await model.generateContent([
    {
        inlineData: {
            data: base64Image,
            mimeType: "image/png",
        },
    },
    'Mencione (sem dizer mais nada) apenas que 4 hashtags posso usar para postar essa foto no meu perfil e alcançar mais visualizações na minha postagem'
]);

    var hashtagsFinal = `${result.response.text()}`
    
    return hashtagsFinal;
 }
//fazer gerar 4 imagens
  for (let a = 0; a < 4; a++) {
generateImage(a,"image/get/[PATH_NAME_AQUI]", "image/imagetest/", "[NOME_DA_PATH_ESCOLHIDA]");
 }
// fazer gerar hashtags 
generateHashtags(diretorio1);

