import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useReducedMotion: () => true,
    AnimatePresence: ({ children }: any) => children,
    motion: new Proxy(
      {},
      {
        get: (_, tagName: string) => {
          return (props: any) => {
            const cleanProps = { ...props };
            delete cleanProps.whileInView;
            delete cleanProps.viewport;
            delete cleanProps.whileTap;
            delete cleanProps.transition;
            delete cleanProps.drag;
            delete cleanProps.dragControls;
            delete cleanProps.dragListener;
            delete cleanProps.dragMomentum;
            delete cleanProps.dragElastic;
            delete cleanProps.initial;
            delete cleanProps.animate;
            delete cleanProps.exit;
            delete cleanProps.variants;
            return require("react").createElement(tagName, cleanProps);
          };
        },
      }
    ),
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  notFound: () => {},
}));

vi.mock("@/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return require("react").createElement("img", {
      ...props,
      src: props.src,
      alt: props.alt,
    });
  },
}));

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(callback: any, options?: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
} as any;
