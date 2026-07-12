import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";

export interface ConfigContextType{
    mode: Mode;
    fontSize: FontSize;
    emergency: string;

    setMode: Dispatch<SetStateAction<Mode>>;
    setFontSize: Dispatch<SetStateAction<FontSize>>;
    setEmergency: Dispatch<SetStateAction<string>>;
}

export enum Mode {
    Simple,
    Advanced,
}

export enum FontSize {
    Small = 1,
    Medium = 2,
    Big = 3,
    Huge = 4,
}


const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Mode>(Mode.Simple)
    const [fontSize, setFontSize] = useState<FontSize>(FontSize.Small)
    const [emergency, setEmergency] = useState<string>("")

    const value = useMemo(
    () => ({
      mode,
      setMode,
      fontSize,
      setFontSize,
      emergency,
      setEmergency,
    }),
    [mode, fontSize, emergency]
  );




  return (
    <ConfigContext.Provider
    value={value}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  return context;
};



