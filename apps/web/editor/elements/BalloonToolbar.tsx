import {
  BalloonToolbarProps,
  ToolbarBase,
  useFloatingToolbar,
} from "@udecode/plate";
import { withPlateEventProvider } from "@udecode/plate-core";
import { PortalBody } from "@udecode/plate-styled-components";

export const BalloonToolbar = withPlateEventProvider(
  (props: BalloonToolbarProps) => {
    const { children, portalElement, floatingOptions } = props;

    const { floating, style, open } = useFloatingToolbar({
      floatingOptions,
    });

    if (!open) return null;

    return (
      <PortalBody element={portalElement}>
        <ToolbarBase
          style={{
            ...style,
            padding: "0.25rem",
            gap: "0.25rem",
          }}
          className="bg-white shadow rounded-lg border flex items-center"
          ref={floating}
        >
          {children}
        </ToolbarBase>
      </PortalBody>
    );
  }
);
