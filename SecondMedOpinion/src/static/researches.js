export const CnsMRI = [
  {
    label: "თავის ტვინი",
    value: "თავის ტვინი",
  },
  {
    label: "ხერხემლის კისრის მონაკვეთის მრტ კვლევა",
    value: "ხერხემლის კისრის მონაკვეთის მრტ კვლევა",
  },
];

export const headCT = [
  {
    label: "ზედა და ქვედა ყბის CT",
    value: "ზედა და ქვედა ყბის CT",
  },
  {
    label: "საეთქლის ძვლების CT სკანირება (შუა და შიდა ყური)",
    value: "საეთქლის ძვლების CT სკანირება (შუა და შიდა ყური)",
  },
];

export const jawCT = [
  {
    label: "ზედა და ქვედა ყბის CT",
    value: "ზედა და ქვედა ყბის CT",
  },
  {
    label: "დროებითი ყბის სახსრების CT",
    value: "დროებითი ყბის სახსრების CT",
  },
];

export const CTResearches = [
  {
    label: "თავის CT",
    value: "თავის CT",
    innerData: headCT,
  },
  {
    label: "ყბის CT",
    value: "ყბის CT",
    innerData: jawCT,
  },
];

export const MRIResearches = [
  {
    label: "ცენტრალური ნერვული სისტემა",
    value: "ცენტრალური ნერვული სისტემა",
    innerData: CnsMRI,
  },
  {
    label: "სახსრების მაგნიტო რეზონანსული კვლევა",
    value: "სახსრების მაგნიტო რეზონანსული კვლევა",
    innerData: [],
  },
];
