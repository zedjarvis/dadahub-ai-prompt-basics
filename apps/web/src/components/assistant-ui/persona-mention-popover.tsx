"use client";

import { ChevronLeftIcon, UserRoundIcon } from "lucide-react";

import { ComposerPrimitive } from "@assistant-ui/react";

import { Button } from "@/components/ui/button";
import { personas } from "@/lib/personas";

const personaItems = Object.entries(personas).map(([id, persona]) => ({
  id,
  type: "persona",
  label: persona.label,
}));

const personaMentionAdapter = {
  categories() {
    return [{ id: "personas", label: "Personas" }];
  },
  categoryItems(categoryId: string) {
    return categoryId === "personas" ? personaItems : [];
  },
  search(query: string) {
    const lower = query.toLowerCase();
    return personaItems.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        item.id.toLowerCase().includes(lower),
    );
  },
};

export function PersonaMentionPopover({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComposerPrimitive.Unstable_MentionRoot adapter={personaMentionAdapter}>
      {children}
    </ComposerPrimitive.Unstable_MentionRoot>
  );
}

export function PersonaMentionMenu() {
  return (
    <ComposerPrimitive.Unstable_MentionPopover className="mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-lg">
      <ComposerPrimitive.Unstable_MentionCategories className="flex flex-col p-2">
        {(categories) =>
          categories.map((category) => (
            <ComposerPrimitive.Unstable_MentionCategoryItem
              key={category.id}
              categoryId={category.id}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
            >
              <UserRoundIcon className="size-4 text-[#F0570F]" />
              <div className="flex flex-col">
                <span className="font-medium">{category.label}</span>
                <span className="text-xs text-muted-foreground">
                  Tag a persona for this message
                </span>
              </div>
            </ComposerPrimitive.Unstable_MentionCategoryItem>
          ))
        }
      </ComposerPrimitive.Unstable_MentionCategories>

      <ComposerPrimitive.Unstable_MentionItems className="flex flex-col p-2">
        {(items) => (
          <>
            <ComposerPrimitive.Unstable_MentionBack
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-1 justify-start gap-2 rounded-xl"
                />
              }
            >
              <ChevronLeftIcon className="size-4" />
              Back
            </ComposerPrimitive.Unstable_MentionBack>
            {items.map((item, index) => (
              <ComposerPrimitive.Unstable_MentionItem
                key={item.id}
                item={item}
                index={index}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
              >
                <UserRoundIcon className="size-4 text-[#F0570F]" />
                <div className="flex flex-col">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    Use this persona for the next reply
                  </span>
                </div>
              </ComposerPrimitive.Unstable_MentionItem>
            ))}
          </>
        )}
      </ComposerPrimitive.Unstable_MentionItems>
    </ComposerPrimitive.Unstable_MentionPopover>
  );
}
