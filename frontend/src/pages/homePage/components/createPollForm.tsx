import { usePollStore } from "@/store/usePollStore";
import { useState } from "react";
import { LuPlus, LuTrash2 } from "react-icons/lu";

interface CreatePollFormProps {
  onSuccess: () => void;
}

export const CreatePollForm = ({ onSuccess }: CreatePollFormProps) => {
  const { createPoll, isLoading } = usePollStore();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) return alert("Please enter a question");
    const validOptions = options.filter((opt) => opt.trim() !== "");
    if (validOptions.length < 2)
      return alert("Please provide at least 2 options");

    const success = await createPoll({
      question: question.trim(),
      category: category.trim() || "Community",
      options: validOptions,
    });

    if (success) {
      onSuccess();
    }
  };

  return (
    <form
      id="create-poll-form"
      onSubmit={handleSubmit}
      className="space-y-6 py-2 px-1.5"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <input
          type="text"
          placeholder="e.g., Tech, Movies, Food (Defaults to Community)"
          className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-hidden"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Poll Question</label>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-hidden"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
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
              disabled={isLoading}
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                disabled={isLoading}
              >
                <LuTrash2 size={18} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addOption}
          className="w-full py-2 border-2 border-dashed rounded-lg flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary hover:border-primary transition-all"
          disabled={isLoading}
        >
          <LuPlus size={16} />
          Add Option
        </button>
      </div>
    </form>
  );
};
