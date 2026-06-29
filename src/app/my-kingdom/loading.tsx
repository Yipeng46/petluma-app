import "@/styles/my-kingdom.css";

export default function MyKingdomLoading() {
  return (
    <div className="registry-home min-h-screen bg-kingdom-cream font-sans text-kingdom-ink antialiased">
      <div className="my-kingdom-loading" aria-live="polite" aria-busy="true">
        <h1 className="my-kingdom-loading__title">Entering Your Kingdom...</h1>
        <p className="my-kingdom-loading__text">Loading your companions...</p>
      </div>
    </div>
  );
}
