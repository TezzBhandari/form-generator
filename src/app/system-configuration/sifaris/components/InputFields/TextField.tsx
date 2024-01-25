"use client";
import React from "react";
import { Field } from "../types";
import { InputLabel } from "@/components/InputLabel";
import { InputField } from "@/components/InputField";
import { cn } from "@/lib/utils/classnames";
import { useFormContext } from "react-hook-form";

interface TextFieldProps {
  fieldAttribute: Field;
  name: string;
  className?: string;
  labelStyle?: string;
  inputStyle?: string;
}

const TextField = ({ fieldAttribute, name, className }: TextFieldProps) => {
  const { register } = useFormContext();
  const { id, label, type, required, ...rest } = fieldAttribute;
  return (
    <>
      <div className={cn("w-full", className)}>
        <InputLabel htmlFor={id} labelName={label} />
        {required ? <span className="text-red-500">{"*"}</span> : null}
        <InputField
          className="bg-white"
          type="text"
          {...rest}
          {...register(name, { required: required })}
          id={id}
        />
      </div>
    </>
  );
};

export default TextField;
