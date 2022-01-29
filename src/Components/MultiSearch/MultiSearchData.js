export const searchOptions = [
  { value: "csharp", label: "C#" },
  { value: "react", label: "React" },
  { value: "javascript", label: "Javascript" },
  { value: "c++", label: "C++" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
];

export const style = {
  control: (base) => ({
    ...base,
    border: "1px solid grey",
    borderRadius: "25px",
  }),
};
export default style && searchOptions;
