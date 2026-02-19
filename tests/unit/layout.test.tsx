import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";

afterEach(() => {
  cleanup();
});

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a>,
  usePathname: () => "/",
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
}));

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe("Header", () => {
  it("renders brand name", () => {
    renderWithIntl(<Header />);
    expect(screen.getByText("NadoTools")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithIntl(<Header />);
    expect(screen.getByText("Convert")).toBeInTheDocument();
    expect(screen.getByText("PDF")).toBeInTheDocument();
    expect(screen.getByText("Image")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders brand attribution", () => {
    renderWithIntl(<Footer />);
    expect(screen.getByText("by NadoTools")).toBeInTheDocument();
  });

  it("renders footer sections", () => {
    renderWithIntl(<Footer />);
    expect(screen.getByText("NadoTools")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });
});
