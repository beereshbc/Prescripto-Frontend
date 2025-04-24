import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white p-4 flex flex-col justify-between transition-all duration-300 ease-in-out ${
        extended ? "w-64" : "w-20"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Menu Toggle Button */}
        <div className="flex justify-end mb-6">
          <img
            onClick={() => setExtended((prev) => !prev)}
            src={assets.menu_icon}
            alt="menu"
            className="w-6 h-6 cursor-pointer invert "
          />
        </div>

        {/* New Chat Button */}
        <div
          onClick={newChat}
          className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 p-3 rounded-xl cursor-pointer mb-6"
        >
          <img
            src={assets.plus_icon}
            alt="new chat invert"
            className="w-5 h-5 invert"
          />
          {extended && <p className="text-sm">New Chat</p>}
        </div>

        {/* Recent Prompts */}
        {extended && <p className="text-sm text-gray-400 mb-2">Recent</p>}
        <div className="space-y-2">
          {prevPrompts.map((item, index) => (
            <div
              key={index}
              onClick={() => loadPrompt(item)}
              className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 p-3 rounded-xl cursor-pointer"
            >
              <img
                src={assets.message_icon}
                alt="msg"
                className="w-5 h-5 invert"
              />
              {extended && <p className="text-sm truncate w-[140px]">{item}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-xl cursor-pointer">
          <img
            src={assets.question_icon}
            alt="help"
            className="w-5 h-5 invert"
          />
          {extended && <p className="text-sm">Help</p>}
        </div>
        <div className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-xl cursor-pointer">
          <img
            src={assets.history_icon}
            alt="activity"
            className="w-5 h-5 invert"
          />
          {extended && <p className="text-sm">Activity</p>}
        </div>
        <div className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded-xl cursor-pointer">
          <img
            src={assets.setting_icon}
            alt="settings"
            className="w-5 h-5 invert"
          />
          {extended && <p className="text-sm">Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
