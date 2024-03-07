import { Box } from '@mui/system';
import tinycolor from 'tinycolor2';
import { Variant } from '../types/products';

function VariantBox({ variant }: { variant: Variant }) {
  function isValidColor(color: string) {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  }

  function adjustColor(color: string, saturation: number) {
    const hsv = tinycolor(color).toHsv();
    hsv.s = saturation;
    return tinycolor(hsv).toHexString();
  }

  const backgroundColor = isValidColor(variant.color)
    ? adjustColor(variant.color, 72) : '#000';

  return (
    <Box
      className="h-8 w-8 rounded-full mx-1 shadow-xl "
      style={{ backgroundColor }}
      key={variant.id}
    >
      <div className="border-[8px] h-full w-full rounded-full border-[#ffffff]" />
    </Box>
  );
}

export default VariantBox;
