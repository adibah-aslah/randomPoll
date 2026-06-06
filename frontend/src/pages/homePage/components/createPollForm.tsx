import { useState } from "react";
import { LuPlus, LuTrash2 } from "react-icons/lu";

export const CreatePollForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => setOptions([...options, ""]);

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="space-y-6 py-2 px-1.5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Poll Question</label>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-hidden"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium flex justify-between">
          Options
          <span className="text-xs text-muted-foreground">Min 2 options</span>
        </label>

        {options.map((option, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className="flex-1 p-2 rounded-md border bg-background focus:border-primary outline-hidden transition-all"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
            />
            {options.length > 2 && (
              <button
                onClick={() => removeOption(index)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              >
                <LuTrash2 size={18} />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addOption}
          className="w-full py-2 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary hover:border-primary transition-all"
        >
          <LuPlus size={16} />
          Add Option
        </button>
      </div>
    </div>
  );
};
