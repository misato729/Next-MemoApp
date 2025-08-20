// app/edit/page.tsx
import MemoList from "@/components/memo/MemoList";
import MemoView from "@/components/memo/MemoView";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function EditPage({ searchParams }: PageProps) {
  const raw = searchParams?.id;
  const id = Array.isArray(raw) ? raw[0] : raw; // ← string | undefined に絞る

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
      {/* 左：一覧 */}
      {/* @ts-expect-error Client Component */}
      <MemoList />
      {/* 右：編集 */}
      {/* @ts-expect-error Client Component */}
      <MemoView id={id} mode="edit" />
    </main>
  );
}
