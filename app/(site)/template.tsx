/**
 * Route transition — templates remount on every navigation, so the CSS
 * entrance replays per page without delaying hydration or first paint.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
