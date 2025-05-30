// src/app/loading.tsx

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 dark:bg-black/80">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-purple-500 animate-spin flex items-center justify-center">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        </div>
        <span className="text-lg font-semibold text-foreground font-display animate-pulse">Loading...</span>
      </div>
    </div>
  );
}
