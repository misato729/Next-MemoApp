import MemoDetail from "@/components/memo/MemoDetail";

import MemoList from "@/components/memo/MemoList";

export default function ViewPage({ searchParams }: { searchParams: { id?: string } }) {
    const id = searchParams?.id;
    return (
        <main className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
            {/* 左側にリスト（任意。省略したければ削除） */}
            <MemoList />
            <section className="rounded-2xl border p-4 bg-accent/10">
                {/* 表示 */}
                <MemoDetail id={id} />
            </section>
        </main>
    );
}