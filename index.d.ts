import { MathfieldElement } from "mathlive";
interface MathFieldProps extends React.HTMLAttributes<MathfieldElement> {
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<MathFieldProps, MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}

// declare module "react" {
//   interface IntrinsicElements {
//     "math-field"?: React.DetailedHTMLProps<
//       HTMLAttributes<MathfieldElement>,
//       MathfieldElement
//     >;
//   }
// }
