import MemoEdit from "@/components/memo/MemoEdit";

export default function EditPage({ searchParams }: { searchParams: { id?: string } }) {
  const id = searchParams?.id;
  return (
    <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
      {/** @ts-expect-error Client Component */}
      <(await import("@/components/memo/MemoList")).default />
      <section className="rounded-2xl border p-4 bg-accent/10">
        {/** @ts-expect-error Client Component */}
        <MemoEdit id={id} />
      </section>
    </main>
  );
}