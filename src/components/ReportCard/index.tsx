import React from "react";
import { makeStyles } from "./style";
import Icon from "./icon";
interface Props {
  label?: string;
  description?: string;
}
const ReportCard = ({ label, description }: Props) => {
  const styles = makeStyles();

  return (
    <div style={styles.container}>
      {label && <span>{label}</span>}
      <div style={styles.reportContainer}>
        <div style={styles.iconContainer}>
          <Icon />
        </div>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ReportCard;
