import { Editor } from "@toast-ui/react-editor";
import { BASE_URL } from "../../../core/constants";
import { ManualsService } from "../../../data/api";
import { EditorPlugin, PluginContext } from "@toast-ui/editor/types/editor";
import { PluginInfo } from "@toast-ui/editor/types/plugin";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { ForwardedRef, LegacyRef, RefObject, useEffect, useRef } from "react";
import { Button } from "../../atoms";

export interface ManualEditorProps {
  forwardedRef: ForwardedRef<Editor>;
}

function manualLinkPlugin(context: PluginContext, options?: any): PluginInfo {
  return {
    toolbarItems: [
      {
        groupIndex: 1,
        itemIndex: 2,
        item: {
          name: "link",
          text: "#",
          tooltip: "test",
        },
      },
    ],
  };
}

export function ManualEditor({ forwardedRef }: ManualEditorProps) {
  return (
    <div
      style={{
        width: "calc(100% + 2px)",
        height: "calc(100% + 2px)",
        marginLeft: -2,
        marginTop: -2,
      }}
    >
      <Editor
        ref={forwardedRef}
        height="100%"
        plugins={[
          [colorSyntax, {}],
          [manualLinkPlugin, {}],
        ]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const imageUrl = await ManualsService.uploadManualImage({
              formData: {
                manualImageFile: blob,
              },
            });
            callback(`${BASE_URL}/${imageUrl}`);
          },
        }}
      />
    </div>
  );
}
