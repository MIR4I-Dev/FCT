import { Header } from './Header.jsx'
import { BlackOverlay } from './BlackOverlay.jsx'
import { CardSection } from './CardSection.jsx'
import { Footer } from './Footer.jsx'

export function Home() {

    return (
        <>
            <BlackOverlay />
            <main className="relative z-10 w-full h-full max-h-full flex flex-col items-center overflow-x-hidden">
                <Header />
                <CardSection />
                <Footer />
            </main>
        </>
    )
}

