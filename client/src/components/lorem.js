import { useContext } from "react";
import { MobileContext } from "../context/mobile_context";


export default function Lorem() {
  const { defaultFontSize } = useContext(MobileContext);
  return (
    <div class={`f-si-${defaultFontSize}`}>
      Lorem ipsum dolor sit amet, ius te quem quas debitis. Vel in melius
      laboramus, ea purto admodum deleniti duo, latine aliquid eam et. In reque
      alterum definitionem sit, te everti dignissim sententiae sit. Dico doming
      disputando pri ei, ei assueverit eloquentiam eos, cu his postea putent
      nusquam. No ancillae offendit platonem eam. Vidisse eloquentiam ius at,
      qui cu quis dictas pericula, cu vivendo petentium vel. No cum nibh
      probatus theophrastus, est augue saperet ad. Forensibus consectetuer at
      nam, iisque posidonium usu et. Pri ut utinam prompta, vulputate adipiscing
      eam ne, libris oportere repudiandae an nec. Eos iudico mediocritatem eu,
      ius esse feugiat deserunt te. Mei an quod idque voluptatum. Quo dicit
      facilis interpretaris ea. Lorem soluta ne sit, mundi nullam deseruisse pri
      te, eu eam graece nostrum. Duo ut error intellegam temporibus, eam
      splendide quaerendum ne. Sit in possit melius, eu per splendide scribentur
      signiferumque. Duo illum nonumy consectetuer et, dico quot atqui eos ad.
      Aperiam delicata adipiscing sea in. Ei usu quidam verterem. Has audire
      dolorem te, vix habemus noluisse signiferumque te.
    </div>
  );
}
