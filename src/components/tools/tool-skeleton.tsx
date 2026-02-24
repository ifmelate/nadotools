export function ToolSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Privacy badge placeholder */}
      <div className="flex justify-center">
        <div className="h-7 w-52 rounded-full bg-muted" />
      </div>
      {/* Dropzone placeholder */}
      <div className="flex flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed border-muted-foreground/10 p-12 sm:p-16">
        <div className="h-14 w-14 rounded-2xl bg-muted" />
        <div className="space-y-2 text-center">
          <div className="mx-auto h-4 w-48 rounded bg-muted" />
          <div className="mx-auto h-3 w-32 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
