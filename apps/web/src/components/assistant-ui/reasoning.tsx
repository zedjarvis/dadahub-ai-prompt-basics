"use client";

import type { FC, PropsWithChildren } from "react";

import { MessagePartPrimitive } from "@assistant-ui/react";

export const ReasoningGroup: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export const Reasoning: FC = () => {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
      <MessagePartPrimitive.Text />
    </div>
  );
};
