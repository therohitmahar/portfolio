"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";

const NavigationMotion = createContext<
  ((href: string, slug: string) => void) | null
>(null);

export function ProjectMotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const pending = useRef<{ slug: string; finish: () => void } | null>(null);
  const active = useRef<ViewTransition | null>(null);

  useLayoutEffect(() => {
    const navigation = pending.current;
    if (!navigation) return;
    const cover = document.querySelector<HTMLElement>(
      `[data-project-cover="${navigation.slug}"]`,
    );
    if (cover) cover.style.viewTransitionName = "project-cover";
    // Cached thumbnails normally decode immediately; never hold navigation for an image.
    const images = cover ? Array.from(cover.querySelectorAll("img")) : [];
    void Promise.all(
      images.map((image) => image.decode().catch(() => {})),
    ).then(navigation.finish);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);

  function navigate(href: string, slug: string) {
    active.current?.skipTransition();
    pending.current?.finish();
    const cover = document.querySelector<HTMLElement>(
      `[data-project-cover="${slug}"]`,
    );
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !cover
    ) {
      router.push(href);
      return;
    }
    cover.style.viewTransitionName = "project-cover";
    let timeout: ReturnType<typeof setTimeout>;
    const transition = document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          const finish = () => {
            clearTimeout(timeout);
            resolve();
          };
          pending.current = { slug, finish };
          timeout = setTimeout(finish, 1800);
          router.push(href);
        }),
    );
    active.current = transition;
    void transition.ready.catch(() => {});
    void transition.finished
      .catch(() => {})
      .then(() => {
        if (active.current !== transition) return;
        pending.current = null;
        active.current = null;
        document
          .querySelectorAll<HTMLElement>("[data-project-cover]")
          .forEach((element) => {
            element.style.removeProperty("view-transition-name");
          });
      });
  }

  return (
    <NavigationMotion.Provider value={navigate}>
      {children}
    </NavigationMotion.Provider>
  );
}

export function ProjectLink({
  slug,
  ...props
}: ComponentProps<typeof Link> & { slug: string }) {
  const navigate = useContext(NavigationMotion);
  const keyboard = useRef(false);
  return (
    <Link
      {...props}
      onClick={(event) => {
        keyboard.current = event.detail === 0;
        props.onClick?.(event);
      }}
      onNavigate={(event) => {
        if (keyboard.current || !navigate || typeof props.href !== "string")
          return;
        event.preventDefault();
        navigate(props.href, slug);
      }}
    />
  );
}
