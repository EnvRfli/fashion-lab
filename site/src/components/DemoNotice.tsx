import { AlertIcon } from "./Icons";

export function DemoNotice() {
  return (
    <div className="bg-blush text-[var(--color-semantic-warning)]">
      <div className="shell flex items-start gap-2 py-2.5 text-[0.78rem] leading-snug sm:items-center sm:text-[0.82rem]">
        <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" />
        <p>
          <span className="font-semibold">Demonstration storefront.</span>{" "}
          Products, prices, and checkout are illustrative. No orders are placed.
        </p>
      </div>
    </div>
  );
}
