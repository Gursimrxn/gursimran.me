import BentoBadge from "./ui/BentoBadge"
import { Code } from "./icons/Code"

const TechStack = () => {
    return (
        <div className="relative h-full w-full rounded-[40px] border-1 border-black/10 bg-gradient-to-t from-[#ffffff] to-[#fcfcfc] p-6 overflow-hidden flex flex-col">
            <BentoBadge icon={Code} text={"TECH STACK"} className="mx-auto"/>
        </div>
    )

}
export default TechStack;