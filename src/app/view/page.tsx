import MemoList from "@/components/memo/MemoList";
import MemoView from "@/components/memo/MemoView";

export default function ViewPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams?.id;
  return (
    <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
      {/* 左：一覧 */}
      {/* @ts-expect-error Client Component */}
      <MemoList />
      {/* 右：詳細 */}
      {/* @ts-expect-error Client Component */}
      <MemoView id={id} mode="detail" />
    </main>
  );
}