export default function Footer() {
  return (
    <footer className="mt-16 pt-4.5 border-t-[3px] border-rule flex justify-between flex-wrap gap-2.5 font-mono text-[11px] text-ink-soft uppercase tracking-wide">
      <span>D. Chen, 2026</span>
      <span>
        <a
          href="https://github.com/chen-domi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink no-underline border-b border-ink"
        >
          github
        </a>
        {"  "}
        <a href="#" className="text-ink no-underline border-b border-ink">
          email
        </a>
      </span>
    </footer>
  );
}
