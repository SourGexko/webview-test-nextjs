import { Viewer } from "@toast-ui/react-editor";

export interface ManualViewerProps {}

export function ManualViewer({}: ManualViewerProps) {
  return (
    <div>
      <Viewer initialValue="# markdown" />
    </div>
  );
}
