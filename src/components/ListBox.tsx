import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import ArrowDown from "@/../public/assets/logo/DownArrow.svg";
import { IoMdCheckmark } from "react-icons/io";
import { cn } from "@/lib/utils/classnames";

interface ListBoxProps<
  TData,
  RValue = string,
  RLabel = string,
  RId = string | number
> {
  options: Array<TData>;
  className?: string;
  dropDownContainerStyle?: string;
  dropDownItemStyle?: string;
  valueExtractor: (item: TData) => RValue;
  idExtractor?: (item: TData) => RId;
  labelExtractor: (item: TData) => RLabel;
  value: RValue;
  name?: string;
  onBlur?: () => void;
  onValueChange?: (value: RValue) => void;
  labelExtractorByValue: (value: RValue, options: Array<TData>) => RLabel;
  onChange: (...event: any[]) => void;
}

function ListBox<
  TData,
  RValue = string,
  RLabel = string,
  RId = string | number
>({
  options,
  valueExtractor,
  labelExtractor,
  value,
  name,
  dropDownItemStyle,
  dropDownContainerStyle,
  className,
  idExtractor,
  onChange,
  labelExtractorByValue,
}: ListBoxProps<TData, RValue, RLabel, RId>) {
  if (options.length === 0) {
    throw new Error("Empty Options. Option list cannot be empty");
  }

  return (
    <div className="w-full relative">
      <Listbox name={name} value={value} onChange={onChange}>
        <Listbox.Button
          className={cn(
            "h-10 w-full flex items-center px-2 py-1 justify-between bg-transparent rounded-md  border  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer bg-white pl-3 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white/75 focus-visible:ring-offset-orange-300 sm:text-sm",
            className
          )}
        >
          <span className="">
            {labelExtractorByValue(value, options) as string}
          </span>
          {/* DROPDOWN INDICATOR  */}
          <span className="pointer-events-none flex items-center pr-2">
            <Image
              className="h-2 w-3 text-[#002147]"
              aria-hidden="true"
              src={ArrowDown}
              alt={"dorp down indicator icon"}
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={cn(
              "absolute mb-12 z-[1000] scrollbar-thin scrollbar-thumb-[#ACB1C6] scrollbar-track-white scroll-smooth mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
              dropDownContainerStyle
            )}
          >
            {options.map((option, idx) => (
              <Listbox.Option
                className={({ active }) =>
                  `${cn(
                    "relative cursor-default select-none py-2 pl-10 pr-4",
                    dropDownItemStyle
                  )} ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                key={
                  idExtractor === undefined
                    ? idx
                    : (idExtractor(option) as string)
                }
                value={valueExtractor(option)}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {labelExtractor(option) as string}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <IoMdCheckmark className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
                {/* {labelExtractor(option) as string} */}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

export default ListBox;
