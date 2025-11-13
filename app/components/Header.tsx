export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="font-semibold text-primary-600">PulseVote</p>
          <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Create polls that people love voting in.</h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-500">
            Build single or multi-choice polls, share them instantly, and watch the results evolve in beautifully animated charts. Everything runs directly in
the browser using secure local storage.
          </p>
        </div>
        <div className="hidden shrink-0 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-primary-700 shadow-sm sm:block">
          <p className="text-xs font-medium uppercase tracking-wide">Today&apos;s tally</p>
          <p className="mt-1 text-2xl font-semibold">Your poll, your rules</p>
        </div>
      </div>
    </header>
  );
}
