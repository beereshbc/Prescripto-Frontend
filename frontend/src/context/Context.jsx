import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (customPrompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const finalPrompt = typeof customPrompt === "string" ? customPrompt : input;
    setRecentPrompt(finalPrompt);
    setPrevPrompts((prev) => [...prev, finalPrompt]);

    try {
      const responseText = await run([{ text: finalPrompt }]);

      let responseArray = responseText.split("**");
      let formattedResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        formattedResponse +=
          i % 2 === 1
            ? `<u><i><b>${responseArray[i]}</b></i></u>`
            : responseArray[i];
      }

      const responseWithBreaks = formattedResponse.split("*").join("</br>");
      const wordArray = responseWithBreaks.split(" ");
      wordArray.forEach((word, i) => delayPara(i, word + " "));
    } catch (error) {
      console.error("Gemini error:", error);
      setResultData("❌ Failed to get response from VaidhyBandhu.");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
