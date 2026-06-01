"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  ChefHat, 
  Utensils, 
  History, 
  MessageSquare, 
  Plus, 
  Search, 
  Trash2, 
  Flame, 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  Sparkles, 
  User, 
  Power, 
  Moon, 
  Sun, 
  Check, 
  X, 
  ChevronRight, 
  ChevronLeft,
  ShoppingBag,
  BookOpen, 
  Award, 
  Send, 
  ThumbsUp, 
  MessageCircle, 
  Bookmark,
  Smartphone,
  Info,
  Clock,
  RotateCcw,
  Sliders,
  Settings,
  Camera,
  Upload
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RECIPES as INITIAL_RECIPES, INGREDIENTS, CATEGORIES, Recipe, Ingredient, FAMOUS_CHEFS, Chef } from "../lib/recipeData";

// Lista de Avatares predefinidos simpáticos para el perfil de chef
const CHEF_AVATARS = [
  { id: "chef_hat", emoji: "👨‍🍳", label: "Chef Profesional", bg: "bg-blue-500" },
  { id: "chef_female", emoji: "👩‍🍳", label: "Chef Estrella", bg: "bg-emerald-500" },
  { id: "pizza", emoji: "🍕", label: "Maestro Pizzero", bg: "bg-amber-500" },
  { id: "tomato", emoji: "🍅", label: "Huerta Lover", bg: "bg-red-500" },
  { id: "avocado", emoji: "🥑", label: "Eco Veggie", bg: "bg-lime-500" }
];

const LANGUAGES = [
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "pt", flag: "🇵🇹", name: "Português" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" }
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  es: {
    appName: "Eco Scan & Cook",
    tagline: "Cocina con lo que tengas a mano",
    getStarted: "Empezar",
    versionText: "Versión 1.5 de España • Sostenible",
    welcomeTitle: "Únete a la Cocina",
    welcomeSubtitle: "Guarda tus recetas, haz check-in en la despensa y acumula estrellas.",
    chooseChefNick: "Elige tu apodo de chef:",
    signInGoogle: "Iniciar sesión con Google",
    continueGuest: "Continuar como invitado",
    welcomeBack: "Bienvenido de vuelta",
    hello: "¡Hola, {name}! 👋",
    tipTitle: "Consejo Sostenible",
    tipSubtitle: "¿Sabías que el 40% del desecho es doméstico?",
    tipDesc: "Cocinar con lo sobrante de la semana ayuda al bolsillo y al planeta.",
    carouselTitle: "Afinidad Máxima Hoy",
    carouselSub: "Según tu nevera",
    coincidence: "Coincide",
    pantryBoxTitle: "Mi Despensa Abierta",
    pantryBoxDesc: "Hay {count} ingredientes listados listos para cocinar.",
    scanBoxBtn: "Escanear con Cámara AI 📸",
    geminiBoxTitle: "¿Nada te convence hoy?",
    geminiBoxDesc: "Deja que Gemini IA cree una receta ideal con lo que tengas seleccionado.",
    generateAiBtn: "Generar receta sorpresa con IA",
    pantryTitle: "Mi Despensa",
    pantrySearchPl: "Buscar ingrediente...",
    emptyPantry: "Vaciar",
    addCustomIng: "Añadir",
    noPantryResults: "No hay resultados en esta categoría.",
    recipesTitle: "Recetas Disponibles",
    recipesSub: "Recetas para aprovechar lo de casa",
    completeMatchSection: "🍳 Listas para Cocinar (100% Coincidencia)",
    almostMatchSection: "🥗 Casi listas (Faltan pocos)",
    otherMatchSection: "🍽️ Otras recetas sugeridas",
    historyTitle: "Historial de Cocina",
    historySub: "Platos que has cocinado con éxito",
    historyEmpty: "Aún no has cocinado recetas guardadas. ¡Ponte el delantal!",
    communityTitle: "Comunidad Eco",
    communitySub: "Consejos de Aprovechamiento",
    shareMessage: "Comparte una experiencia de cocina sin desperdicios...",
    publishBtn: "Publicar",
    likeBtn: "Me Gusta",
    commentBtn: "Comentar",
    adminTitle: "Panel de Control de la Demo",
    adminSub: "Controla el estado global de la despensa de España y simula afinidades",
    adminBox1: "🔧 Preconfigurar Despensa de Pruebas",
    adminBox1Desc: "Carga ingredientes instantáneamente en tu despensa inteligente para forzar la afinidad de recetas locamente:",
    adminClearAll: "🚫 Vaciar Todo",
    adminAll: "✨ Llenar Todo",
    adminAffinities: "📊 Resumen de Afinidad Real",
    adminIngredientsCount: "Ingredientes Escaneados",
    adminCompleteCount: "Recetas 100% Match",
    adminAlmostCount: "Recetas casi listas",
    adminCustomCount: "Ingredientes Propios",
    adminGeminiTitle: "🧠 Motor de IA con Gemini",
    adminGeminiDesc: "La aplicación utiliza el modelo gemini-3.5-flash mediante la API segura del servidor para conceptualizar e idear recetas de aprovechamiento inéditas y saludables.",
    adminGenerateForce: "¡Generar Receta Mágica con IA!",
    adminDirectView: "🚀 Atajos de Vista Directa",
    homeNav: "Inicio",
    pantryNav: "Despensa",
    recipesNav: "Recetas",
    historyNav: "Historial",
    communityNav: "Comunidad",
    adminNav: "Panel Admin",
    chefsNav: "Chefs Estrella",
    chefsTitle: "Chefs Estrella",
    chefsSub: "Recetas icónicas de cocineros famosos para hacer fácilmente en casa",
    chefRecipes: "Recetas Destacadas",
    settingsTitle: "Ajustes",
    languageLabel: "Idioma de la aplicación",
    profileLabel: "Personalizar Perfil",
    closeBtn: "Cerrar",
    scannerTitle: "Escáner de Alimentos AI",
    scannerSub: "Apunta con la cámara a los ingredientes de tu nevera",
    startCamera: "Iniciar Cámara",
    stopCamera: "Apagar Cámara",
    captureBtn: "Escanear Alimento",
    scanningActive: "Escaneando...",
    detectedFoodLabel: "Comida Detectada:",
    aiRecipesFound: "Recetas Sugeridas por IA:",
    howToCook: "Ver Receta",
    photoRequirement: "Si no tienes cámara o estás en un iframe restrictivo, sube una foto local o usa la simulación instantánea:",
    simulateBtn: "Simulador de Escaneo Instantáneo",
    uploadBtn: "Subir foto local"
  },
  en: {
    appName: "Eco Scan & Cook",
    tagline: "Cook with what you have on hand",
    getStarted: "Get Started",
    versionText: "Version 1.5 Spain • Sustainable",
    welcomeTitle: "Join the Kitchen",
    welcomeSubtitle: "Save your recipes, check inventory in the pantry, and earn stars.",
    chooseChefNick: "Choose your chef nickname:",
    signInGoogle: "Sign in with Google",
    continueGuest: "Continue as Guest",
    welcomeBack: "Welcome back",
    hello: "Hello, {name}! 👋",
    tipTitle: "Sustainable Tip",
    tipSubtitle: "Did you know 40% of waste is domestic?",
    tipDesc: "Cooking with leftover items helps your wallet and save the planet.",
    carouselTitle: "Top Affinity Today",
    carouselSub: "Based on your fridge",
    coincidence: "Match",
    pantryBoxTitle: "My Open Pantry",
    pantryBoxDesc: "There are {count} ingredients ready for cooking.",
    scanBoxBtn: "Scan with AI Camera 📸",
    geminiBoxTitle: "Nothing hooks you today?",
    geminiBoxDesc: "Let Gemini AI write an ideal recipe with whatever you have selected.",
    generateAiBtn: "Generate surprise recipe with AI",
    pantryTitle: "My Pantry",
    pantrySearchPl: "Search ingredient...",
    emptyPantry: "Clear",
    addCustomIng: "Add",
    noPantryResults: "No results found in this category.",
    recipesTitle: "Recipes Available",
    recipesSub: "Recipes to take advantage of items at home",
    completeMatchSection: "🍳 Ready to Cook (100% Match)",
    almostMatchSection: "🥗 Almost ready (Few ingredients missing)",
    otherMatchSection: "🍽️ Other suggested recipes",
    historyTitle: "Cooking History",
    historySub: "Dishes you have successfully cooked",
    historyEmpty: "You haven't cooked any saved recipes yet. Put on your apron!",
    communityTitle: "Eco Community",
    communitySub: "Leftover Tips",
    shareMessage: "Share a zero-waste cooking experience...",
    publishBtn: "Publish",
    likeBtn: "Like",
    commentBtn: "Comment",
    adminTitle: "Demo Control Panel",
    adminSub: "Control the global state of the Spanish pantry and simulate affinities",
    adminBox1: "🔧 Preconfigure Test Pantry",
    adminBox1Desc: "Instantly load ingredients into your smart pantry to force crazy recipe matches:",
    adminClearAll: "🚫 Clear All",
    adminAll: "✨ Fill All",
    adminAffinities: "📊 Real Affinity Summary",
    adminIngredientsCount: "Pantry Ingredients",
    adminCompleteCount: "100% Match Recipes",
    adminAlmostCount: "Almost Ready Recipes",
    adminCustomCount: "Custom Ingredients",
    adminGeminiTitle: "🧠 Gemini AI Engine",
    adminGeminiDesc: "The app uses the gemini-3.5-flash model via the secure server API to conceptualize and design new, healthy waste-reduction recipes.",
    adminGenerateForce: "Generate Magic AI Recipe!",
    adminDirectView: "🚀 Direct View Shortcuts",
    homeNav: "Home",
    pantryNav: "Pantry",
    recipesNav: "Recipes",
    historyNav: "History",
    communityNav: "Community",
    adminNav: "Admin Panel",
    chefsNav: "Star Chefs",
    chefsTitle: "Star Chefs",
    chefsSub: "Iconic recipes from world-renowned chefs to cook easily at home",
    chefRecipes: "Featured Recipes",
    settingsTitle: "Settings",
    languageLabel: "App Language",
    profileLabel: "Customize Profile",
    closeBtn: "Close",
    scannerTitle: "AI Food Scanner",
    scannerSub: "Point your camera at ingredients in your fridge",
    startCamera: "Start Camera",
    stopCamera: "Stop Camera",
    captureBtn: "Scan Ingredient",
    scanningActive: "Scanning...",
    detectedFoodLabel: "Detected Food:",
    aiRecipesFound: "AI Suggested Recipes:",
    howToCook: "View Recipe",
    photoRequirement: "If you don't have a camera or are on Chrome / iFrame, you can upload a local photo or use instant smart simulation:",
    simulateBtn: "Instant Simulated Scan",
    uploadBtn: "Upload local photo"
  },
  pt: {
    appName: "Eco Scan & Cook",
    tagline: "Cozinhe com o que você tem à mão",
    getStarted: "Começar",
    versionText: "Versão 1.5 Espanha • Sustentável",
    welcomeTitle: "Junte-se à Cozinha",
    welcomeSubtitle: "Salve suas receitas, marque os ingredientes na dispensa e ganhe estrelas.",
    chooseChefNick: "Escolha seu apelido de chef:",
    signInGoogle: "Entrar com o Google",
    continueGuest: "Continuar como convidado",
    welcomeBack: "Bem-vindo de volta",
    hello: "Olá, {name}! 👋",
    tipTitle: "Conselho Sustentável",
    tipSubtitle: "Sabia que 40% do desperdício é doméstico?",
    tipDesc: "Cozinhar com sobras da semana ajuda o seu bolso e protege o planeta.",
    carouselTitle: "Afinidade Máxima Hoje",
    carouselSub: "Baseado na sua geladeira",
    coincidence: "Coincidência",
    pantryBoxTitle: "Minha Dispensa Aberta",
    pantryBoxDesc: "Existem {count} ingredientes prontos para cozinhar.",
    scanBoxBtn: "Escanear com Câmera AI 📸",
    geminiBoxTitle: "Nada te convence hoje?",
    geminiBoxDesc: "Deixe a AI Gemini criar uma receita ideal com o que você selecionou.",
    generateAiBtn: "Gerar receita surpresa com AI",
    pantryTitle: "Minha Dispensa",
    pantrySearchPl: "Buscar ingrediente...",
    emptyPantry: "Limpar",
    addCustomIng: "Adicionar",
    noPantryResults: "Nenhum resultado de busca.",
    recipesTitle: "Receitas Disponíveis",
    recipesSub: "Receitas para aproveitar o que tem em casa",
    completeMatchSection: "🍳 Prontas para Cozinhar (100% de match)",
    almostMatchSection: "🥗 Quase prontas (Faltam poucos)",
    otherMatchSection: "🍽️ Outras receitas sugeridas",
    historyTitle: "Histórico de Cozinha",
    historySub: "Pratos que você cozinhou com sucesso",
    historyEmpty: "Você ainda não cozinhou nenhuma receita. Ponha o avental!",
    communityTitle: "Comunidade Eco",
    communitySub: "Dicas de Aproveitamento",
    shareMessage: "Compartilhe uma experiência de cozinha sem desperdícios...",
    publishBtn: "Publicar",
    likeBtn: "Curtir",
    commentBtn: "Comentar",
    adminTitle: "Painel de Controle da Demo",
    adminSub: "Gerencie a dispensa espanhola global e simule afinidades",
    adminBox1: "🔧 Preconfigurar Dispensa de Teste",
    adminBox1Desc: "Carregue ingredientes instantaneamente na sua dispensa para ver matches loucos:",
    adminClearAll: "🚫 Limpar Tudo",
    adminAll: "✨ Preencher Tudo",
    adminAffinities: "📊 Resumo de Afinidade Real",
    adminIngredientsCount: "Ingredientes na Dispensa",
    adminCompleteCount: "Receitas 100% Match",
    adminAlmostCount: "Receitas quase prontas",
    adminCustomCount: "Ingredientes Próprios",
    adminGeminiTitle: "🧠 Motor de AI com Gemini",
    adminGeminiDesc: "O aplicativo utiliza o modelo gemini-3.5-flash através da segura API do servidor para criar receitas saudáveis de aproveitamento.",
    adminGenerateForce: "Gerar Receita Mágica com AI!",
    adminDirectView: "🚀 Atalhos de Visualização Direta",
    homeNav: "Início",
    pantryNav: "Dispensa",
    recipesNav: "Receitas",
    historyNav: "Histórico",
    communityNav: "Comunidade",
    adminNav: "Painel Admin",
    chefsNav: "Chefs Estrela",
    chefsTitle: "Chefs Estrela",
    chefsSub: "Receitas icônicas de chefs famosos para cozinhar facilmente em casa",
    chefRecipes: "Receitas de Destaque",
    settingsTitle: "Ajustes",
    languageLabel: "Idioma do aplicativo",
    profileLabel: "Personalizar Perfil",
    closeBtn: "Fechar",
    scannerTitle: "Escâner de Alimentos AI",
    scannerSub: "Aponte a câmera para os ingredientes na geladeira",
    startCamera: "Iniciar Câmera",
    stopCamera: "Desligar Câmera",
    captureBtn: "Escanear Alimento",
    scanningActive: "Escaneando...",
    detectedFoodLabel: "Alimento Detectado:",
    aiRecipesFound: "Receitas sugeridas por AI:",
    howToCook: "Ver Receita",
    photoRequirement: "Se você não tiver câmera ou estiver no Chrome / iFrame, faça o upload de fotos locais ou use simulação instantânea:",
    simulateBtn: "Simulação de Escaneamento Instantâneo",
    uploadBtn: "Upload de foto local"
  },
  de: {
    appName: "Eco Scan & Cook",
    tagline: "Kochen Sie mit dem, was Sie haben",
    getStarted: "Loslegen",
    versionText: "Version 1.5 Spanien • Nachhaltig",
    welcomeTitle: "Küche Beitreten",
    welcomeSubtitle: "Speichern Sie Rezepte, prüfen Sie Zutaten und sammeln Sie Sterne.",
    chooseChefNick: "Wählen Sie Ihren Chef-Namen:",
    signInGoogle: "Mit Google anmelden",
    continueGuest: "Als Gast fortfahren",
    welcomeBack: "Willkommen zurück",
    hello: "Hallo, {name}! 👋",
    tipTitle: "Nachhaltiger Tipp",
    tipSubtitle: "Wussten Sie, dass 40% des Abfalls zu Hause entsteht?",
    tipDesc: "Das Kochen mit Resten spart Geld und schont unseren Planeten.",
    carouselTitle: "Top-Übereinstimmung Heute",
    carouselSub: "Basierend auf deinem Kühlschrank",
    coincidence: "Eignung",
    pantryBoxTitle: "Meine offene Speisekammer",
    pantryBoxDesc: "Es sind {count} Zutaten bereit zum Kochen.",
    scanBoxBtn: "Mit AI Kamera Scannen 📸",
    geminiBoxTitle: "Heute sagt dir nichts zu?",
    geminiBoxDesc: "Lass die Gemini-KI ein ideales Rezept aus deinen ausgewählten Zutaten schreiben.",
    generateAiBtn: "Überraschungsrezept erstellen",
    pantryTitle: "Meine Speisekammer",
    pantrySearchPl: "Zutat suchen...",
    emptyPantry: "Leeren",
    addCustomIng: "Hinzufügen",
    noPantryResults: "Keine Ergebnisse.",
    recipesTitle: "Verfügbare Rezepte",
    recipesSub: "Rezepte zum Verwerten von Resten",
    completeMatchSection: "🍳 Bereit zum Kochen (100% Übereinstimmung)",
    almostMatchSection: "🥗 Fast fertig (Einige Zutaten fehlen)",
    otherMatchSection: "🍽️ Andere Rezeptvorschläge",
    historyTitle: "Kochverlauf",
    historySub: "Gerichte, die Sie erfolgreich gekocht haben",
    historyEmpty: "Sie haben noch kein Rezept gekocht. Setzen Sie die Kochschürze auf!",
    communityTitle: "Eco-Gemeinschaft",
    communitySub: "Verwertungstipps",
    shareMessage: "Teilen Sie ein Zero-Waste-Kochergebnis...",
    publishBtn: "Veröffentlichen",
    likeBtn: "Gefällt mir",
    commentBtn: "Kommentieren",
    adminTitle: "Demo-Kontrollzentrum",
    adminSub: "Verwalte die Speisekammer und simuliere Rezepteignungen",
    adminBox1: "🔧 Test-Speisekammer vorkonfigurieren",
    adminBox1Desc: "Lade Zutaten direkt in die Speisekammer, um Rezepteignungen hervorzurufen:",
    adminClearAll: "🚫 Alles leeren",
    adminAll: "✨ Alles füllen",
    adminAffinities: "📊 Zusammenfassung der Eignung",
    adminIngredientsCount: "Eingescannte Zutaten",
    adminCompleteCount: "100% Match Rezepte",
    adminAlmostCount: "Fast fertige Rezepte",
    adminCustomCount: "Eigene Zutaten",
    adminGeminiTitle: "🧠 KI-Engine mit Gemini",
    adminGeminiDesc: "Die Anwendung verwendet das Gemini-3.5-Flash-Modell über die sichere Server-API, um innovative Rezepte zu entwerfen.",
    adminGenerateForce: "Magisches KI-Rezept generieren!",
    adminDirectView: "🚀 Schnellzugriff auf Ansichten",
    homeNav: "Startseite",
    pantryNav: "Mutterlager",
    recipesNav: "Rezepte",
    historyNav: "Verlauf",
    communityNav: "Gemeinschaft",
    adminNav: "Admin-Panel",
    chefsNav: "Sterne-Chefs",
    chefsTitle: "Sterne-Chefs",
    chefsSub: "Ikonische Rezepte von weltberühmten Köchen für zu Hause",
    chefRecipes: "Herausragende Rezepte",
    settingsTitle: "Einstellungen",
    languageLabel: "Anwendungssprache",
    profileLabel: "Profil anpassen",
    closeBtn: "Schließen",
    scannerTitle: "Lebensmittel AI Scanner",
    scannerSub: "Richten Sie die Kamera auf die Kühlschrankzutaten",
    startCamera: "Kamera starten",
    stopCamera: "Kamera stoppen",
    captureBtn: "Lebensmittel Scannen",
    scanningActive: "Scannen...",
    detectedFoodLabel: "Erkanntes Lebensmittel:",
    aiRecipesFound: "KI-Rezeptvorschläge:",
    howToCook: "Rezept anzeigen",
    photoRequirement: "Wenn Sie keine Kamera haben oder im Chrome/iFrame sind, laden Sie ein Foto hoch oder starten Sie die Simulation:",
    simulateBtn: "Simulationsscann auslösen",
    uploadBtn: "Lokales Foto auswählen"
  }
};

export default function EcoScanPage() {
  // --- Estados Globales ---
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [currentScreen, setCurrentScreen] = useState<
    "splash" | "login" | "home" | "pantry" | "recipes" | "recipe_detail" | "cooking" | "history" | "community" | "admin" | "scanner" | "chefs"
  >("splash");

  // Idioma de la Aplicación y Traducción
  const [recipeDetailBackScreen, setRecipeDetailBackScreen] = useState<"recipes" | "home" | "chefs" | "pantry">("recipes");
  const [language, setLanguage] = useState<"es" | "en" | "pt" | "de">("es");
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Estados del Escáner de Alimento Inteligente
  const [scannerOutput, setScannerOutput] = useState<{ identifiedFood: string; recipes: any[] } | null>(null);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannerLoading, setScannerLoading] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const t = (key: string, replacements?: Record<string, string | number>) => {
    const dictionary = TRANSLATIONS[language] || TRANSLATIONS.es;
    let text = dictionary[key] || TRANSLATIONS.es[key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const startCamera = async () => {
    setScannerError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.play();
      }
      setScannerActive(true);
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setScannerError("No se pudo iniciar la cámara web. Puedes realizar un escaneo simulado o subir una foto local para probar.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScannerActive(false);
  };

  // Detener la cámara si sale de la pantalla
  useEffect(() => {
    if (currentScreen !== "scanner") {
      const timer = setTimeout(() => {
        stopCamera();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const captureAndScan = async () => {
    if (!videoRef.current) return;
    setScannerLoading(true);
    setScannerError(null);
    setScannerOutput(null);

    try {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        
        const response = await fetch("/api/gemini/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: dataUrl, lang: language })
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Fallo de conexión o respuesta inestable de Gemini.");
        }

        setScannerOutput({
          identifiedFood: data.identifiedFood,
          recipes: data.recipes
        });
      }
    } catch (err: any) {
      console.error("Scanning failed:", err);
      setScannerError(err.message || "Error interactivo al conectar con el servidor.");
    } finally {
      setScannerLoading(false);
    }
  };

  const handleSimulateScan = async () => {
    setScannerLoading(true);
    setScannerError(null);
    setScannerOutput(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const response = await fetch("/api/gemini/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: "MOCK_BASE64_IMAGE", lang: language })
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Fallo al simular el escaneo.");
      }
      setScannerOutput({
        identifiedFood: data.identifiedFood,
        recipes: data.recipes
      });
    } catch (err: any) {
      setScannerError(err.message || "Error al simular escaneo.");
    } finally {
      setScannerLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScannerLoading(true);
    setScannerError(null);
    setScannerOutput(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result as string;
        const response = await fetch("/api/gemini/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64, lang: language })
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Fallo al procesar imagen local.");
        }
        setScannerOutput({
          identifiedFood: data.identifiedFood,
          recipes: data.recipes
        });
      } catch (err: any) {
        setScannerError(err.message || "Error al subir archivo de imagen.");
      } finally {
        setScannerLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Usuario (null al inicio, simulando no autenticado)
  const [user, setUser] = useState<{ name: string; avatar: typeof CHEF_AVATARS[0]; isGuest: boolean } | null>(null);
  
  // Despensa de ingredientes (IDs chequeados)
  // Iniciamos con patatas, huevos, cebolla, aceite y sal para que tengan una receta lista de inicio (Tortilla)
  const [pantry, setPantry] = useState<string[]>(["patatas", "huevos", "cebolla", "aceite", "sal"]);
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>([]);
  const [searchPantryText, setSearchPantryText] = useState("");
  const [selectedPantryTab, setSelectedPantryTab] = useState<string>("Verduras");
  
  // Recetas disponibles (base + generadas por Gemini)
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  
  // Filtros de recetas
  const [filters, setFilters] = useState({
    time: "", // "30" (max 30 min), "all"
    difficulty: "", // "Fácil", "Media", "Difícil"
    mealType: "", // "Almuerzo", "Cena", "Entrante", "Postre"
    diet: "" // "Vegetariana", "Vegana", "Carnívora", "Pesquetariana"
  });

  // Filtro rápido del menú de recetas gourmet
  const [recipeQuickMenuTab, setRecipeQuickMenuTab] = useState<string>("todas");

  // Modo Cocina paso activo
  const [cookingStep, setCookingStep] = useState(0);

  // Historial de recetas cocinadas
  const [cookedHistory, setCookedHistory] = useState<
    { id: string; recipeId: string; name: string; date: string; imageUrl: string; rating: number; favorite: boolean }[]
  >([
    {
      id: "h_1",
      recipeId: "salmorejo_cordobes",
      name: "Salmorejo Cordobés Genuino",
      date: "Hace 2 días",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
      rating: 5,
      favorite: true
    },
    {
      id: "h_2",
      recipeId: "macedonia_frutas",
      name: "Macedonia Campestre Cremosa",
      date: "Hace 5 días",
      imageUrl: "https://images.unsplash.com/photo-1519996521430-02b798c1d881?auto=format&fit=crop&q=80&w=600",
      rating: 4,
      favorite: false
    }
  ]);

  // Mensajes de la Comunidad (Reseñas y Consejos)
  const [communityPosts, setCommunityPosts] = useState<
    {
      id: string;
      username: string;
      avatarEmoji: string;
      avatarBg: string;
      text: string;
      likes: number;
      likedByMe: boolean;
      date: string;
      photo?: string;
      replies: { username: string; text: string }[];
    }[]
  >([
    {
      id: "p_1",
      username: "Carlos_Madrid",
      avatarEmoji: "🍕",
      avatarBg: "bg-amber-500",
      text: "¡He preparado la Tortilla de Patatas de Eco Scan & Cook y ha quedado espectacular y súper jugosa! Conseguí un 100% de coincidencia con mi despensa. 🍳✨ ¡Recomendadísima!",
      likes: 12,
      likedByMe: false,
      date: "Hace 1 hora",
      replies: [
        { username: "SofiaVeg", text: "¡Qué buena pinta! Yo le añado un poco de calabacín y queda de locos." }
      ]
    },
    {
      id: "p_4",
      username: "ChefCantabro",
      avatarEmoji: "👨‍🍳",
      avatarBg: "bg-blue-500",
      text: "¡Gran invento las Croquetas de Jamón extra cremosas! Mi abuela solía decir que una buena croqueta requiere paciencia, y la guía de Eco Scan me ayudó a emulsionar la mantequilla y leche perfectamente sin un solo grumo. Crujientes por fuera y mágicas por dentro. 🤤🍽️",
      likes: 31,
      likedByMe: false,
      date: "Hace 20 min",
      photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
      replies: [
        { username: "SofiaVeg", text: "¡Increíble! A mí me encantan con un toque de nuez moscada." }
      ]
    },
    {
      id: "p_2",
      username: "LauraGastro",
      avatarEmoji: "👩‍🍳",
      avatarBg: "bg-emerald-500",
      text: "Probando el generador de recetas con IA de Gemini. Tenía solo tomates maduros, pan duro y ajo en mi despensa... ¡y me ha sugerido un Salmorejo con un paso a paso perfecto! ¡Una maravilla contra el desperdicio! 🍅🍞 Refrescante para este verano.",
      likes: 24,
      likedByMe: true,
      date: "Hace 4 horas",
      photo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
      replies: [
        { username: "MikiChef", text: "El salmorejo es sagrado, ¡un plato humilde y de primera!" }
      ]
    },
    {
      id: "p_5",
      username: "CarmenValenciana",
      avatarEmoji: "🥘",
      avatarBg: "bg-amber-500",
      text: "La receta de Paella de Marisco es asombrosa. Conseguí sacarle un socarrat crujiente en mi vitrocerámica gracias al truco del fuego máximo al final. Mis hijos no dejaron ni un grano de arroz. ¡Todo un acierto de recetas tradicionales! 🦞❤️",
      likes: 42,
      likedByMe: false,
      date: "Hace 2 horas",
      replies: [
        { username: "Carlos_Madrid", text: "¡La paella valenciana es todo un arte, felicidades!" }
      ]
    },
    {
      id: "p_6",
      username: "VeggieSanti",
      avatarEmoji: "🥑",
      avatarBg: "bg-lime-500",
      text: "Súper fan de la ensalada templada de garbanzos y aguacate. No tenía ni idea de qué hacer con los botes de conserva que acumulaba en la despensa, ¡y este plato saludable se prepara literalmente en 10 minutos! Delicioso y con grasas buenas de verdad.",
      likes: 19,
      likedByMe: false,
      date: "Hace 5 horas",
      replies: [
        { username: "LauraGastro", text: "Esa macedonia con limón y menta también viene genial para acompañar." }
      ]
    },
    {
      id: "p_7",
      username: "AndaluzViajero",
      avatarEmoji: "🍊",
      avatarBg: "bg-red-500",
      text: "Hecho hoy el flan casero al baño maría y me ha teletransportado a mi infancia en Sevilla. Textura sedosa y el caramelo de limón le da un toque gourmet espectacular. Un éxito rotundo en la cena familiar.",
      likes: 28,
      likedByMe: false,
      date: "Hace 1 día",
      replies: [
        { username: "ChefCantabro", text: "¡El flan de huevo nunca falla!" }
      ]
    },
    {
      id: "p_8",
      username: "MikiChef",
      avatarEmoji: "👨‍🍳",
      avatarBg: "bg-emerald-500",
      text: "Como chef profesional, valoro mucho las porciones express. Hoy preparé el Sándwich Club de Pollo utilizando pan artesanal y mozzarella que me sobraba de las pizzas. Rápido, fresco y ecológico, ¡un auténtico golazo de 15 minutos!",
      likes: 53,
      likedByMe: false,
      date: "Hace 2 días",
      replies: [
        { username: "LauraGastro", text: "¡Un plato de gourmet total en tiempo récord!" }
      ]
    }
  ]);

  // Entrada de nuevo post o comentario
  const [newPostText, setNewPostText] = useState("");
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [newReplyText, setNewReplyText] = useState("");

  // Integración Inteligente Gemini
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);
  const [chefTipIndex, setChefTipIndex] = useState(0);

  // Consejos divertidos del chef de IA que van cambiando dinámicamente durante el cargado
  const CHEF_TIPS = [
    "Revisando los estantes virtuales de tu nevera...",
    "Tratando con mimo tus patatas y ajos...",
    "Batiendo metafóricamente las yemas a máxima potencia...",
    "Evitando que se queme el sofrito virtual...",
    "Equilibrando los sabores tradicionales de la península...",
    "Estirando las masas y ligando salsas aromáticas..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (geminiLoading) {
      interval = setInterval(() => {
        setChefTipIndex((prev) => (prev + 1) % CHEF_TIPS.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [geminiLoading]);

  // --- Lógica del Generador de Recetas Inteligente con Gemini ---
  const handleGenerateGeminiRecipe = async () => {
    if (pantry.length === 0) {
      setGeminiError("Por favor, selecciona al menos un ingrediente en tu despensa.");
      alert("Por favor, selecciona al menos un ingrediente en tu despensa para que la IA cocine.");
      return;
    }
    setGeminiLoading(true);
    setGeminiError(null);
    setChefTipIndex(0);

    const ingredientNames = pantry.map(id => {
      const ing = INGREDIENTS.find(i => i.id === id) || customIngredients.find(i => i.id === id);
      return ing ? ing.name : id;
    });

    try {
      const response = await fetch("/api/gemini/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientNames }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "No se pudo generar la receta con IA.");
      }

      const generated: Recipe = {
        ...data.recipe,
        id: `gemini_${Date.now()}`,
        category: "Generadas con IA ✨",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
      };

      // Añadir la receta a la lista de recetas
      setRecipes((prev) => [generated, ...prev]);
      setSelectedRecipeId(generated.id);
      setCurrentScreen("recipe_detail");
    } catch (err: any) {
      setGeminiError(err.message || "Error al conectar con la IA de cocina.");
      alert(`Vaya, hubo un problemilla con la IA: ${err.message || 'Error de conexión'}. Pero no te preocupes, ¡tenemos deliciosas recetas locales listas para ti!`);
    } finally {
      setGeminiLoading(false);
    }
  };

  // --- Cálculos de Afinidad con la Despensa ---
  // Calcula cuántos ingredientes de la receta están en la despensa
  const getRecipeAffinity = (recipe: Recipe) => {
    const totalRequired = recipe.ingredientsRequired.length;
    if (totalRequired === 0) return { matched: 0, total: 0, percentage: 100, missing: [] };

    // Lista de ingredientes requeridos presentes en la panceta
    const matchedList = recipe.ingredientsRequired.filter((id) => pantry.includes(id));
    const matched = matchedList.length;
    const percentage = Math.round((matched / totalRequired) * 100);
    const missing = recipe.ingredientsRequired.filter((id) => !pantry.includes(id));

    // Obtener los nombres en castellano de los ingredientes faltantes
    const missingNames = missing.map((id) => {
      const ing = INGREDIENTS.find((i) => i.id === id) || customIngredients.find((i) => i.id === id);
      return ing ? ing.name : id;
    });

    return { matched, total: totalRequired, percentage, missing: missingNames };
  };

  // --- Recetas Clasificadas y Filtradas ---
  const processedRecipes = useMemo(() => {
    return recipes.map((recipe) => {
      const affinity = getRecipeAffinity(recipe);
      return { ...recipe, affinity };
    });
  }, [recipes, pantry, customIngredients]);

  // Recetas filtradas basadas en barra de filtros y menú gourmet rápido
  const filteredRecipes = useMemo(() => {
    return processedRecipes.filter((r) => {
      // Filtros rápidos superiores
      if (filters.time === "30" && r.time > 30) return false;
      if (filters.difficulty && r.difficulty !== filters.difficulty) return false;
      if (filters.mealType && r.mealType !== filters.mealType) return false;
      if (filters.diet && r.diet !== filters.diet) return false;

      // Filtro del menú gourmet lateral / horizontal
      const isHealthy = r.diet === "Vegetariana" || r.diet === "Vegana" || r.diet === "Pesquetariana";
      
      switch (recipeQuickMenuTab) {
        case "rapidas":
          // Recetas rápidas (<= 20 min)
          if (r.time > 20) return false;
          break;
        case "comida_rapida":
          // Comida súper exprés / bocados rápidos (<= 15 min o sandwich o pasta)
          if (r.time > 15 && r.id !== "pasta_carbonara") return false;
          break;
        case "saludable":
          // Comida saludable (dietas sanas, baja grasa o vegetales)
          if (!isHealthy && r.id !== "pollo_limon") return false;
          break;
        case "saludable_rapida":
          // Comida saludable y rápida (ambos requisitos)
          const isHealthyOrLight = isHealthy || r.id === "pollo_limon";
          if (!isHealthyOrLight || r.time > 20) return false;
          break;
        case "con_tiempo":
          // Para hacer con tiempo (>= 40 min)
          if (r.time < 40) return false;
          break;
        case "dificiles":
          // Recetas difíciles
          if (r.difficulty !== "Difícil") return false;
          break;
        case "entrantes":
          // Entrantes
          if (r.mealType !== "Entrante") return false;
          break;
        case "principales":
          // Platos principales
          if (r.mealType !== "Almuerzo" && r.mealType !== "Cena") return false;
          break;
        case "secundarios":
          // Platos secundarios / Acompañamientos
          if (r.mealType !== "Plato Secundario" && r.mealType !== "Acompañamiento") return false;
          break;
        case "postres":
          // Postres
          if (r.mealType !== "Postre") return false;
          break;
        case "todas":
        default:
          break;
      }
      return true;
    });
  }, [processedRecipes, filters, recipeQuickMenuTab]);

  // Dividir en secciones: Listas para cocinar (100% match) vs Casi listas (más del 50% de match o faltan máximo 2)
  const completeRecipes = useMemo(() => {
    return filteredRecipes.filter((r) => r.affinity.percentage === 100);
  }, [filteredRecipes]);

  const almostReadyRecipes = useMemo(() => {
    return filteredRecipes.filter((r) => r.affinity.percentage >= 40 && r.affinity.percentage < 100);
  }, [filteredRecipes]);

  const otherRecipes = useMemo(() => {
    return filteredRecipes.filter((r) => r.affinity.percentage < 40);
  }, [filteredRecipes]);

  // Recetas sugeridas del día (las de mayor coincidencia) ordenadas para el carrusel de inicio
  const topDayRecipes = useMemo(() => {
    return [...processedRecipes]
      .sort((a, b) => b.affinity.percentage - a.affinity.percentage)
      .slice(0, 3);
  }, [processedRecipes]);

  // Ingredientes listados y filtrados de la despensa de ingredientes
  const ingredientsByCategory = useMemo(() => {
    const baseList = [...INGREDIENTS, ...customIngredients];
    return baseList.filter((ing) => {
      const matchesCategory = ing.category === selectedPantryTab;
      const matchesSearch = ing.name.toLowerCase().includes(searchPantryText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [customIngredients, selectedPantryTab, searchPantryText]);

  // --- Manejo del Login ---
  const loginAsUser = (name: string, isDefault = true) => {
    setUser({
      name: name || "Mario",
      avatar: isDefault ? CHEF_AVATARS[0] : CHEF_AVATARS[Math.floor(Math.random() * CHEF_AVATARS.length)],
      isGuest: false
    });
    setCurrentScreen("home");
  };

  const loginAsGuest = () => {
    setUser({
      name: "Invitado de la Cocina",
      avatar: CHEF_AVATARS[3], // Avatar tomate
      isGuest: true
    });
    setCurrentScreen("home");
  };

  // --- Añadir ingrediente personalizado ---
  const [newIngredientName, setNewIngredientName] = useState("");
  const handleAddCustomIngredient = () => {
    if (!newIngredientName.trim()) return;
    const cleanName = newIngredientName.trim();
    const id = cleanName.toLowerCase().replace(/\s+/g, "_");
    
    // Evitar duplicados
    const exists = INGREDIENTS.some(i => i.id === id) || customIngredients.some(i => i.id === id);
    if (exists) {
      alert(`El ingrediente "${cleanName}" ya existe.`);
      return;
    }

    const newIng: Ingredient = {
      id,
      name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      category: selectedPantryTab
    };

    setCustomIngredients((prev) => [...prev, newIng]);
    setPantry((prev) => [...prev, id]); // Marcarlo inmediatamente
    setNewIngredientName("");
  };

  // --- Guardar receta finalizada en el historial ---
  const handleFinishCooking = (recipe: Recipe) => {
    const nextHistoryId = `h_${Date.now()}`;
    const dateFormatted = "Hoy mismo";
    const newHistoryItem = {
      id: nextHistoryId,
      recipeId: recipe.id,
      name: recipe.name,
      date: dateFormatted,
      imageUrl: recipe.imageUrl,
      rating: 5,
      favorite: false
    };

    setCookedHistory((prev) => [newHistoryItem, ...prev]);
    alert(`🎉 ¡Enhorabuena! Has terminado de cocinar "${recipe.name}". El plato se ha guardado en tu historial.`);
    setCurrentScreen("history");
  };

  // --- Me gustas y comentarios comunitarios ---
  const handleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const liked = !post.likedByMe;
          return {
            ...post,
            likedByMe: liked,
            likes: liked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleSendPost = () => {
    if (!newPostText.trim()) return;
    const author = user ? user.name : "Anónimo";
    const avatar = user ? user.avatar : CHEF_AVATARS[0];
    
    const newPost = {
      id: `p_${Date.now()}`,
      username: author.replace(/\s+/g, ""),
      avatarEmoji: avatar.emoji,
      avatarBg: avatar.bg,
      text: newPostText.trim(),
      likes: 0,
      likedByMe: false,
      date: "Hace unos segundos",
      replies: []
    };

    setCommunityPosts((prev) => [newPost, ...prev]);
    setNewPostText("");
  };

  const handleSendReply = (postId: string) => {
    if (!newReplyText.trim()) return;
    const author = user ? user.name : "Anónimo";

    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [...post.replies, { username: author.replace(/\s+/g, ""), text: newReplyText.trim() }]
          };
        }
        return post;
      })
    );

    setNewReplyText("");
    setActiveReplyPostId(null);
  };

  // --- Ajustes Rápidos en la Despensa para Pruebas (Panel izquierdo) ---
  const fillPantryWithPreset = (presetType: "empty" | "tortilla" | "salmorejo" | "all") => {
    if (presetType === "empty") {
      setPantry([]);
    } else if (presetType === "tortilla") {
      setPantry(["patatas", "cebolla", "huevos", "aceite", "sal"]);
    } else if (presetType === "salmorejo") {
      setPantry(["tomates", "pan", "aceite", "ajo", "sal", "jamon", "huevos"]);
    } else if (presetType === "all") {
      const allIds = [
        ...INGREDIENTS.map((i) => i.id),
        ...customIngredients.map((i) => i.id)
      ];
      setPantry(allIds);
    }
  };

  // Obtenemos la receta seleccionada si existe
  const selectedRecipe = useMemo(() => {
    return processedRecipes.find((r) => r.id === selectedRecipeId) || null;
  }, [processedRecipes, selectedRecipeId]);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme === "dark" ? "bg-[#070b13] text-gray-100" : "bg-slate-50 text-slate-800"}`}>
      
      {/* HEADER DE LA WEB - PLAYGROUND CONTROLLER */}
      <header className={`px-6 py-4 flex flex-wrap gap-4 justify-between items-center border-b ${theme === "dark" ? "bg-[#0D1B2A]/90 border-slate-800" : "bg-white/95 border-slate-200"} backdrop-blur-md sticky top-0 z-40`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
            <ChefHat className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-white">
              Eco Scan & Cook <span className="text-xs px-2 py-0.5 rounded-full bg-sky-900/40 text-sky-300 border border-sky-500/20 font-mono">Mobile Demo</span>
            </h1>
            <p className="text-xs text-gray-400">Cocina saludable y sostenible contra el desperdicio</p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3">
          {/* Botón de Ajustes */}
          <button 
            onClick={() => setShowSettingsModal(true)} 
            className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 ${theme === "dark" ? "bg-slate-900/50 border-slate-800 text-sky-450 hover:bg-slate-800" : "bg-slate-100 border-slate-200 text-sky-700 hover:bg-slate-200"}`}
            title="Ajustes / Settings"
          >
            <Settings className="w-4 h-4 animate-spin-slow" />
            <span className="text-xs uppercase font-mono font-bold">{LANGUAGES.find(l => l.code === language)?.flag || "🇪🇸"}</span>
          </button>

          {/* Botones de Acceso Rápido */}
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            className={`p-2 rounded-lg border transition-colors ${theme === "dark" ? "bg-slate-900/50 border-slate-800 text-amber-400 hover:bg-slate-800" : "bg-slate-100 border-slate-200 text-indigo-900 hover:bg-slate-200"}`}
            title="Alternar modo noche / día"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${theme === "dark" ? "bg-emerald-950/40 border-emerald-500/20 text-emerald-400" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
              <span className="text-sm">{user.avatar.emoji}</span>
              <span>{user.name}</span>
              <button 
                onClick={() => { setUser(null); setCurrentScreen("login"); }}
                className="ml-2 hover:text-red-400 transition-colors"
                title="Cerrar Sesión"
              >
                <Power className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* CUERPO DEL PLAYGROUND */}
      <main className="w-full max-w-5xl mx-auto px-4 md:px-8 py-6 flex flex-col items-center justify-center flex-1">
        
        {/* CONTENEDOR PRINCIPAL EMBEBIDO: RESPONSIVO PARA MÓVIL, TABLET Y ESCRITORIO */}
        <div className={`relative w-full md:h-[820px] h-[calc(100vh-140px)] min-h-[600px] rounded-3xl overflow-hidden shadow-2xl border flex flex-col transition-all duration-300 ${
          theme === "dark" 
            ? "bg-[#0D1B2A] border-slate-900 text-gray-100 shadow-sky-500/5" 
            : "bg-white border-slate-200 text-slate-800 shadow-slate-900/10"
        }`}>
          
          <AnimatePresence mode="wait">
                
                {/* 1. SPLASH SCREEN */}
                {currentScreen === "splash" && (
                  <motion.div
                    key="splash"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-[#0D1B2A] via-[#16253d] to-[#0A111E]"
                  >
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                      <motion.div 
                        initial={{ scale: 0.8, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="w-24 h-24 rounded-3xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-lg"
                      >
                        <ChefHat className="w-14 h-14" />
                      </motion.div>
                      
                      <div className="space-y-2">
                        <h2 className="text-3xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">
                          Eco Scan & Cook
                        </h2>
                        <p className="text-base text-sky-200/90 font-medium tracking-wide">
                          &quot;Cocina con lo que tengas a mano&quot;
                        </p>
                      </div>

                      <div className="px-5 py-2.5 bg-sky-950/40 border border-sky-500/20 rounded-2xl text-xs text-sky-300 max-w-[260px] leading-relaxed">
                        Introduce tus restos culinarios y descubre recetas exquisitas. ¡Ayuda al planeta de forma sabrosa! 🌍🥗
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => setCurrentScreen("login")}
                        className="w-full py-4 px-6 rounded-2xl text-center font-bold text-[#0D1B2A] bg-gradient-to-r from-sky-400 to-[#4FC3F7] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                      >
                        Empezar
                      </button>
                      <p className="text-[10px] text-center text-gray-400">Versión 1.4 de España • Eco Sostenible</p>
                    </div>
                  </motion.div>
                )}

                {/* 2. LOGIN SCREEN */}
                {currentScreen === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-[#0D1B2A] to-[#09101C]"
                  >
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-300">
                        <Utensils className="w-8 h-8" />
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-display text-white">Únete a la Cocina</h3>
                        <p className="text-xs text-gray-400 max-w-[240px]">Guarda tus recetas, haz check-in en la despensa y acumula estrellas.</p>
                      </div>

                      {/* Avatar Selector para diversión extra */}
                      <div className="w-full bg-slate-900/40 border border-slate-800 p-4 rounded-2xl space-y-2">
                        <span className="text-xs font-semibold text-gray-400 block mb-1">Elige tu apodo de chef:</span>
                        <div className="flex justify-center gap-2">
                          {CHEF_AVATARS.slice(0, 4).map((av) => (
                            <button
                              key={av.id}
                              onClick={() => loginAsUser("Chef Mario", false)}
                              className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-slate-800 border border-slate-700 hover:scale-110 active:scale-90 transition-all"
                              title={av.label}
                            >
                              {av.emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => loginAsUser("Mario Huguet")}
                        className="w-full py-3.5 px-6 rounded-2xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-md flex items-center justify-center gap-3 transition-all"
                      >
                        {/* Mock Google Logo */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.585-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.256-3.133C18.336 1.83 15.54 1 12.24 1 6.305 1 1.5 5.805 1.5 11.74s4.805 10.74 10.74 10.74c6.195 0 10.31-4.325 10.31-10.49 0-.705-.075-1.245-.165-1.705H12.24z"/>
                        </svg>
                        Iniciar sesión con Google
                      </button>

                      <button
                        onClick={loginAsGuest}
                        className="w-full py-3 px-6 rounded-x border border-slate-800 text-gray-300 hover:text-white hover:border-slate-500 text-xs font-semibold text-center transition-all bg-[#09101C]/50"
                      >
                        Continuar como invitado
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 3. HOME SCREEN */}
                {currentScreen === "home" && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* Header superior móvil */}
                    <div className="p-4 flex items-center justify-between shrink-0 border-b border-sky-950/30">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-lg shadow-sm">
                          {user?.avatar.emoji || "👨‍🍳"}
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400">Bienvenido de vuelta</p>
                          <h4 className="text-xs font-bold font-display text-white">¡Hola, {user?.name.split(" ")[0]}! 👋</h4>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setCurrentScreen("pantry")} 
                        className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400"
                        title="Ir a despensa"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5 scrollbar-thin">
                      
                      {/* Banner motivacional de Eco Sostenibilidad */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-slate-900 border border-sky-500/20 relative overflow-hidden">
                        <div className="max-w-[180px] space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-sky-400 font-bold font-mono">Consejo Sostenible</span>
                          <p className="text-xs font-bold text-white">¿Sabías que el 40% del desecho es doméstico?</p>
                          <p className="text-[10px] text-gray-400">Cocinar con lo sobrante de la semana ayuda al bolsillo y al planeta.</p>
                        </div>
                        {/* Background Deco Emoji */}
                        <div className="absolute right-2 bottom-1 text-5xl opacity-40 select-none">🥗</div>
                      </div>

                      {/* Recetas del día Carrusel (Basado en ingredientes) */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center px-1">
                          <h4 className="text-xs font-bold font-display uppercase tracking-wider text-gray-300">Afinidad Máxima Hoy</h4>
                          <span className="text-[10px] text-sky-400 font-bold">Según tu nevera</span>
                        </div>

                        {/* Carrusel Horizontal */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                          {topDayRecipes.map((recipe) => {
                            const isHighlyMatched = recipe.affinity.percentage >= 60;
                            return (
                              <button
                                key={recipe.id}
                                onClick={() => {
                                  setSelectedRecipeId(recipe.id);
                                  setRecipeDetailBackScreen("home");
                                  setCurrentScreen("recipe_detail");
                                }}
                                className="snap-center shrink-0 w-[240px] text-left rounded-2xl bg-slate-950/50 border border-slate-900 overflow-hidden hover:border-sky-500/30 transition-colors"
                              >
                                <div className="h-28 w-full relative">
                                  <img 
                                    src={recipe.imageUrl} 
                                    alt={recipe.name} 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-bold font-mono backdrop-blur-md bg-slate-900/80 text-sky-300 border border-sky-400/20">
                                    {recipe.time} min
                                  </div>
                                </div>
                                <div className="p-3 space-y-1.5">
                                  <h5 className="text-xs font-extrabold text-white truncate">{recipe.name}</h5>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                      <span className="text-[10px] font-bold font-mono text-gray-300">{recipe.rating}</span>
                                    </div>

                                    {/* Indicador de Afinidad */}
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                      recipe.affinity.percentage === 100 
                                      ? "bg-emerald-500/20 text-emerald-400" 
                                      : isHighlyMatched ? "bg-amber-500/20 text-amber-400" : "bg-gray-500/20 text-gray-400"
                                    }`}>
                                      {recipe.affinity.percentage}% Coincide
                                    </span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Botón rápido Despensa */}
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900/10 to-indigo-950/40 border border-indigo-500/10 flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                            <ShoppingBag className="w-4 h-4 text-[#4FC3F7]" /> {t("pantryBoxTitle")}
                          </h4>
                          <p className="text-[10px] text-gray-400">{t("pantryBoxDesc", { count: pantry.length })}</p>
                        </div>
                        <button
                          onClick={() => {
                            setCurrentScreen("scanner");
                            startCamera();
                          }}
                          className="py-1.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-450 text-slate-900 text-xs font-bold transition-all flex items-center gap-1 shadow shrink-0"
                        >
                          {t("scanBoxBtn")} <ChevronRight className="w-3 h-3 text-slate-900" />
                        </button>
                      </div>

                      {/* Gemini IA Generador Card */}
                      <div className="p-4 rounded-2xl bg-[#09121E] border border-sky-450/40 border-dashed space-y-3">
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-lg text-white">
                            <Sparkles className="w-4.5 h-4.5 animate-spin-slow" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-indigo-200">¿Nada te convence hoy?</h4>
                            <p className="text-[10px] text-gray-400">Deja que Gemini IA cree una receta ideal con lo que tengas seleccionado.</p>
                          </div>
                        </div>
                        <button
                          onClick={handleGenerateGeminiRecipe}
                          disabled={geminiLoading}
                          className="w-full py-1.5 rounded-xl text-center bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-bold border border-indigo-400/30 transition-all"
                        >
                          {geminiLoading ? "Cocinando IA..." : "Generar receta sorpresa con IA"}
                        </button>
                      </div>

                    </div>

                    {/* Navigation Bar */}
                    <NavBar active="home" onChangeScreen={setCurrentScreen} t={t} />
                  </motion.div>
                )}

                {/* 4. MY PANTRY SCREEN */}
                {currentScreen === "pantry" && (
                  <motion.div
                    key="pantry"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* Header y búsqueda */}
                    <div className="p-4 border-b border-sky-950/30 space-y-3 shrink-0">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold font-display text-white">Mi Despensa</h4>
                        <button 
                          onClick={() => setPantry([])} 
                          className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
                          title="Vaciar despensa entera"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Vaciar
                        </button>
                      </div>

                      {/* Barra de búsqueda */}
                      <div className="relative">
                        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchPantryText}
                          onChange={(e) => setSearchPantryText(e.target.value)}
                          placeholder="Buscar ingrediente..."
                          className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950/50 border border-slate-900 text-xs text-white focus:outline-none focus:border-sky-500/50"
                        />
                      </div>

                      {/* Categorías deslizables */}
                      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedPantryTab(cat)}
                            className={`px-3 py-1 rounded-full whitespace-nowrap border-b-2 grow text-center transition-all ${
                              selectedPantryTab === cat
                                ? "bg-sky-500/10 border-sky-500 text-sky-400 font-bold"
                                : "bg-slate-950/30 border-transparent text-gray-400 hover:text-gray-300"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Lista scrollable de ingredientes de la categoría */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      
                      {/* Formulario rápido para añadir ingrediente custom */}
                      <div className="bg-slate-950/30 border border-slate-900/40 p-3 rounded-2xl flex gap-2 items-center">
                        <input
                          type="text"
                          value={newIngredientName}
                          onChange={(e) => setNewIngredientName(e.target.value)}
                          placeholder={`Añadir a "${selectedPantryTab}"...`}
                          className="flex-1 bg-slate-950/60 border border-slate-900 rounded-xl px-3 py-1 text-xs text-white focus:outline-none focus:border-sky-500/30"
                        />
                        <button
                          onClick={handleAddCustomIngredient}
                          className="p-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-900"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Grid de píldoras de ingredientes */}
                      <div className="flex flex-wrap gap-2">
                        {ingredientsByCategory.length === 0 ? (
                          <p className="text-center text-gray-500 text-xs py-6 w-full italic">No hay resultados en esta categoría.</p>
                        ) : (
                          ingredientsByCategory.map((ing) => {
                            const isChecked = pantry.includes(ing.id);
                            return (
                              <button
                                key={ing.id}
                                onClick={() => {
                                  if (isChecked) {
                                    setPantry((prev) => prev.filter((id) => id !== ing.id));
                                  } else {
                                    setPantry((prev) => [...prev, ing.id]);
                                  }
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                                  isChecked
                                    ? "bg-sky-500/20 border-sky-400 text-[#4FC3F7] shadow-sm font-bold scale-[1.03]"
                                    : "bg-slate-950/30 border-slate-900 text-gray-400 hover:text-gray-300 hover:border-slate-800"
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5" />}
                                {ing.name}
                              </button>
                            );
                          })
                        )}
                      </div>

                    </div>

                    {/* Botones flotantes al pie */}
                    <div className="p-4 bg-transparent shrink-0 space-y-2">
                      <button
                        onClick={handleGenerateGeminiRecipe}
                        disabled={geminiLoading}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-sky-200 border border-sky-400/30 bg-indigo-950/30 hover:bg-indigo-950/40 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                        {geminiLoading ? "Cocinando IA..." : "Sugerencia Mágica (IA)"}
                      </button>

                      <button
                        onClick={() => setCurrentScreen("recipes")}
                        className="w-full py-3 px-4 rounded-xl text-center font-bold text-[#0D1B2A] bg-sky-400 hover:bg-sky-300 transition-all shadow-md text-xs uppercase tracking-wider"
                      >
                        Buscar Recetas ({completeRecipes.length + almostReadyRecipes.length} Disp.)
                      </button>
                    </div>

                    <NavBar active="pantry" onChangeScreen={setCurrentScreen} t={t} />
                  </motion.div>
                )}

                {/* 5. RECIPES LIST SCREEN */}
                {currentScreen === "recipes" && (
                  <motion.div
                    key="recipes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* Header y Filtros */}
                    <div className="p-4 border-b border-sky-950/30 space-y-3 shrink-0">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold font-display text-white">Recetas</h4>
                        
                        {/* Botón de resetear filtros */}
                        <button
                          onClick={() => setFilters({ time: "", difficulty: "", mealType: "", diet: "" })}
                          className="p-1 px-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-gray-400 hover:text-white"
                        >
                          Reiniciar Filtros
                        </button>
                      </div>

                      {/* Dropdowns rápidos de filtrado */}
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <select
                          value={filters.difficulty}
                          onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                          className="bg-slate-950 border border-slate-900 rounded p-1 text-white text-[11px]"
                        >
                          <option value="">Dificultad (Todos)</option>
                          <option value="Fácil">Fácil</option>
                          <option value="Media">Media</option>
                          <option value="Difícil">Difícil</option>
                        </select>

                        <select
                          value={filters.diet}
                          onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
                          className="bg-slate-950 border border-slate-900 rounded p-1 text-white text-[11px]"
                        >
                          <option value="">Dieta (Todas)</option>
                          <option value="Vegetariana">Vegetariana</option>
                          <option value="Vegana">Vegana</option>
                          <option value="Pesquetariana">Pesquetariana</option>
                          <option value="Carnívora">Carnívora</option>
                        </select>
                      </div>

                      {/* Menú de categorías Gourmet (Horizontal deslizante) */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[9px] font-bold text-sky-400 uppercase tracking-widest pl-1">Menú de Selección Chef</span>
                        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none shrink-0 snap-x -mx-1 px-1">
                          {[
                            { id: "todas", label: "Todas", icon: "🍽️" },
                            { id: "rapidas", label: "Recetas Rápidas", icon: "⏱️" },
                            { id: "comida_rapida", label: "Comida Rápida", icon: "🍔" },
                            { id: "saludable", label: "Comida Saludable", icon: "🥗" },
                            { id: "saludable_rapida", label: "Saludable y Rápida", icon: "⚡" },
                            { id: "con_tiempo", label: "Con Tiempo", icon: "⏳" },
                            { id: "dificiles", label: "Dificiles", icon: "🔥" },
                            { id: "entrantes", label: "Entrantes", icon: "🍢" },
                            { id: "principales", label: "Principales", icon: "🍲" },
                            { id: "secundarios", label: "Secundarios", icon: "🥔" },
                            { id: "postres", label: "Postres", icon: "🧁" }
                          ].map((item) => {
                            const active = recipeQuickMenuTab === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => setRecipeQuickMenuTab(item.id)}
                                className={`snap-center shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 shadow ${
                                  active
                                    ? "bg-sky-400 text-[#0D1B2A] border-sky-300 scale-105"
                                    : "bg-slate-950/50 text-gray-400 border-slate-900 hover:text-white hover:border-slate-800"
                                }`}
                              >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Listado dividido por secciones */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5 scrollbar-thin">
                      
                      {/* Sección 1: Listo para cocinar (100% de ingredientes) */}
                      {completeRecipes.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 px-1 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                            Listas para Cocinar (100% Match)
                          </div>
                          
                          <div className="space-y-3">
                            {completeRecipes.map((recipe) => (
                              <RecipeMiniCard key={recipe.id} recipe={recipe} onSelect={(id) => { setSelectedRecipeId(id); setRecipeDetailBackScreen("recipes"); setCurrentScreen("recipe_detail"); }} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sección 2: Casi listos (50-99% o te falta poco) */}
                      {almostReadyRecipes.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 px-1 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            Casi Listas (Te falta poco)
                          </div>
                          
                          <div className="space-y-3">
                            {almostReadyRecipes.map((recipe) => (
                              <RecipeMiniCard key={recipe.id} recipe={recipe} onSelect={(id) => { setSelectedRecipeId(id); setRecipeDetailBackScreen("recipes"); setCurrentScreen("recipe_detail"); }} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sección 3: El resto con afinidad baja */}
                      {otherRecipes.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 px-1 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                            Faltan Ingredientes (Inspiraciones)
                          </div>
                          
                          <div className="space-y-3">
                            {otherRecipes.map((recipe) => (
                              <RecipeMiniCard key={recipe.id} recipe={recipe} onSelect={(id) => { setSelectedRecipeId(id); setRecipeDetailBackScreen("recipes"); setCurrentScreen("recipe_detail"); }} />
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredRecipes.length === 0 && (
                        <div className="text-center py-12 space-y-3">
                          <p className="text-xl">🥣</p>
                          <p className="text-xs text-gray-400">Ninguna receta local coincide con tus filtros y despensa.</p>
                          <button
                            onClick={() => { setFilters({ time: "", difficulty: "", mealType: "", diet: "" }); setPantry(["patatas", "cebolla", "huevos"]); }}
                            className="py-1.5 px-3 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[11px] font-semibold"
                          >
                            Restablecer Despensa Básica
                          </button>
                        </div>
                      )}

                    </div>

                    <NavBar active="recipes" onChangeScreen={setCurrentScreen} t={t} />
                  </motion.div>
                )}

                {/* 5.5 CHEFS SCREEN */}
                {currentScreen === "chefs" && (
                  <motion.div
                    key="chefs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-sky-950/30 space-y-1.5 shrink-0">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold font-display text-white">{t("chefsTitle")}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                          ⭐ Selección Michelin
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400">
                        {t("chefsSub")}
                      </p>
                    </div>

                    {/* Scrollable grid of Chefs */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none bg-[#0a111e]/20">
                      {FAMOUS_CHEFS.map((chef) => {
                        // Consigue las recetas del chef que están registradas en processedRecipes
                        const chefRecipesList = processedRecipes.filter((r) =>
                          chef.famousRecipes.includes(r.id)
                        );

                        return (
                          <div
                            key={chef.id}
                            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/40 to-slate-950/60 border border-sky-950/10 space-y-4"
                          >
                            {/* Perfil del Chef */}
                            <div className="flex gap-4 items-center">
                              <img
                                src={chef.avatarUrl}
                                alt={chef.name}
                                className="w-20 h-20 rounded-2xl object-cover border border-sky-500/20 shadow-lg shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                                  {chef.role}
                                </span>
                                <h5 className="text-base font-bold text-white font-display">
                                  {chef.name}
                                </h5>
                                <div className="flex items-center gap-1.5 text-xs">
                                  <div className="flex text-amber-400">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${
                                          i < chef.stars
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-slate-700"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-mono">
                                    x{chef.stars} {chef.stars === 1 ? "astro" : "astros"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Bio */}
                            <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                              {chef.bio}
                            </p>

                            {/* Recetas famosas */}
                            <div className="space-y-2">
                              <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <Award className="w-3.5 h-3.5 text-sky-400" />
                                {t("chefRecipes")}
                              </h6>

                              <div className="grid grid-cols-1 gap-2.5">
                                {chefRecipesList.map((recipe) => {
                                  const isHighlyMatched = recipe.affinity.percentage >= 60;
                                  return (
                                    <div
                                      key={recipe.id}
                                      onClick={() => {
                                        setSelectedRecipeId(recipe.id);
                                        setRecipeDetailBackScreen("chefs");
                                        setCurrentScreen("recipe_detail");
                                      }}
                                      className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-sky-500/20 hover:bg-slate-900/30 transition-all cursor-pointer group"
                                    >
                                      <img
                                        src={recipe.imageUrl}
                                        alt={recipe.name}
                                        className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform"
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-bold text-white truncate">
                                          {recipe.name}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5 text-[9px] text-gray-500">
                                          <span>⏱️ {recipe.time} min</span>
                                          <span>•</span>
                                          <span>{recipe.difficulty}</span>
                                        </div>
                                      </div>

                                      {/* Match badge con la despensa */}
                                      <div className="text-right shrink-0 pr-1">
                                        <div
                                          className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${
                                            recipe.affinity.percentage === 100
                                              ? "bg-emerald-500/10 text-emerald-400"
                                              : isHighlyMatched
                                              ? "bg-amber-500/10 text-amber-400"
                                              : "bg-slate-800 text-slate-400"
                                          }`}
                                        >
                                          {recipe.affinity.percentage}% match
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <NavBar active="chefs" onChangeScreen={setCurrentScreen} t={t} />
                  </motion.div>
                )}

                {/* 6. RECIPE DETAIL SCREEN */}
                {currentScreen === "recipe_detail" && selectedRecipe && (
                  <motion.div
                    key="recipe_detail"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* Botón flotante superior de volver */}
                    <div className="absolute top-4 left-4 z-40">
                      <button
                        onClick={() => {
                          setSelectedRecipeId(null);
                          setCurrentScreen(recipeDetailBackScreen);
                        }}
                        className="p-2 rounded-full backdrop-blur-md bg-slate-900/80 text-white border border-slate-800 shadow-md"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Scrollable Detail Body */}
                    <div className="flex-1 overflow-y-auto pb-4 scrollbar-none">
                      
                      {/* Hero Image */}
                      <div className="h-44 w-full relative">
                        <img 
                          src={selectedRecipe.imageUrl} 
                          alt={selectedRecipe.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] to-transparent"></div>
                      </div>

                      {/* Content details */}
                      <div className="px-4 -mt-6 relative z-10 space-y-4">
                        
                        {/* Título y Badges */}
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold font-display text-white leading-tight">
                            {selectedRecipe.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-[10px]">
                            <span className="px-2 py-0.5 rounded-md bg-sky-950 text-sky-400 font-bold border border-sky-500/20">
                              ⏱️ {selectedRecipe.time} MIN
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-400 font-bold border border-amber-500/20">
                              💪 {selectedRecipe.difficulty.toUpperCase()}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-purple-950 text-purple-400 font-bold border border-purple-500/20">
                              🍃 {selectedRecipe.diet}
                            </span>
                          </div>
                        </div>

                        {/* Descripción corta */}
                        <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
                          {selectedRecipe.description}
                        </p>

                        {/* Ingredientes check list */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300">Ingredientes requeridos:</h4>
                          
                          <div className="space-y-1.5 text-xs">
                            {selectedRecipe.ingredientsRequired.map((ingId) => {
                              const inPantry = pantry.includes(ingId);
                              const ingDetail = INGREDIENTS.find((i) => i.id === ingId) || customIngredients.find((i) => i.id === ingId);
                              const displayName = ingDetail ? ingDetail.name : ingId;

                              return (
                                <div 
                                  key={ingId} 
                                  className={`flex justify-between items-center px-2.5 py-1.5 rounded-lg border ${
                                    inPantry 
                                      ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" 
                                      : "bg-red-950/20 border-red-500/20 text-red-400"
                                  }`}
                                >
                                  <span className="font-medium">{displayName}</span>
                                  {inPantry ? (
                                    <span className="text-[9px] font-bold uppercase flex items-center gap-1 bg-emerald-500/20 px-1.5 py-0.5 rounded-md">
                                      <Check className="w-3 h-3 text-emerald-400" /> ¡En Despensa!
                                    </span>
                                  ) : (
                                    <span className="text-[9px] font-bold uppercase flex items-center gap-1 bg-red-500/20 px-1.5 py-0.5 rounded-md">
                                      <X className="w-3 h-3 text-red-400" /> Falta
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Vista general de pasos */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300">Resumen de preparación ({selectedRecipe.steps.length} pasos):</h4>
                          
                          <div className="space-y-1.5 text-xs text-slate-400">
                            {selectedRecipe.steps.map((step, idx) => (
                              <div key={idx} className="flex gap-2 items-start text-[11px]">
                                <span className="font-bold text-sky-400 font-mono shrink-0">{idx + 1}.</span>
                                <p className="leading-snug">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Calificación estrella interactiva al final */}
                        <div className="p-3 bg-slate-950/50 rounded-2xl border border-slate-900 flex justify-between items-center">
                          <span className="text-[10px] text-gray-400">¿Qué te parece?</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button key={s} onClick={() => alert(`¡Gracias por valorar con ${s} estrellas!`)}>
                                <Star className={`w-4 h-4 ${s <= Math.round(selectedRecipe.rating) ? "text-amber-400 fill-amber-400" : "text-gray-500"}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Botón ir a cocina flotante */}
                    <div className="p-4 bg-transparent shrink-0">
                      <button
                        onClick={() => {
                          setCookingStep(0);
                          setCurrentScreen("cooking");
                        }}
                        className="w-full py-3 px-4 rounded-xl text-center font-bold text-slate-900 bg-[#4FC3F7] hover:bg-sky-300 transition-all shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <Flame className="w-4.5 h-4.5 text-slate-950 animate-bounce" /> Empezar Modo Cocina
                      </button>
                    </div>

                  </motion.div>
                )}

                {/* 7. COOKING MODE SCREEN */}
                {currentScreen === "cooking" && selectedRecipe && (
                  <motion.div
                    key="cooking"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-b from-[#0D1B2A] to-[#050B12]"
                  >
                    {/* Header Cooking */}
                    <div className="flex justify-between items-center shrink-0 border-b border-sky-950/20 pb-4">
                      <button 
                        onClick={() => setCurrentScreen("recipe_detail")}
                        className="p-1 px-2.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-gray-300"
                      >
                        Regresar
                      </button>
                      <span className="text-xs font-bold font-display text-sky-300 uppercase tracking-widest">Modo Cocina</span>
                      <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        Despierto
                      </div>
                    </div>

                    {/* Step display grande y centrado */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-400/20">
                        Paso {cookingStep + 1} de {selectedRecipe.steps.length}
                      </span>

                      {/* Caja con sombra y relieve */}
                      <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-3xl w-full min-h-[160px] flex items-center justify-center shadow-xl">
                        <p className="text-base font-extrabold text-white leading-relaxed font-display">
                          {selectedRecipe.steps[cookingStep]}
                        </p>
                      </div>

                      {/* Lista circular pequeña indicadora de progreso */}
                      <div className="flex justify-center gap-1.5">
                        {selectedRecipe.steps.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === cookingStep ? "bg-sky-450 w-6 h-2 bg-[#4FC3F7]" : "bg-slate-800"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Botones de control de paso */}
                    <div className="space-y-3 shrink-0">
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          disabled={cookingStep === 0}
                          onClick={() => setCookingStep((prev) => Math.max(0, prev - 1))}
                          className="py-3 px-4 rounded-xl text-center font-bold text-gray-300 bg-slate-900 border border-slate-800 disabled:opacity-30 transition-all flex items-center justify-center gap-2 text-xs"
                        >
                          <ChevronLeft className="w-4 h-4" /> Anterior
                        </button>

                        {cookingStep < selectedRecipe.steps.length - 1 ? (
                          <button
                            onClick={() => setCookingStep((prev) => Math.min(selectedRecipe.steps.length - 1, prev + 1))}
                            className="py-3 px-4 rounded-xl text-center font-bold text-[#0D1B2A] bg-sky-400 hover:bg-sky-300 transition-all shadow-md flex items-center justify-center gap-2 text-xs"
                          >
                            Siguiente <ChevronRight className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFinishCooking(selectedRecipe)}
                            className="py-3 px-4 rounded-xl text-center font-bold text-white bg-emerald-500 hover:bg-emerald-400 transition-all shadow-md flex items-center justify-center gap-2 text-xs"
                          >
                            ⭐ Completado
                          </button>
                        )}
                      </div>

                      <p className="text-[10px] text-center text-gray-400">Las manos limpias, la pantalla permanecerá encendida.</p>
                    </div>
                  </motion.div>
                )}

                {/* 8. HISTORY SCREEN */}
                {currentScreen === "history" && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* Header Historial */}
                    <div className="p-4 border-b border-sky-950/30 shrink-0 flex justify-between items-center">
                      <h4 className="text-sm font-bold font-display text-white">Mi Historial</h4>
                      <span className="text-[10px] bg-sky-950 px-2 py-0.5 rounded-md text-sky-300 border border-sky-500/20 font-mono font-bold">
                        {cookedHistory.length} Platos
                      </span>
                    </div>

                    {/* Scrollable Historial List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-twin">
                      {cookedHistory.length === 0 ? (
                        <div className="text-center py-12 space-y-2">
                          <p className="text-2xl">🍽️</p>
                          <p className="text-xs text-slate-500 italic">No has cocinado ningún plato aún hoy.</p>
                        </div>
                      ) : (
                        cookedHistory.map((item) => (
                          <div 
                            key={item.id} 
                            className="p-3 rounded-2xl bg-slate-950/40 border border-slate-900 flex items-center justify-between gap-3"
                          >
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <h5 className="text-[11px] font-bold text-white truncate leading-snug">{item.name}</h5>
                              <p className="text-[9px] text-gray-400 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3 text-sky-400" /> {item.date}
                              </p>
                            </div>

                            {/* Guardado en favoritos toggle */}
                            <button
                              onClick={() => {
                                setCookedHistory((prev) =>
                                  prev.map((it) => (it.id === item.id ? { ...it, favorite: !it.favorite } : it))
                                );
                              }}
                              className="p-1.5 rounded-lg border border-slate-900 hover:border-slate-800 text-slate-600 hover:text-amber-400 transition-colors"
                            >
                              <Star className={`w-4.5 h-4.5 ${item.favorite ? "text-amber-400 fill-amber-400" : "text-gray-500"}`} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    <NavBar active="history" onChangeScreen={setCurrentScreen} t={t} />
                  </motion.div>
                )}

                {/* 9. COMMUNITY CHAT SCREEN */}
                {currentScreen === "community" && (
                  <motion.div
                    key="community"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* Header Foro */}
                    <div className="p-4 border-b border-sky-950/30 shrink-0 flex justify-between items-center">
                      <h4 className="text-sm font-bold font-display text-white">Comunidad Eco</h4>
                      <span className="text-[10px] text-sky-300 font-bold">Consejos de Aprovechamiento 🇪🇸</span>
                    </div>

                    {/* Chat Area Scrollable */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin">
                      
                      {/* Formulario de envío de post */}
                      <div className="bg-slate-950/40 border border-slate-900 p-3 rounded-2xl space-y-2">
                        <textarea
                          rows={2}
                          value={newPostText}
                          onChange={(e) => setNewPostText(e.target.value)}
                          placeholder="Comparte una experiencia de cocina sin desperdicios..."
                          className="w-full bg-[#0a101b] border border-slate-900 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-sky-500/30 resize-none"
                        ></textarea>
                        
                        <div className="flex justify-end">
                          <button
                            onClick={handleSendPost}
                            disabled={!newPostText.trim()}
                            className="py-1.5 px-3 rounded-xl bg-sky-400 hover:bg-sky-300 disabled:opacity-40 text-slate-900 text-[11px] font-bold transition-all flex items-center gap-1 shadow"
                          >
                            <Send className="w-3 h-3 text-slate-900" /> Publicar
                          </button>
                        </div>
                      </div>

                      {/* Lista de posts */}
                      <div className="space-y-4">
                        {communityPosts.map((post) => (
                          <div 
                            key={post.id} 
                            className="p-3.5 rounded-2xl bg-[#09101C]/50 border border-slate-900 text-xs space-y-3"
                          >
                            {/* Autor cabecera */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full ${post.avatarBg} flex items-center justify-center text-xs text-white shadow`}>
                                  {post.avatarEmoji}
                                </div>
                                <div>
                                  <span className="font-bold text-gray-200">@{post.username}</span>
                                  <span className="text-[9px] text-gray-400 block">{post.date}</span>
                                </div>
                              </div>
                            </div>

                            {/* Texto del post */}
                            <p className="text-[11px] text-gray-300 leading-normal">{post.text}</p>

                            {/* Imagen opcional */}
                            {post.photo && (
                              <div className="h-28 rounded-lg overflow-hidden border border-slate-900">
                                <img src={post.photo} alt="Post de la comida" className="w-full h-full object-cover" />
                              </div>
                            )}

                            {/* Botones de acción (Like, Comentar) */}
                            <div className="flex items-center gap-4 border-t border-slate-900 pt-2 text-[10px] text-gray-400 select-none">
                              <button 
                                onClick={() => handleLikePost(post.id)}
                                className={`flex items-center gap-1 hover:text-sky-300 transition-colors ${post.likedByMe ? "text-[#4FC3F7] font-bold" : ""}`}
                              >
                                <ThumbsUp className="w-3.5 h-3.5" /> {post.likes} Me Gusta
                              </button>

                              <button 
                                onClick={() => setActiveReplyPostId(activeReplyPostId === post.id ? null : post.id)}
                                className="flex items-center gap-1 hover:text-sky-300 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" /> {post.replies.length} Comentar
                              </button>
                            </div>

                            {/* Sub-Comentarios/Hilos */}
                            {post.replies.length > 0 && (
                              <div className="pl-3 border-l-2 border-sky-950 text-[10px] space-y-2 mt-2 bg-[#050B13]/30 p-2 rounded-lg">
                                {post.replies.map((reply, rid) => (
                                  <div key={rid} className="leading-relaxed">
                                    <span className="font-bold text-sky-400">@{reply.username}: </span>
                                    <span className="text-gray-300">{reply.text}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Campo de escritura de comentario activo */}
                            {activeReplyPostId === post.id && (
                              <div className="flex gap-2 items-center mt-2.5">
                                <input
                                  type="text"
                                  value={newReplyText}
                                  onChange={(e) => setNewReplyText(e.target.value)}
                                  placeholder="Escribe un comentario..."
                                  className="flex-1 bg-slate-950 text-[10px] border border-slate-900 rounded-lg p-2.5 text-white focus:outline-none focus:border-sky-400"
                                />
                                <button
                                  onClick={() => handleSendReply(post.id)}
                                  className="p-1 px-3 bg-indigo-500 rounded-lg text-white font-bold text-[10px]"
                                >
                                  Enviar
                                </button>
                              </div>
                            )}

                          </div>
                        ))}
                      </div>

                    </div>

                    <NavBar active="community" onChangeScreen={setCurrentScreen} t={t} />
                  </motion.div>
                )}

                {/* 10. ADMIN PANEL SCREEN */}
                {currentScreen === "admin" && (
                  <motion.div
                    key="admin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-[#0D1B2A] to-[#040B12]"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-sky-950/30 flex items-center justify-between shrink-0">
                      <div>
                        <h4 className="text-sm font-bold font-display text-white">Panel de Control de la Demo</h4>
                        <p className="text-[10px] text-gray-400">Controla el estado global de la despensa de España y simula afinidades</p>
                      </div>
                      <div className="px-2 py-0.5 rounded-full bg-sky-900/30 border border-sky-500/20 text-[9px] font-mono text-sky-450 font-bold">
                        Modo Sandbox 🇪🇸
                      </div>
                    </div>

                    {/* Contenido scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                      
                      {/* 1. Atajos de preconfigurar despensa */}
                      <div className="bg-slate-950/30 border border-slate-900/60 p-4 rounded-2xl space-y-3">
                        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">🔧 Preconfigurar Despensa de Pruebas</span>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          Carga ingredientes instantáneamente en tu despensa inteligente para forzar la afinidad de recetas locamente:
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          <button 
                            onClick={() => {
                              fillPantryWithPreset("empty");
                              setCurrentScreen("pantry");
                            }}
                            className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all flex items-center justify-center gap-1.5"
                          >
                            🚫 Vaciar Todo
                          </button>
                          <button 
                            onClick={() => {
                              fillPantryWithPreset("tortilla");
                              setCurrentScreen("recipes");
                            }}
                            className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                          >
                            🍳 Tortilla (100%)
                          </button>
                          <button 
                            onClick={() => {
                              fillPantryWithPreset("salmorejo");
                              setCurrentScreen("recipes");
                            }}
                            className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 border border-rose-500/20 transition-all flex items-center justify-center gap-1.5"
                          >
                            🍅 Salmorejo (100%)
                          </button>
                          <button 
                            onClick={() => {
                              fillPantryWithPreset("all");
                              setCurrentScreen("pantry");
                            }}
                            className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 transition-all flex items-center justify-center gap-1.5"
                          >
                            ✨ Llenar Todo
                          </button>
                        </div>
                      </div>

                      {/* 2. Resumen de Afinidades */}
                      <div className="bg-slate-950/30 border border-slate-900/60 p-4 rounded-2xl space-y-3">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">📊 Resumen de Afinidad Real</span>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-900">
                            <span className="text-gray-400 block pb-1">Ingredientes Escaneados</span>
                            <span className="font-mono font-bold text-sky-400 text-sm">{pantry.length} elementos</span>
                          </div>
                          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-900">
                            <span className="text-gray-400 block pb-1">Recetas 100% Match</span>
                            <span className="font-mono font-bold text-emerald-400 text-sm">{completeRecipes.length} listas</span>
                          </div>
                          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-900">
                            <span className="text-gray-400 block pb-1">Recetas casi listas</span>
                            <span className="font-mono font-bold text-amber-400 text-sm">{almostReadyRecipes.length} sugeridas</span>
                          </div>
                          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-900">
                            <span className="text-gray-400 block pb-1">Ingredientes Propios</span>
                            <span className="font-mono font-semibold text-indigo-400 text-sm">{customIngredients.length} creados</span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Motor Gemini AI Inteligente */}
                      <div className="bg-gradient-to-br from-indigo-950/20 via-sky-950/10 to-transparent border border-sky-500/20 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-sky-400" />
                          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">🧠 Motor de IA con Gemini</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          La aplicación utiliza el modelo <strong className="text-sky-300 font-sans">gemini-3.5-flash</strong> mediante la API segura del servidor para conceptualizar e idear recetas de aprovechamiento inéditas y saludables basadas en tu nevera española.
                        </p>
                        
                        <button
                          onClick={handleGenerateGeminiRecipe}
                          disabled={geminiLoading}
                          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-sky-450 to-indigo-505 hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                          {geminiLoading ? "Cocinando con IA..." : "¡Generar Receta Mágica con IA!"}
                        </button>
                        
                        {geminiError && (
                          <p className="text-[11px] text-red-400 mt-2 bg-red-950/30 p-2.5 rounded-xl border border-red-900/40">
                            ⚠️ {geminiError}
                          </p>
                        )}
                      </div>

                      {/* 4. Enlaces de Navegación rápidos */}
                      <div className="bg-slate-950/30 border border-slate-900/60 p-4 rounded-2xl space-y-3">
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block">🚀 Atajos de Vista Directa</span>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {(["splash", "login", "home", "pantry", "recipes", "history", "community"] as const).map((screen) => (
                            <button
                              key={screen}
                              onClick={() => {
                                if (!user && screen !== "splash" && screen !== "login") {
                                  loginAsUser("Mario Huguet", true);
                                }
                                setCurrentScreen(screen);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all truncate min-w-[75px] text-center ${
                                currentScreen === (screen as string)
                                  ? "bg-sky-500 text-slate-900 border-sky-500"
                                  : "bg-slate-900/45 text-gray-400 border-slate-800 hover:text-white"
                              }`}
                            >
                              {screen === "pantry" ? "Despensa" : screen === "recipes" ? "Recetas" : screen === "history" ? "Historial" : screen === "community" ? "Comunidad" : screen}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Navbar */}
                    <NavBar active="admin" onChangeScreen={setCurrentScreen} t={t} />
                  </motion.div>
                )}

                {/* 11. SCANNER SCREEN */}
                {currentScreen === "scanner" && (
                  <motion.div
                    key="scanner"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex flex-col justify-between"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-sky-950/30 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            stopCamera();
                            setCurrentScreen("pantry");
                          }}
                          className="p-1 px-2.5 rounded-lg bg-slate-900/40 hover:bg-slate-800 text-gray-300"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                          <h4 className="text-xs font-bold font-display text-white">{t("scannerTitle")}</h4>
                          <p className="text-[10px] text-gray-400">{t("scannerSub")}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-[9px] font-bold text-indigo-300 font-mono">
                        VISION AI
                      </span>
                    </div>

                    {/* Scanner Viewport Section */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin flex flex-col">
                      
                      {/* Video Camera Panel Container */}
                      <div className="relative w-full h-[280px] bg-black rounded-3xl overflow-hidden border border-slate-900/80 flex items-center justify-center">
                        {scannerActive ? (
                          <video 
                            ref={videoRef} 
                            className="w-full h-full object-cover"
                            autoPlay 
                            playsInline 
                            muted
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3">
                            <div className="p-4 bg-slate-900/60 rounded-full text-sky-400">
                              <Camera className="w-8 h-8" />
                            </div>
                            <span className="text-xs text-gray-400">{t("startCamera")}</span>
                          </div>
                        )}

                        {/* Sweeping Laser Effect */}
                        {scannerActive && !scannerOutput && !scannerLoading && (
                          <div className="absolute inset-0 w-full h-full pointer-events-none">
                            <motion.div 
                              initial={{ top: 0 }}
                              animate={{ top: "100%" }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                              className="absolute left-0 right-0 h-1 bg-[#4FC3F7] shadow-[0_0_15px_#4FC3F7]"
                            />
                            {/* HUD Graphic Corners */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-[#4FC3F7] rounded-tl-sm pointer-events-none"></div>
                            <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-[#4FC3F7] rounded-tr-sm pointer-events-none"></div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-[#4FC3F7] rounded-bl-sm pointer-events-none"></div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-[#4FC3F7] rounded-br-sm pointer-events-none"></div>
                          </div>
                        )}

                        {/* Loading / Searching overlay */}
                        {scannerLoading && (
                          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 rounded-full border-4 border-dashed border-[#4FC3F7] border-t-transparent animate-spin"></div>
                            <span className="text-xs font-bold text-[#4FC3F7] font-mono tracking-widest uppercase">{t("scanningActive")}</span>
                          </div>
                        )}
                      </div>

                      {/* Controls Row */}
                      <div className="grid grid-cols-2 gap-2.5 shrink-0">
                        {scannerActive ? (
                          <button
                            onClick={stopCamera}
                            className="py-2.5 px-3 rounded-xl text-center bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold transition-colors"
                          >
                            {t("stopCamera")}
                          </button>
                        ) : (
                          <button
                            onClick={startCamera}
                            className="py-2.5 px-3 rounded-xl text-center bg-sky-500/10 hover:bg-sky-500/20 text-[#4FC3F7] border border-sky-500/20 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                          >
                            <Camera className="w-4 h-4" /> {t("startCamera")}
                          </button>
                        )}

                        <button
                          onClick={captureAndScan}
                          disabled={!scannerActive || scannerLoading}
                          className="py-2.5 px-3 rounded-xl text-center bg-sky-500 hover:bg-sky-450 disabled:opacity-40 text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                        >
                          <Camera className="w-4 h-4 text-slate-900" /> {t("captureBtn")}
                        </button>
                      </div>

                      {/* Error Banner */}
                      {scannerError && (
                        <div className="p-3 rounded-2xl bg-red-950/30 border border-red-900/50 text-[11px] text-red-350 leading-normal">
                          ⚠️ {scannerError}
                        </div>
                      )}

                      {/* Fallback Simulator / Upload Section */}
                      {!scannerOutput && (
                        <div className="bg-[#09101C]/50 border border-slate-900/80 p-4 rounded-3xl space-y-3">
                          <p className="text-[10px] text-gray-400 leading-relaxed text-center">
                            {t("photoRequirement")}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              onClick={handleSimulateScan}
                              disabled={scannerLoading}
                              className="py-2 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              {t("simulateBtn")}
                            </button>

                            <label className="py-2 px-3 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-gray-300 border border-slate-800 text-[10px] font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center">
                              <Upload className="w-3.5 h-3.5" />
                              {t("uploadBtn")}
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageUpload} 
                                disabled={scannerLoading}
                              />
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Output results */}
                      {scannerOutput && (
                        <div className="space-y-4">
                          {/* Identified Food Header */}
                          <div className="p-4 rounded-3xl bg-indigo-950/20 border border-indigo-900/40 space-y-1">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">{t("detectedFoodLabel")}</span>
                            <h5 className="text-sm font-bold text-white">{scannerOutput.identifiedFood}</h5>
                          </div>

                          {/* Suggested Recipes List */}
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{t("aiRecipesFound")}</span>
                            
                            <div className="space-y-3">
                              {scannerOutput.recipes.map((rc, idx) => (
                                <div 
                                  key={idx}
                                  className="p-4 rounded-3xl bg-slate-950/45 border border-slate-900 space-y-3"
                                >
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                      <h6 className="text-xs font-bold text-white leading-snug truncate">{rc.name}</h6>
                                      <div className="flex items-center gap-2 text-[9px] text-sky-400 mt-1">
                                        <span>⏱️ {rc.time} min</span>
                                        <span>•</span>
                                        <span>💪 {rc.difficulty}</span>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => {
                                        const newScannedRecipe: Recipe = {
                                          id: `scanned_${Date.now()}_${idx}`,
                                          name: rc.name,
                                          description: rc.description,
                                          time: rc.time,
                                          difficulty: rc.difficulty,
                                          mealType: "Almuerzo",
                                          diet: "Vegetariana",
                                          category: "Detectado con IA 📸",
                                          ingredientsRequired: rc.ingredientsRequired,
                                          steps: rc.steps,
                                          imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",
                                          rating: 4.8
                                        };
                                        setRecipes((prev) => [newScannedRecipe, ...prev]);
                                        setSelectedRecipeId(newScannedRecipe.id);
                                        setCurrentScreen("recipe_detail");
                                      }}
                                      className="py-1 px-3 rounded-lg bg-sky-500 text-slate-900 font-bold text-[10px] hover:bg-sky-400 shadow transition-all whitespace-nowrap shrink-0"
                                    >
                                      {t("howToCook")}
                                    </button>
                                  </div>
                                  <p className="text-[10px] text-gray-300 leading-normal">{rc.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    <NavBar active="pantry" onChangeScreen={setCurrentScreen} t={t} />
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Settings / Language Settings Modal Overlay */}
              {showSettingsModal && (
                <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-end">
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    className={`w-full max-h-[85%] rounded-t-3xl p-6 overflow-y-auto ${theme === "dark" ? "bg-[#0D1B2A] border-t border-slate-800 text-white" : "bg-white border-t border-slate-200 text-slate-800"}`}
                  >
                    <div className="flex justify-between items-center pb-4 border-b border-sky-950/30">
                      <h4 className="text-sm font-bold font-display uppercase tracking-wider text-sky-400 flex items-center gap-2">
                        <Settings className="w-5 h-5 animate-spin-slow" />
                        {t("settingsTitle")}
                      </h4>
                      <button 
                        onClick={() => setShowSettingsModal(false)}
                        className="p-1 px-3 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20"
                      >
                        {t("closeBtn")}
                      </button>
                    </div>

                    <div className="py-6 space-y-6">
                      {/* Language Selection Grid */}
                      <div className="space-y-2.5">
                        <label className="text-xs font-bold text-gray-400 block">{t("languageLabel")}</label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => setLanguage(lang.code as any)}
                              className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition-all ${
                                language === lang.code
                                  ? "bg-sky-500/10 border-sky-500 text-sky-400"
                                  : "bg-slate-900/30 border-[#0F1C2E] text-gray-300 hover:text-white"
                              }`}
                            >
                              <span className="text-xl">{lang.flag}</span>
                              <span>{lang.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Profile Settings */}
                      <div className="space-y-2.5">
                        <label className="text-xs font-bold text-gray-400 block">{t("profileLabel")}</label>
                        <div className="bg-slate-950/30 border border-[#0F1C2E] p-4 rounded-2xl space-y-3">
                          <div className="flex gap-2.5 items-center">
                            <input
                              type="text"
                              value={user?.name || "Mario"}
                              onChange={(e) => {
                                const newName = e.target.value;
                                setUser(prev => prev ? { ...prev, name: newName } : { name: newName, avatar: CHEF_AVATARS[0], isGuest: false });
                              }}
                              className="flex-1 bg-slate-950 text-xs border border-slate-905 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-500/30"
                              placeholder="Tu nombre de chef..."
                            />
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] text-gray-400 block font-semibold">{t("chooseChefNick")}</span>
                            <div className="flex gap-2 flex-wrap">
                              {CHEF_AVATARS.map((av) => (
                                <button
                                  key={av.id}
                                  onClick={() => setUser(prev => prev ? { ...prev, avatar: av } : { name: "Mario", avatar: av, isGuest: false })}
                                  className={`p-2 rounded-xl flex items-center justify-center text-lg transition-all border ${
                                    user?.avatar.id === av.id
                                      ? "bg-sky-500/20 border-sky-500 scale-105"
                                      : "bg-slate-950/50 border-transparent hover:scale-105"
                                  }`}
                                  title={av.label}
                                >
                                  {av.emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              )}

              {/* Loader chef de IA con Gemini */}
              {geminiLoading && (
                <div className="absolute inset-0 z-50 bg-[#0D1B2A]/90 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center space-y-6">
                  <div className="relative">
                    {/* Elementos giratorios de cocina */}
                    <div className="w-16 h-16 rounded-full border-4 border-dashed border-[#4FC3F7] border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ChefHat className="w-7 h-7 text-[#4FC3F7]" />
                    </div>
                  </div>

                  <div className="space-y-2.5 max-w-[260px]">
                    <h5 className="text-sm font-bold font-display text-white">IA Chef Gemini Generando...</h5>
                    
                    {/* Frases divertidas que van rotando por el chef de IA */}
                    <p className="text-xs text-sky-300 italic min-h-[36px]" key={chefTipIndex}>
                      &quot;{CHEF_TIPS[chefTipIndex]}&quot;
                    </p>
                  </div>
                </div>
              )}

        </div>

      </main>

      {/* FOOTER DESESPERADO DE ENLACES O MARCAS */}
      <footer className={`py-8 text-center border-t text-xs ${theme === "dark" ? "bg-[#070b13] border-slate-900 text-gray-500" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
        <p>© 2026 Eco Scan & Cook. Diseñado para un consumo saludable y sostenible de aprovechamiento en España.</p>
        <p className="mt-1">Todos los textos en castellano de la península huyendo de traducciones automáticas.</p>
      </footer>

    </div>
  );
}

// --- SUBCOMPONENTES AUXILIARES LOCALES ---

// 1. CARDS DE RECETA
function RecipeMiniCard({ 
  recipe, 
  onSelect 
}: { 
  recipe: Recipe & { affinity: { matched: number; total: number; percentage: number; missing: string[] } };
  onSelect: (id: string) => void;
}) {
  const isHighlyMatched = recipe.affinity.percentage >= 60;
  return (
    <button 
      onClick={() => onSelect(recipe.id)}
      className="w-full text-left rounded-2xl bg-slate-950/40 border border-slate-900 overflow-hidden hover:border-[#4FC3F7]/35 flex transition-all"
    >
      <div className="w-24 h-24 shrink-0 relative">
        <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/40"></div>
      </div>

      <div className="p-2.5 flex-1 min-w-0 flex flex-col justify-between">
        <div className="space-y-0.5">
          <h5 className="text-xs font-bold font-display text-white leading-snug truncate">{recipe.name}</h5>
          
          <div className="flex items-center gap-2 text-[9px] text-gray-400">
            <span>⏱️ {recipe.time} min</span>
            <span>•</span>
            <span>⏱️ {recipe.difficulty}</span>
          </div>
        </div>

        {/* Sección de ingredientes afines */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[9px]">
            <span className="text-gray-400">Coincidencia despensa:</span>
            <span className={`font-mono font-bold ${
              recipe.affinity.percentage === 100 
                ? "text-emerald-400" 
                : isHighlyMatched ? "text-amber-400" : "text-gray-400"
            }`}>
              {recipe.affinity.percentage}% ({recipe.affinity.matched}/{recipe.affinity.total})
            </span>
          </div>
          
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <div 
              style={{ width: `${recipe.affinity.percentage}%` }}
              className={`h-full ${
                recipe.affinity.percentage === 100 
                  ? "bg-emerald-400" 
                  : isHighlyMatched ? "bg-amber-400" : "bg-gray-700"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </button>
  );
}

// 2. NAV BAR MÓVIL (HOME | PANTRY | RECIPES | CHEFS | HISTORY | COMMUNITY CHATS | ADMIN)
function NavBar({ 
  active, 
  onChangeScreen,
  t
}: { 
  active: "home" | "pantry" | "recipes" | "history" | "community" | "admin" | "chefs"; 
  onChangeScreen: (screen: "home" | "pantry" | "recipes" | "history" | "community" | "admin" | "chefs") => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}) {
  return (
    <nav className="border-t border-sky-950/20 bg-slate-950/90 py-1.5 flex items-center justify-around shrink-0 z-40 select-none text-[8.5px] font-bold">
      
      {/* Home */}
      <button 
        onClick={() => onChangeScreen("home")}
        className={`flex flex-col items-center gap-0.5 p-1 px-1.5 transition-colors ${active === "home" ? "text-[#4FC3F7]" : "text-gray-500 hover:text-gray-400"}`}
      >
        <ChefHat className="w-5 h-5" />
        <span>{t("homeNav")}</span>
      </button>
 
      {/* Despensa */}
      <button 
        onClick={() => onChangeScreen("pantry")}
        className={`flex flex-col items-center gap-0.5 p-1 px-1.5 transition-colors ${active === "pantry" ? "text-[#4FC3F7]" : "text-gray-500 hover:text-gray-400"}`}
      >
        <ShoppingBag className="w-5 h-5" />
        <span>{t("pantryNav")}</span>
      </button>
 
      {/* Recetas */}
      <button 
        onClick={() => onChangeScreen("recipes")}
        className={`flex flex-col items-center gap-0.5 p-1 px-1.5 transition-colors ${active === "recipes" ? "text-[#4FC3F7]" : "text-gray-500 hover:text-gray-400"}`}
      >
        <Utensils className="w-5 h-5" />
        <span>{t("recipesNav")}</span>
      </button>
 
      {/* Chefs */}
      <button 
        onClick={() => onChangeScreen("chefs")}
        className={`flex flex-col items-center gap-0.5 p-1 px-1.5 transition-colors ${active === "chefs" ? "text-[#4FC3F7]" : "text-gray-500 hover:text-gray-400"}`}
      >
        <Award className="w-5 h-5" />
        <span>{t("chefsNav")}</span>
      </button>
 
      {/* Historial */}
      <button 
        onClick={() => onChangeScreen("history")}
        className={`flex flex-col items-center gap-0.5 p-1 px-1.5 transition-colors ${active === "history" ? "text-[#4FC3F7]" : "text-gray-500 hover:text-gray-400"}`}
      >
        <History className="w-5 h-5" />
        <span>{t("historyNav")}</span>
      </button>
 
      {/* Comunidad */}
      <button 
        onClick={() => onChangeScreen("community")}
        className={`flex flex-col items-center gap-0.5 p-1 px-1.5 transition-colors ${active === "community" ? "text-[#4FC3F7]" : "text-gray-500 hover:text-gray-400"}`}
      >
        <MessageSquare className="w-5 h-5" />
        <span>{t("communityNav")}</span>
      </button>
 
      {/* Admin Panel */}
      <button 
        onClick={() => onChangeScreen("admin")}
        className={`flex flex-col items-center gap-0.5 p-1 px-1.5 transition-colors ${active === "admin" ? "text-[#4FC3F7]" : "text-gray-500 hover:text-gray-400"}`}
      >
        <Sliders className="w-5 h-5" />
        <span>{t("adminNav")}</span>
      </button>
 
    </nav>
  );
}
