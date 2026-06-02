export default function ErrorState({ message = "Algo ha ido mal. Inténtalo de nuevo." }) {
  return <p className="py-16 text-center text-sm text-neutral-500">{message}</p>;
}