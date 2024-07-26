import * as React from "react";
import { makeStyles } from "@griffel/react";
import { Text } from "@/index";

const useStyles = makeStyles({
  container: {
    gap: "16px",
    display: "flex",
    flexDirection: "column",
  },
});

export const Weight = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  );
};
