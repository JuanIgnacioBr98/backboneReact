import React, { useState } from "react";
import { makeStyles } from "./style";
import ReportDetail from "../ReportCard";
import Icon from "./icon";
interface Props {
  label?: string;
  description?: string;
  onClick: () => void;
}
const ReportDownload = ({ label, description, onClick }: Props) => {
  const styles = makeStyles();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.container,
        opacity: isHovered ? 0.7 : 1,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReportDetail label={label} description={description} />
      <Icon />
    </div>
  );
};

export default ReportDownload;
