// Four pages don't need a router library: pathname + pushState is enough.
import { useSyncExternalStore, type MouseEvent } from "react";

const subscribe = (l: () => void) => {
  window.addEventListener("popstate", l);
  return () => window.removeEventListener("popstate", l);
};

export const usePath = () => useSyncExternalStore(subscribe, () => window.location.pathname);

export function navigate(to: string) {
  window.history.pushState(null, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export const linkTo = (to: string) => ({
  href: to,
  onClick: (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    navigate(to);
  },
});
