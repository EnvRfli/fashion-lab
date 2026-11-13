import { SearchIcon } from "./Icons";

export function SearchBar({
  id,
  value,
  onChange,
  onSubmit,
  placeholder = "Cari nama klien...",
  buttonLabel = "Cari",
  compact = false,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  buttonLabel?: string;
  compact?: boolean;
}) {
  return (
    <form
      className={`search-bar ${compact ? "search-bar-compact" : ""}`}
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label className="sr-only" htmlFor={id}>
        Cari klien
      </label>
      <SearchIcon className="search-bar-icon" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button type="submit" className="btn btn-primary search-bar-button">
        {buttonLabel}
      </button>
    </form>
  );
}
