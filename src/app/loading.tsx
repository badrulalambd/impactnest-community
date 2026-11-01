export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        {/* You can use a spinner icon, a skeleton UI, or simple text */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <p className="text-sm font-medium text-gray-500">Loading dashboard...</p>
      </div>
      </div>
    );
}