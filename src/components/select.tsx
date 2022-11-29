import { twMerge } from "tailwind-merge";

const defaultClassName =
  "text-base font-normal text-white w-full bg-transparent border-white border-spacing-1 border-b focus:text-gray-700 focus:bg-white";

export default function (
  props: React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & { label: String }
) {
  const { className, label, ...restOfProps } = props;

  return (
    <>
      <label className="mb-2 text-sm font-medium">{props.label}</label>
      <select
        className={twMerge(defaultClassName, className)}
        {...restOfProps}
      ></select>
    </>
  );
}
