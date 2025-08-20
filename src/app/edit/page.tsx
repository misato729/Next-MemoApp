import MemoList from "@/components/memo/MemoList";
import MemoView from "@/components/memo/MemoView";

export default async function EditPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const raw = sp?.id;
  const id = Array.isArray(raw) ? raw[0] : raw;

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
      {/* 左：一覧 */}
      <MemoList />
      {/* 右：編集 */}
      <MemoView id={id} mode="edit" />
    </main>
  );
}
