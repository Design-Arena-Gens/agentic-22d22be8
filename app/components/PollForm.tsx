"use client";

import { FormEvent, useState } from "react";

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 6;

const defaultOptions = ["Option A", "Option B", "Option C"];

export type PollFormData = {
  question: string;
  description?: string;
  options: string[];
  allowMultiple: boolean;
};

type PollFormProps = {
  onCreate: (poll: PollFormData) => void;
};

export default function PollForm({ onCreate }: PollFormProps) {
  const [question, setQuestion] = useState("What should we vote on today?");
  const [description, setDescription] = useState("Share your poll link or keep it for in-person sessions.");
  const [options, setOptions] = useState<string[]>(defaultOptions);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sanitizedOptions = options
      .map((value) => value.trim())
      .filter((value, index, self) => value.length > 0 && self.indexOf(value) === index);

    if (question.trim().length < 4) {
      setError("Please ask a question with at least four characters.");
      return;
    }

    if (sanitizedOptions.length < MIN_OPTIONS) {
      setError(`Add at least ${MIN_OPTIONS} unique options.`);
      return;
    }

    setError(null);

    onCreate({
      question: question.trim(),
      description: description.trim() || undefined,
      options: sanitizedOptions,
      allowMultiple,
    });

    setQuestion("");
    setDescription("");
    setOptions(["", ""]);
    setAllowMultiple(false);
  };

  const updateOption = (index: number, value: string) => {
    setOptions((current) => current.map((option, idx) => (idx === index ? value : option)));
  };

  const addOption = () => {
    if (options.length >= MAX_OPTIONS) return;
    setOptions((current) => [...current, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= MIN_OPTIONS) return;
    setOptions((current) => current.filter((_, idx) => idx !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-xl shadow-primary-100/60 ring-1 ring-primary-100">
      <div>
        <label className="block text-sm font-semibold text-gray-800">Poll question</label>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={2}
          placeholder="What are we deciding?"
          className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-3 py-2 text-sm shadow-inner focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800">Optional description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={2}
          placeholder="Share context, rules, or links"
          className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50/70 px-3 py-2 text-sm shadow-inner focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-gray-800">Answer options</label>
          <button
            type="button"
            onClick={addOption}
            className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={options.length >= MAX_OPTIONS}
          >
            Add option
          </button>
        </div>
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={option}
                onChange={(event) => updateOption(index, event.target.value)}
                placeholder={`Choice ${index + 1}`}
                className="flex-1 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="rounded-full border border-red-200 bg-red-50 px-2 py-2 text-xs font-medium text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={options.length <= MIN_OPTIONS}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400">Between {MIN_OPTIONS} and {MAX_OPTIONS} options. Duplicate and empty responses are removed.</p>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={allowMultiple}
          onChange={(event) => setAllowMultiple(event.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <span className="text-sm text-gray-600">Allow voters to select multiple answers</span>
      </label>

      {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-2xl bg-primary-600 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary-500/40 transition hover:bg-primary-700"
      >
        Launch poll
      </button>
    </form>
  );
}
