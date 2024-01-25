import * as React from "react";

import { cn } from "@/lib/utils/classnames";

export interface InputProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  labelName: React.ReactNode;
}

const InputLabel = React.forwardRef<HTMLLabelElement, InputProps>(
  ({ className, labelName, ...props }, ref) => {
    return (
      <label
        className={cn(
          "text-[#ACB1C6] capitalize font-normal text-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        {labelName}
      </label>
    );
  }
);

InputLabel.displayName = "LabelField";

export { InputLabel };
