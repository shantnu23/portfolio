/**
 * Templates re-mount on every navigation, so this gives each route a short
 * CSS fade-in without any client-side JavaScript. Disabled for reduced motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="motion-safe:animate-page-in">{children}</div>;
}
