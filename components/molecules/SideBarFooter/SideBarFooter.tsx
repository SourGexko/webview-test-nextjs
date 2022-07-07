import classNames from "classnames/bind";
import React from "react";
import styles from "./SideBarFooter.module.scss";

const cx = classNames.bind(styles);

interface SideBarFooterProps {
  children: React.ReactNode;
}

export function SideBarFooter({ children }: SideBarFooterProps) {
  return <div className={cx("container")}>{children}</div>;
}
