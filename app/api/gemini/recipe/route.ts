import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Fallback recipe generator in case Gemini API key is missing or fails
function getFallbackRecipe(ingredients: string[]) {
  const ingLower = ingredients.map(i => i.toLowerCase());
  
  const hasPatatas = ingLower.some(i => i.includes("patat") || i.includes("papa"));
  const hasHuevos = ingLower.some(i => i.includes("huevo"));
  const hasTomates = ingLower.some(i => i.includes("tomat"));
  const hasPollo = ingLower.some(i => i.includes("pollo"));
  const hasPan = ingLower.some(i => i.includes("pan"));
  const hasAtun = ingLower.some(i => i.includes("atún") || i.includes("atun"));

  if (hasPatatas && hasHuevos) {
    return {
      name: "Revuelto Crujiente de Patatas de la Huerta ✨ (Fallback IA)",
      description: "Un plato reconfortante e improvisado que une patatas tiernas fritas y huevos suavemente batidos con un toque de ajo.",
      time: 15,
      difficulty: "Fácil",
      ingredientsRequired: [...ingredients, "Aceite de oliva", "Sal"],
      steps: [
        "Corta las patatas que tienes a mano en rodajas muy finas.",
        "Fríelas o dóralas en una sartén con abundante aceite caliente hasta que queden tiernas.",
        "Bate un par de huevos con una pizca de sal en un tazón.",
        "Vierte los huevos batidos sobre las patatas en la sartén a fuego medio.",
        "Remueve rítmicamente durante un par de minutos para lograr un cuajado cremoso y sirve de inmediato."
      ]
    };
  }

  if (hasTomates && (hasPan || hasAtun)) {
    return {
      name: "Gazpacho Templado Express con Atún ✨ (Fallback IA)",
      description: "Una sopa fría o templada exprés ideal para aprovechar tomates sazonados y pan duro, dándole chicha con atún jugoso.",
      time: 10,
      difficulty: "Fácil",
      ingredientsRequired: [...ingredients, "Aceite de oliva", "Ajo", "Sal"],
      steps: [
        "Lava y corta los tomates maduros en cuartos.",
        "Tritúralos junto con un diente de ajo pequeño, sal y una cucharada de aceite de oliva hasta emulsionar.",
        "Añade trozos de pan rallado o desmigado para aportarle consistencia al puré.",
        "Desmenuza el atún enlatado y añádelo por encima.",
        "Sazona con un chorrito de aceite de oliva virgen extra frío."
      ]
    };
  }

  if (hasPollo) {
    return {
      name: "Wok Express de Pollo y Vegetales de Nevera ✨ (Fallback IA)",
      description: "Salteado ultra-vibrante de pechuga de pollo cortada en tiras con todos los restos de verduras que has seleccionado.",
      time: 15,
      difficulty: "Fácil",
      ingredientsRequired: [...ingredients, "Aceite de oliva", "Sal", "Pimienta"],
      steps: [
        "Trocea los filetes de pechuga de pollo en tiras de bocado y salpimiéntalos.",
        "Pica finitos los dientes de ajo, la cebolla y cualquier verdura que tengas marcada en tu despensa.",
        "Pon una sartén bien honda a fuego máximo con una cucharada de aceite.",
        "Saltea el pollo hasta que se dore por fuera y retíralo.",
        "Sazona las verduras en la misma sartén durante 5 minutos y reincorpora el pollo para unificar sabores antes de servir caliente."
      ]
    };
  }

  // Fallback genérico refinado
  return {
    name: "Revuelto de Aprovechamiento Express ✨ (Fallback IA)",
    description: "Una deliciosa receta exprés creada minuciosamente para usar tus ingredientes seleccionados de forma que combinen de maravilla.",
    time: 12,
    difficulty: "Fácil",
    ingredientsRequired: [...ingredients, "Aceite de oliva", "Sal"],
    steps: [
      "Prepara minuciosamente tus ingredientes cortándolos en dados pequeños.",
      "Calienta un fondo de aceite de oliva en tu sartén antiadherente favorita.",
      "Saltea los condimentos y los ingredientes duros primero (zanahorias, cebolla) durante 5 minutos.",
      "Suma los ingredientes más tiernos y condimenta con sal y pimienta al gusto.",
      "Cuece a fuego suave hasta que todo adquiera un tono jugoso y dorado perfecto."
    ]
  };
}

export async function POST(req: NextRequest) {
  try {
    const { ingredients } = await req.json();

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "No se proporcionaron ingredientes válidos." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Si la clave de API está ausente, procedemos de inmediato al motor Fallback de Chef Inteligente
    if (!apiKey) {
      console.log("No GEMINI_API_KEY env variable found. Using offline kitchen generator...");
      const fallbackRecipe = getFallbackRecipe(ingredients);
      return NextResponse.json({ success: true, recipe: fallbackRecipe });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `Actúa como un chef profesional español de alta cocina en España. 
Crea una receta deliciosa y realista utilizando como ingredientes principales o de acompañamiento algunos o todos de la siguiente lista: ${ingredients.join(", ")}.
Puedes complementar la receta con condimentos básicos habituales (sal, pimienta, aceite de oliva, agua, ajo, cebolla).
La respuesta debe estar escrita completamente en castellano clásico de España (por ejemplo, usa 'patata' en lugar de 'papa', 'carne picada' o 'mantequilla' en lugar de 'manteca', e instrucciones claras y apetitosas).

Devuelve estrictamente un objeto JSON que represente la receta generada.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres un asistente de cocina experto en gastronomía española que diseña recetas de aprovechamiento basadas exclusivamente en ingredientes disponibles.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "Nombre de la receta sugerida en castellano, llamativo y gastronómico (ej. 'Revuelto de Gulas con Patatas y Ajo').",
            },
            description: {
              type: Type.STRING,
              description: "Una descripción breve (2 frases) y sugerente de la receta.",
            },
            time: {
              type: Type.INTEGER,
              description: "Tiempo aproximado estimado de preparación y cocinado en minutos.",
            },
            difficulty: {
              type: Type.STRING,
              enum: ["Fácil", "Media", "Difícil"],
              description: "Nivel de dificultad de la receta.",
            },
            ingredientsRequired: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Lista de ingredientes necesarios para la receta, incluidos los condimentos o básicos.",
            },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Instrucciones de cocinado redactadas paso a paso secuencialmente (mínimo 4 pasos).",
            },
          },
          required: ["name", "description", "time", "difficulty", "ingredientsRequired", "steps"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("El modelo Gemini no devolvió ningún texto.");
    }

    const recipe = JSON.parse(responseText.trim());
    return NextResponse.json({ success: true, recipe });

  } catch (error: any) {
    console.warn("Error generating recipe with Gemini, using kitchen fallback...", error);
    // En caso de que falle la API de Google por red, cuota, versión, etc., devolvemos un plato de fallback para una experiencia ininterrumpida
    try {
      const { ingredients } = await req.clone().json();
      const fallbackRecipe = getFallbackRecipe(ingredients || ["patatas", "huevos"]);
      return NextResponse.json({ success: true, recipe: fallbackRecipe });
    } catch (err) {
      return NextResponse.json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Error del servidor al procesar la receta de IA." 
      }, { status: 500 });
    }
  }
}
