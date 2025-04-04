import VoteChart from "@/components/VoteChart";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="py-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">SALTED</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          캘린더 서비스를 사용해본 경험이 있으신가요?
        </p>
      </header>

      <main className="flex flex-col items-center justify-center gap-8">
        <VoteChart />
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        앱티브 1팀 솔티드!
      </footer>
    </div>
  );
}
