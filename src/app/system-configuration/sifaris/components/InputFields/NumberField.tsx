"use client";
import React from "react";
import { Field } from "../types";
import { InputLabel } from "@/components/InputLabel";
import { InputField } from "@/components/InputField";
import { cn } from "@/lib/utils/classnames";
import { useFormContext } from "react-hook-form";

interface NumberFieldProps {
  fieldAttribute: Field;
  name: string;
  className?: string;
  labelStyle?: string;
  inputStyle?: string;
}

const NumberField = ({ fieldAttribute, name, className }: NumberFieldProps) => {
  const { register } = useFormContext();
  const { id, label, type, ...rest } = fieldAttribute;
  return (
    <>
      <div className={cn("", className)}>
        <InputLabel htmlFor={id} labelName={label} />
        <InputField type="number" {...rest} {...register(name)} id={id} />
      </div>
    </>
  );
};

export default NumberField;
