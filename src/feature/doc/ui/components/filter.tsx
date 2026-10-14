"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const chipClasses =
    "inline-flex shrink-0 items-center rounded-lg px-3 py-1 text-base font-medium tracking-wider capitalize transition-colors";

const filterOptions = ["Light", "Dark", "System"];

interface FilterProps {
    category?: string;
    categoryHref?: string;
    filters: string[];
    activeFilter?: string;
}

export default function Filter({
    category = "",
    categoryHref = "/ui",
    filters,
    activeFilter,
}: FilterProps) {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Light");

    return (
        <div className="mb-10 flex flex-row items-center justify-between gap-8 font-archivo">
            {/* Tag filter */}
            {filters.length > 0 && (
                <nav
                    aria-label={`${category} filters`}
                    className="mx-auto w-full overflow-hidden"
                >
                    <div className="scroll-fade-x scrollbar-none overflow-x-auto">
                        <div className="flex w-max gap-2.5">
                            <Link
                                href={categoryHref}
                                className={cn(
                                    chipClasses,
                                    !activeFilter
                                        ? "bg-foreground text-background"
                                        : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background",
                                )}
                                scroll={false}
                            >
                                All
                            </Link>

                            {filters.map((filter) => {
                                const isActive = activeFilter === filter;

                                return (
                                    <Link
                                        key={filter}
                                        href={`${categoryHref}?${category}=${filter}`}
                                        className={cn(
                                            chipClasses,
                                            isActive
                                                ? "bg-foreground text-background"
                                                : "bg-muted text-muted-foreground hover:bg-foreground hover:text-background",
                                        )}
                                        scroll={false}
                                    >
                                        {filter}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            )}

            {/* Popover filter */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        aria-label="Open filter options"
                        className="inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 text-base font-medium tracking-wider bg-muted justify-between w-[100px] font-archivo"
                    >
                        Filter
                        {open ? (
                            <>
                                <X className=
                                    "size-4 transition-transform duration-200"
                                />
                            </>
                        ) : (
                            <>
                                <SlidersHorizontal className=
                                    "size-4 transition-transform duration-200"
                                />
                            </>
                        )}

                    </button>
                </PopoverTrigger>

                <PopoverContent
                    align="end"
                    sideOffset={6}
                    className="w-40 p-1"
                >
                    <div className="flex flex-col gap-0.5">
                        {filterOptions.map((option) => {
                            const isSelected = selectedOption === option;

                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        setSelectedOption(option);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                                        isSelected &&
                                        "bg-accent text-accent-foreground",
                                    )}
                                >
                                    {option}

                                    {isSelected && (
                                        <Check className="size-4" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}