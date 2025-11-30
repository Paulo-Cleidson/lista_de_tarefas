"use client";

import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <Spinner
        classNames={{ label: "text-foreground mt-4" }}
        label="gradient"
        variant="gradient"
      />
    </div>
  );
}
