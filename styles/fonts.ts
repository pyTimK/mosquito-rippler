import { Inter, Julius_Sans_One } from 'next/font/google'


const juliusSansOneFont = Julius_Sans_One({weight: "400", subsets: ['latin']});
export const jsoFont = juliusSansOneFont.className;
const interFontClass = Inter({subsets: ['latin']});
export const interFont = interFontClass.className;
