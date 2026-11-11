import { MinusIcon, PlusIcon } from "./Icons";

export function QuantityStepper({
  value,
  min = 1,
  max = 10,
  onChange,
  label,
}: {
  value: number;
  min?: number;
  max?: number;
  onChange: (next: number) => void;
  label: string;
}) {
  return (
    <div className="quantity" role="group" aria-label={label}>
      <button
        type="button"
        className="quantity-button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity for ${label}`}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span className="quantity-value" aria-live="polite" aria-atomic="true">
        {value}
      </span>
      <button
        type="button"
        className="quantity-button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity for ${label}`}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
