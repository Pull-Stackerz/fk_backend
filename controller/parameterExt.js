import Replicate from "replicate";
const axios = require("axios");
const translate = require("google-translate-api");
const app = express();

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const generateStylePreference = async (input) => {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    const completion = await replicate.run(
        "replicate/llama-2-70b-chat:58d078176e02c219e11eb4da5a02a7830a283b14cf8f94537af893ccff5ee781",
        {
            input: {
                system_prompt :
                    "You are a fashion assistant. Help the user refine their style preferences based on their input. You are a clothing recommender AI designed to provide personalized clothing suggestions for various occasions, regions, ages, genders, ethnicity, body types, and fashion trends.Strictly respond with a json response ",
                prompt :
                    `user Input: ${input}. based on the above input provide a output in json selected form the following fields: {
                    "occasion": "casual|work|formal|party|temple|wedding|festive|day-out|night-out|other",
                    "region": "North India|South India|East India|West India|Central India|Northeast India",
                    "season": "summer|monsoon|winter|spring",
                    "age_group": "kids|teens|20s-30s|40s-50s|60+",
                    "gender": "male|female|non-binary|other",
                    "ethnicity": "Punjabi|Bengali|South Indian|Marathi|Gujarati|Rajasthani|North-Eastern|Other",
                    "body_type": "slim|average|curvy|athletic|tall|petite|undefined",
                    "current_fashion_trends": "traditional|Indo-Western|streetwear|retro|Bollywood-inspired|bohemian|handloom|fusion|athleisure|any",
                    "personal_style": "elegant|sporty|colorful|neutral|ethnic|simple|sophisticated|boho|chic|trendy|any|undefined",
                    "preferred_fabrics": "cotton|silk|linen|wool|synthetic|handloom|organic|chiffon|georgette|other",
                    "color": "red|blue|green|yellow|white|black|grey|pastels|bright|neutral|multicolor|etc.",
                    "additional_notes": "<any extra preferences or constraints from user input>"
                    }
                    if all parameters is not provided in the input then you can select the nearest possible value or remove the field. Finally strictly respond with a json response as defined in the above format & only provide the json.
                    `,
            },
        }
    );
    return completion.title || "";
};


const userRespone = async (userIntitialChat, resultFromMlModel) =>
{
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });
    const completion = await replicate.run(
        "replicate/llama-2-70b-chat:58d078176e02c219e11eb4da5a02a7830a283b14cf8f94537af893ccff5ee781",
        {
            input: {
                system_prompt:
                    "You are a fashion assistant. your gole is to convince the user to buy the product which is provided in promat and make sure to give them valid reasion why they should buy this why this will looks good on them ",
                prompt:
                    `user Input: ${userIntitialChat}.
                     product which you have to convince to buy :${resultFromMlModel}
                     based on the above input provide a output in json `
            },
        }
    );
    return completion.title || "";
}

const languageTranslation = async (initialText) =>
{
    try
    {
        const translated = JSON.stringify(await translate(initialText, { to: "en" }));
        return translated.text
    }
    catch
    {
        console.log("error in the api of google ");
        return initialText
    }
}

const parameterExt = async (req, res) => {
    const initialInput = req.body.initialInput;
    // const outfitRequest = req.body.outfitRequest;

    if (!initialInput) {
        return res.status(400).send({ error: "initialInput is required" });
    }

    try {
        const apiUrl = process.env.apiUrl; // Replace with the actual API endpoint URL of place where ml model is hosted 
        const translatedInput = languageTranslation(initialInput);
         const stylePreference = await generateStylePreference(translatedInput); 
         const data = {
             stylePreference,
         };
        const mlModelProductGen= await axios.post(apiUrl, data);
        const outfitRecommendation = await userRespone(initialInput,mlModelProductGen);
        if (!outfitRecommendation) {
            return res.status(500).send({
                error: "Failed to generate outfit recommendation.",
            });
        }

        return res.send(outfitRecommendation);
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).send({
            error: "Failed to process request",
            details: error.message,
        });
    }
};
