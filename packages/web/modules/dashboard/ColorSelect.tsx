import { RadioGroup } from "@headlessui/react";
import { useFormikContext } from "formik";
import React from "react";
import { journalColors } from "../../../common/dist/src";

interface ColorSelectProps {}

export const ColorSelect: React.FC<ColorSelectProps> = ({}) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <RadioGroup
      value={values.color}
      onChange={(color: string) => setFieldValue("color", color)}
    >
      <RadioGroup.Label className="sr-only">Colors</RadioGroup.Label>
      <div className="flex items-center space-x-2.5 pb-2">
        {journalColors.map((journalColor) => (
          <RadioGroup.Option
            key={journalColor}
            value={journalColor}
            as="button"
            type="button"
            className="focus:outline-none"
          >
            {({ checked }) => (
              <div
                className={`w-6 h-6 rounded-full ${
                  checked ? "ring ring-offset-2" : ""
                }`}
                style={{ backgroundColor: journalColor }}
              />
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
