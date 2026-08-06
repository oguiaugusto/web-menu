export function OrderCardSkeleton() {
  return (
    <div className="w-full rounded-xl border border-neutral-200 bg-white p-4 text-left">
      <div className="animate-pulse">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="h-4 w-24 rounded bg-neutral-200" />
            <div className="mt-2 h-4 w-40 rounded bg-neutral-200" />
          </div>
          <div className="h-6 w-20 rounded-full bg-neutral-200" />
        </div>
        <div className="mt-4 border-t border-neutral-100 pt-3">
          <div className="h-4 w-5/6 rounded bg-neutral-200" />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded-full bg-neutral-200" />
              <div className="h-3 w-24 rounded bg-neutral-200" />
            </div>
            <div className="h-4 w-4 rounded bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
