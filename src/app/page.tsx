import { BootSequence } from "@/components/desktop/boot-sequence";
import { DesktopShell } from "@/components/desktop/desktop-shell";

export default function Home() {
  return (
    <BootSequence>
      <DesktopShell />
    </BootSequence>
  );
}
