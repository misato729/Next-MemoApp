"use client";

import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="prose max-w-none dark:prose-invert overflow-x-auto">
      <ReactMarkdown
        className="prose"
        remarkPlugins={[remarkGfm]}
        components={{
          table: (props) => (
            <table className="w-full border-collapse my-4" {...props} />
          ),
          thead: (props) => <thead className="bg-muted" {...props} />,
          th: (props) => <th className="border px-3 py-1 text-left" {...props} />,
          td: (props) => <td className="border px-3 py-1 align-top" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
