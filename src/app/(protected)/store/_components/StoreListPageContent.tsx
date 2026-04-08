"use client";

import Link from "next/link";
import { useState } from "react";
import { FiGrid, FiHome, FiList, FiSearch } from "react-icons/fi";
import StoreCard from "./StoreCard";
import { storeMockData } from "./storeMockData";
import { ROUTES } from "@/config/routes";

export default function StoreListPageContent() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <section className="bg-(--color-bg)">
      <div className="mx-auto px-4 py-6 md:px-5 lg:px-7 xl:px-8 xl:py-8">
        <div className="mb-7 flex items-center gap-3 text-sm text-(--color-text-muted)">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-(--color-dark) transition hover:text-(--color-primary)"
          >
            <FiHome className="text-[17px]" />
            <span>Home</span>
          </Link>
          <span>&bull;</span>
          <span>Seller Grid</span>
        </div>

        <h1 className="mb-6 text-center text-[30px] font-semibold tracking-[-0.03em] text-(--color-dark) max-sm:text-[24px]">
          Store List
        </h1>

        <div className="mb-9 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => setView("list")}
              className={`flex h-[46px] w-[46px] items-center justify-center rounded-full transition ${
                view === "list"
                  ? "bg-(--color-primary) text-white shadow-[0_10px_24px_rgba(44,95,138,0.16)]"
                  : "border border-(--color-border) text-(--color-text-muted) hover:border-(--color-primary) hover:text-(--color-primary)"
              }`}
            >
              <FiList className="text-[20px]" />
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`flex h-[46px] w-[46px] items-center justify-center rounded-full transition ${
                view === "grid"
                  ? "bg-(--color-primary) text-white shadow-[0_10px_24px_rgba(44,95,138,0.16)]"
                  : "border border-(--color-border) text-(--color-text-muted) hover:border-(--color-primary) hover:text-(--color-primary)"
              }`}
            >
              <FiGrid className="text-[18px]" />
            </button>
            <p className="text-[17px] text-(--color-dark)">Showing 1-4 of 4 results</p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row xl:w-[560px] xl:justify-end">
            <div className="relative flex-1">
              <FiSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[24px] text-(--color-text-muted)" />
              <input
                type="text"
                placeholder="Search Company"
                className="h-[56px] w-full rounded-full border border-(--color-border) bg-(--color-bg) pl-14 pr-5 text-sm text-(--color-dark) outline-none transition focus:border-(--color-primary) placeholder:text-(--color-text-muted)"
              />
            </div>

            <select className="h-[56px] min-w-[140px] rounded-full border border-(--color-border) bg-(--color-bg) px-5 text-sm text-(--color-text-muted) outline-none transition focus:border-(--color-primary)">
              <option>Sorting</option>
              <option>Name</option>
              <option>Newest</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        <div className={view === "grid" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-4" : "space-y-5"}>
          {storeMockData.map((store) => (
            <StoreCard key={store.id} store={store} view={view} />
          ))}
        </div>
      </div>
    </section>
  );
}
