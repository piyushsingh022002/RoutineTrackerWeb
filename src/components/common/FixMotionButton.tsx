// // src/components/common/FixMotionButton.tsx
// import { motion } from 'framer-motion';
// import type { ComponentPropsWithoutRef } from 'react';

// export const FixMotionButton = motion(
//   (props: ComponentPropsWithoutRef<'button'>) => <button {...props} />
// );
// FixMotionButton.tsx
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

const MotionButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // we render a normal button but allow motion props
  return <button ref={ref} {...props} />;
});

export const FixMotionButton = motion(MotionButton);
