import { RetroGrid } from "@/components/ui/retro-grid"
import { TextAnimate } from "@/components/ui/text-animate"
import {ComicText} from "@/components/ui/comic-text"
export default function LandingPage() {
    return (
        <div className="relative w-full overflow-hidden">
            
            <TextAnimate 
                className="items-center justify-center"
                animation="fadeIn" 
                by="line" 
                as="p">
                {`Fade in by line as paragraph\n\nFade in by line as paragraph\n\nFade in by line as paragraph`}
            </TextAnimate>

            <ComicText>Silahkan pilih mau tema apa</ComicText>
        </div>
    )
}