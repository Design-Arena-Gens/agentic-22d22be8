"use client";

import { useMemo, useState } from "react";
import type { Poll } from "@/types/poll";

const gradientPalette = [
  "bg-gradient-to-r from-primary-500 via-primary-400 to-sky-400",
  "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400",
  "bg-gradient-to-r from-amber-500 via-orange-400 to-red-400",
  "bg-gradient-to-r from-violet-500 via-purple-400 to-indigo-400",
  "bg-gradient-to-r from-fuchsia-500 via-pink-400 to-rose-400",
  "bg-gradient-to-r from-slate-500 via-slate-400 to-gray-400"
];

type PollResultsProps = {
  poll: Poll | null;
  onVote: (optionIds: string[]) => void;
  onReset: () => void;
};

export default function PollResults({ poll, onVote, onReset }: PollResultsProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const totalVotes = poll ? poll.options.reduce((total, option) => total + option.votes, 0) : 0;

  const percentages = useMemo(() => {
    if (!poll || totalVotes === 0) {
      return new Map<string, number>();
    }
    return new Map(
      poll.options.map((option) => [option.id, Math.round((option.votes / totalVotes) * 1000) / 10])
    );
  }, [poll, totalVotes]);

  if (!poll) {
    return (
      <section className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white/50 p-10 text-center">
        <p className="text-lg font-semibold text-gray-700">Create a poll to see live results.</p>
        <p className="mt-2 max-w-md text-sm text-gray-500">
          Add a question and options on the left. Your most recent poll will appear here along with an interactive voting experience.
        </p>
      </section>
    );
  }

  const toggleOption = (optionId: string) => {
    setSelected((current) => {
      if (poll.allowMultiple) {
        return current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId];
      }
      return current.includes(optionId) ? [] : [optionId];
    });
  };

  const handleVote = () => {
    if (selected.length === 0) return;
    onVote(selected);
    setSelected([]);
  };

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-primary-200/60 ring-1 ring-primary-100">
      <div className="border-b border-gray-100 bg-gradient-to-r from-white via-primary-50 to-white px-8 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-500">
          {poll.allowMultiple ? "Multi-choice poll" : "Single-choice poll"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-gray-900">{poll.question}</h2>
        {poll.description && <p className="mt-2 max-w-3xl text-sm text-gray-500">{poll.description}</p>}
        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
          <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
            {totalVotes} total vote{totalVotes === 1 ? "" : "s"}
          </span>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500 transition hover:bg-gray-100"
          >
            Reset votes
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-8 py-6">
        <div className="space-y-4">
          {poll.options.map((option, index) => {
            const percentage = percentages.get(option.id) ?? 0;
            const selectedStyle = selected.includes(option.id) ? "ring-2 ring-primary-400" : "ring-1 ring-transparent";
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className={`group relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/60 px-5 py-4 text-left transition hover:border-primary-200 hover:bg-primary-50/80 ${selectedStyle}`}
              >
                <span className="flex items-center justify-between gap-4">
                  <span>
                    <span className="text-base font-semibold text-gray-800">{option.label}</span>
                    <span className="ml-2 rounded-full bg-white/70 px-2 py-1 text-xs font-semibold text-primary-600">
                      {option.votes} vote{option.votes === 1 ? "" : "s"}
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-primary-600">{percentage.toFixed(1)}%</span>
                </span>
                <span className="mt-3 block h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <span
                    className={`${gradientPalette[index % gradientPalette.length]} block h-full rounded-full transition-all duration-500`}
                    style={{ width: `${totalVotes === 0 ? 10 : Math.max(10, percentage)}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col justify-end gap-3 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={handleVote}
            disabled={selected.length === 0}
            className="rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary-500/40 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            Submit vote{poll.allowMultiple ? "s" : ""}
          </button>
          <p className="text-xs text-gray-400">
            Votes are stored locally in this browser. Share your screen or export visuals to run live sessions anywhere.
          </p>
        </div>
      </div>
    </section>
  );
}
