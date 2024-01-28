"use client";

import React, { useEffect } from "react";
import {
    Controller,
    useFieldArray,
    useForm,
    useFormContext,

} from "react-hook-form";

// INTERNAL API OR RESOURCE IMPORT
import type { FieldSchema, CreateSifarisForm, Field, EditModalData } from "../types";
import ListBox from "@/components/ListBox";
import { Modal } from "@/components/Modal";
import { InputField } from "@/components/InputField";
import { InputLabel } from "@/components/InputLabel";

// interfaces type
export interface InputFieldFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    groupIndex: number;
    inputRowIndex: number;
    editModalData: EditModalData | null;
}

// random id generator
export function generateUniqueId(): string {
    // Generate a timestamp (number of milliseconds since the Unix epoch)
    const timestamp = new Date().getTime();

    // Generate a random number between 0 and 9999
    const random = Math.floor(Math.random() * 10000);

    // Combine timestamp and random number to create a unique ID
    const uniqueId = `${timestamp}${random}`;

    return uniqueId;
}


// COMPONENT
const InputFieldFormModal = ({
    isOpen,
    onClose,
    groupIndex,
    inputRowIndex,
    editModalData
}: InputFieldFormModalProps) => {

    // form create form context accessor
    const sifarisForm = useFormContext<CreateSifarisForm>();
    console.log('mot: ', editModalData)

    const inputFields = useFieldArray({
        control: sifarisForm.control,
        name: `inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields`
    });

    // react-hook form configuaration for the input field form
    const { register, reset, control, setValue, handleSubmit } = useForm<Field>({
        defaultValues: {
            type: "text",
            name: "",
            label: "",
            id: generateUniqueId(),
            required:
                false,
            placeholder: ""
        },
    });

    if (editModalData !== null) {
        setValue("id", editModalData.inputFieldEditData.id)
        setValue("name", editModalData.inputFieldEditData.name)
        setValue("label", editModalData.inputFieldEditData.label)
        setValue("placeholder", editModalData.inputFieldEditData.placeholder)
        setValue("required", editModalData.inputFieldEditData.required)
        setValue("type", editModalData.inputFieldEditData.type)

    } else {
        console.log('we are creating not editing')

    }


    useEffect(() => {
        if (editModalData === null) {
            setValue(`id`, generateUniqueId())
        }
    }, [generateUniqueId])

    // data to show in type dropdown list
    const InputTypeList: FieldSchema["type"][] = [
        "text",
        "date",
        "email",
        "number",
    ];

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div

                    className="flex flex-col gap-5 py-6"
                >
                    <div className="form-container flex flex-col gap-3">
                        {/* TYPE OF THE INPUT FIELD */}
                        <div>
                            <InputLabel htmlFor="" labelName={"Input Type"} />
                            <Controller
                                control={control}
                                render={({ field: { value, onChange } }) => {
                                    return (
                                        <>
                                            <ListBox<FieldSchema["type"]>
                                                options={InputTypeList}
                                                className="h-11 shadow-none"
                                                valueExtractor={(item) => item}
                                                labelExtractor={(item) => item}
                                                value={value}
                                                labelExtractorByValue={(value, options) =>
                                                    options.find((option) => option === value) ||
                                                    "select a type"
                                                }
                                                onChange={onChange}
                                            />
                                        </>
                                    );
                                }}
                                name={"type"}
                            />
                        </div>
                        {/* NAME OF THE INPUT FIELD */}
                        <div>
                            <InputLabel labelName={"Input Name"} />
                            <InputField {...register("name", { required: true })} />
                        </div>

                        {/* LABEL OF THE INPUT FIELD  */}
                        <div>
                            <InputLabel labelName={"Input Label"} />
                            <InputField {...register("label", { required: true })} />
                        </div>

                        {/* VALIDATION: IS INPUT FIELD REQURIED */}
                        <div className="flex flex-col">
                            <InputLabel labelName={"required"} />
                            <input
                                className="w-4 h-4 "
                                type="checkbox"
                                {...register("required")}
                            />
                        </div>
                        {/* PLACEHOLDER OF THE INPUT  */}
                        <div>
                            <InputLabel labelName={"Input placeholder"} />
                            <InputField {...register("placeholder")} />
                        </div>
                    </div>
                    {/* BUTTON CONTAINER  */}
                    <div className="flex items-center gap-32 justify-center ">
                        {/* CANCEL BUTTON  */}
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                reset();
                            }}
                            className=" rounded-md px-3 py-2 text-[#002147] text-[14px] font-medium border border-[#002147]"
                        >
                            Cancel
                        </button>

                        {/* SUBMIT BUTTON  */}
                        <button type="button" onClick={handleSubmit((data) => {

                            if (editModalData === null) {
                                inputFields.append({
                                    // @ts-expect-error
                                    id: data.id,
                                    label: data.label,
                                    name: data.name,
                                    required: data.required,
                                    placeholder: data.placeholder as string,
                                    type: data.type,
                                });
                            } else {
                                console.log("about to edit data", editModalData);
                                sifarisForm.setValue(`inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields.${editModalData.inputFieldIndex}.id`, editModalData.inputFieldEditData.id)
                                sifarisForm.setValue(`inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields.${editModalData.inputFieldIndex}.name`, data.name)
                                sifarisForm.setValue(`inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields.${editModalData.inputFieldIndex}.label`, data.label)
                                sifarisForm.setValue(`inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields.${editModalData.inputFieldIndex}.placeholder`, data.placeholder)
                                sifarisForm.setValue(`inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields.${editModalData.inputFieldIndex}.required`, data.required)
                                sifarisForm.setValue(`inputGroups.${groupIndex}.inputRows.${inputRowIndex}.inputfields.${editModalData.inputFieldIndex}.type`, data.type)

                            }
                            reset();
                            onClose();
                        })} className="rounded-md px-3 py-2 bg-[#002147] text-[14px] font-medium border border-[#002147] text-white ">
                            {editModalData === null ? "Save Field" : "Update Field"}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default InputFieldFormModal;
