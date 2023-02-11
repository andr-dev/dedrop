import { Radio, RadioGroup } from "@mui/material";

interface IProps {
  pageIndex: number;
}

export function OnboardingProgress(props: IProps) {
  return (
    <RadioGroup row>
      {[0, 1, 2].map((x) => progressCircle(x, props.pageIndex))}
    </RadioGroup>
  );
}

function progressCircle(index: number, pageIndex: number) {
  return (
    <div
      style={{
        borderRadius: "100%",
        width: 16,
        height: 16,
        margin: "0 8px",
        backgroundColor: index === pageIndex ? "white" : "grey",
      }}
    />
  );
}
