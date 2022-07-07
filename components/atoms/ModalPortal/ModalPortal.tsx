import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

function ModalPortal({ children }: ModalPortalProps) {
  const ref = useRef<HTMLElement | null>();
  const [mount, setMount] = useState(false);
  useEffect(() => {
    ref.current = document.getElementById("modal");
    setMount(true);
  }, []);
  return mount ? reactDom.createPortal(children, ref.current as Element) : null;
}

export default ModalPortal;
