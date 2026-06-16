"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";
import {useEffect} from "react";
import {distance} from "@/lib/math";

export default function Page() {

  useEffect(() => {
    if (typeof window === "undefined") return;

    const controller = new AbortController();

    window.addEventListener(
        "mousemove",
        (event) => {
          if (!titleRef.current) return;

          const { innerWidth, innerHeight } = window;
          const centerX = innerWidth / 2;
          const centerY = innerHeight / 2;

          const maxDist = distance(0, 0, centerX, centerY);
          let dist = distance(centerX, centerY, event.clientX, event.clientY);

          dist /= maxDist;

          titleRef.current.style.setProperty("--distance", dist.toString());
        },
        {
          signal: controller.signal,
        }
    );

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div
      className={cn(
        "w-screen h-screen text-white flex items-center justify-center",
        s.grid
      )}
    >
      <h1
        className={cn(
          "uppercase text-[10vh] leading-none relative",
          s["title"]
        )}
      >
        Variables
      </h1>
    </div>
  );
}
