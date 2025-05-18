import BentoBadge from "./ui/BentoBadge"
import { Medal } from "./icons/Medal"

const FeaturedSection = () => {
    return (
        <div className="relative h-full w-full rounded-[40px] border-1 border-black/10 bg-gradient-to-t from-[#FCFCFC] to-[#FFFEFA] p-6 overflow-hidden flex flex-col">
            <BentoBadge icon={Medal} text={"FEATURED SECTION"} className="mx-auto"/>
        </div>
    )

}
export default FeaturedSection;