"use client";

import { formatDistanceToNow } from "date-fns";
import type { Poll } from "@/types/poll";

type PollListProps = {
  polls: Poll[];
  activePollId: string | null;
  onSelect: (pollId: string) => void;
  onDelete: (pollId: string) => void;
};

export default function PollList({ polls, activePollId, onSelect, onDelete }: PollListProps) {
  if (polls.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-white/50 p-8 text-center">
        <div className="rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">No polls yet</div>
        <p className="mt-3 text-sm text-gray-500">Create your first poll to start collecting votes.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {polls.map((poll) => {
        const isActive = poll.id === activePollId;
        return (
          <li
            key={poll.id}
            className={`group relative overflow-hidden rounded-2xl border transition ${isActive ? "border-primary-200 bg-primary-50/70 shadow-inner" : "border-transparent bg-white shadow"}`}
          >
            <button
              type="button"
              onClick={() => onSelect(poll.id)}
              className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">{poll.question}</p>
                <p className="mt-1 text-xs text-gray-500">
                  Last updated {formatDistanceToNow(new Date(poll.updatedAt), { addSuffix: true })}
                </p>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {poll.options.reduce((total, option) => total + option.votes, 0)} votes
              </span>
            </button>
            <div className="flex items-center justify-end gap-2 bg-white px-4 pb-4">
              <button
                type="button"
                onClick={() => onDelete(poll.id)}
                className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-500 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
