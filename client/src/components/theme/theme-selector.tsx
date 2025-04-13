import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/common/button";
import { Palette } from "lucide-react";
import { themes } from "@/config/themes";
import type { ThemeType } from "@/config/themes";

const themeNames: Record<ThemeType, string> = {
  'sand': '🏖️ Sand',
  'deep-forest': '🌲 Deep Forest',
  'charcoal': '🌑 Charcoal',
  'white-clouds': '☁️ White Clouds'
};

export function ThemeSelector() {
  const { theme, setTheme, colors } = useTheme();

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-[#152C2D] active:bg-[#101E22] transition-colors"
        style={{
          color: colors.text.primary
        }}
      >
        <Palette className="h-5 w-5" />
      </Button>
      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
           style={{
             backgroundColor: colors.background.secondary,
             border: `1px solid ${colors.border.default}`
           }}>
        {(Object.keys(themes) as ThemeType[]).map((themeName) => (
          <button
            key={themeName}
            className="w-full px-4 py-2 text-left text-sm transition-colors duration-200"
            style={{
              backgroundColor: theme === themeName ? colors.background.active : 'transparent',
              color: theme === themeName ? colors.text.primary : colors.text.secondary
            }}
            onClick={() => setTheme(themeName)}
          >
            {themeNames[themeName]}
          </button>
        ))}
      </div>
    </div>
  );
}
