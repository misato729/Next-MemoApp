import MemoList from "@/components/memo/MemoList";
import MemoDetail from "@/components/memo/MemoDetail";

export default function Home() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
      <MemoList />
      <section className="rounded-2xl border p-4 bg-accent/10">
        <MemoDetail />
      </section>
    </main>
  );
}