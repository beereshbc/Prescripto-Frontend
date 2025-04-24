import React, { useState, useContext, useEffect, useRef } from "react";
import { MessageSquare, X } from "lucide-react";
import { Context } from "../context/context";
import { assets } from "../assets/assets";

const Gemini = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const resultRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleSize = () => setIsFull(!isFull);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [resultData]);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg z-50 hover:bg-gray-800 transition-all"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chatbot UI */}
      {isOpen && (
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter") onSent();
          }}
          className={`fixed z-40 bg-white dark:bg-gray-900 text-black dark:text-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${
            isFull
              ? "top-0 left-0 w-full h-full"
              : "bottom-20 right-6 w-[360px] h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-black text-white">
            <span className="font-semibold">YakshaCare Bot 🤖</span>
            <div className="space-x-2">
              <button onClick={toggleSize} className="text-white text-sm">
                {isFull ? "Minimize" : "Expand"}
              </button>
              <button onClick={toggleOpen} className="text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            {!showResult ? (
              <p className="text-sm text-gray-400 text-center mt-10">
                Ask me anything about hospitals, doctors, or your health.
              </p>
            ) : (
              <div className="p-1 poppins max-h-full overflow-y-auto">
                <div className="mb-6 flex items-center gap-4">
                  <img
                    src={assets.user_icon}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-base">{recentPrompt}</p>
                </div>

                <div ref={resultRef} className="flex items-start gap-4">
                  <img src={assets.gemini_icon} alt="" className="w-10" />
                  {loading ? (
                    <div className="flex flex-col gap-2 w-full">
                      <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse w-full" />
                      <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse w-5/6" />
                      <div className="h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse w-4/6" />
                    </div>
                  ) : (
                    <p
                      className="text-[15px] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: resultData }}
                    ></p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="border-t p-3">
            <div className="flex items-center justify-between gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
              <input
                type="text"
                placeholder="Enter your question..."
                className="flex-1 bg-transparent border-none outline-none text-sm p-2 text-black dark:text-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="flex gap-2 items-center">
                <img
                  src={assets.gallery_icon}
                  alt=""
                  className="w-5 cursor-pointer invert"
                />
                <img
                  src={assets.mic_icon}
                  alt=""
                  className="w-5 cursor-pointer invert"
                />
                {input && (
                  <img
                    src={assets.send_icon}
                    alt=""
                    className="w-5 cursor-pointer invert"
                    onClick={onSent}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gemini;
