import { MathfieldElement } from "mathlive";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
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
