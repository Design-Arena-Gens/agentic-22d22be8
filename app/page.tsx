"use client";

import { useCallback } from "react";
import Header from "@/app/components/Header";
import PollForm, { type PollFormData } from "@/app/components/PollForm";
import PollList from "@/app/components/PollList";
import PollResults from "@/app/components/PollResults";
import { usePolls } from "@/lib/pollStorage";
import { addPoll, createPoll, removePoll, replacePoll, resetPollVotes, voteOnPoll } from "@/lib/pollUtils";
import type { Poll } from "@/types/poll";

export default function HomePage() {
  const { polls, setPolls, activePoll, activePollId, setActivePollId, hydrated } = usePolls();

  const handleCreate = useCallback(
    (payload: PollFormData) => {
      const newPoll = createPoll(payload);
      setPolls((current) => addPoll(current, newPoll));
      setActivePollId(newPoll.id);
    },
    [setPolls, setActivePollId]
  );

  const handleVote = useCallback(
    (optionIds: string[]) => {
      if (!activePoll) return;
      const updated = voteOnPoll(activePoll, optionIds);
      setPolls((current) => replacePoll(current, updated));
    },
    [activePoll, setPolls]
  );

  const handleDelete = useCallback(
    (pollId: string) => {
      setPolls((current) => removePoll(current, pollId));
      if (activePollId === pollId) {
        const nextPoll = polls.find((poll) => poll.id !== pollId) ?? null;
        setActivePollId(nextPoll?.id ?? null);
      }
    },
    [activePollId, polls, setPolls, setActivePollId]
  );

  const handleReset = useCallback(() => {
    if (!activePoll) return;
    const reset = resetPollVotes(activePoll);
    setPolls((current) => replacePoll(current, reset));
  }, [activePoll, setPolls]);

  const skeleton = !hydrated;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary-50 via-white to-slate-100">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10 lg:flex-row">
        <section className="w-full space-y-6 lg:w-1/3">
          <PollForm onCreate={handleCreate} />
          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-primary-100/60 ring-1 ring-primary-100">
            <p className="text-sm font-semibold text-gray-800">Your polls</p>
            <p className="mt-1 text-xs text-gray-500">Switch between any poll to keep voting or manage results.</p>
            <div className="mt-4 max-h-[280px] overflow-y-auto pr-1">
              {skeleton ? (
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="h-20 animate-pulse rounded-2xl bg-gray-100/80" />
                  ))}
                </div>
              ) : (
                <PollList
                  polls={polls}
                  activePollId={activePollId}
                  onSelect={(pollId) => setActivePollId(pollId)}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
        </section>
        <section className="w-full lg:w-2/3">
          {skeleton ? (
            <div className="h-full animate-pulse rounded-3xl bg-white/70" />
          ) : (
            <PollResults
              poll={activePoll ?? (polls[0] as Poll | undefined) ?? null}
              onVote={handleVote}
              onReset={handleReset}
            />
          )}
        </section>
      </main>
      <footer className="border-t border-gray-200 bg-white/70 py-6 text-center text-xs text-gray-500">
        Crafted with ❤️ for teams, classrooms, and communities who love quick decisions.
      </footer>
    </div>
  );
}
