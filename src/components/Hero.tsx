import Image from "next/image";

const Hero = () => {
    return (
        <main className="relative my-2 max-w-7xl mx-auto flex flex-col items-center px-4 border-1 border-black/25 rounded-[40px] py-8">
            <div className="relative mb-8">
                <div className="bg-[#FFF3E6] rounded-full px-4 py-2 flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#FDA942] mr-2"></div>
                    <p className="text-sm font-product">Hey, I am Developer focused on not screwing up!</p>
                </div>
            </div>
            <div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium text-center flex flex-wrap justify-center items-center">
                <span className="bg-gradient-to-r py-4 from-[#000000] via-[#FF7A01] to-[#727889] text-transparent bg-clip-text">Gursimran</span>
                <Image 
                    src="/me.jpg" 
                    alt="Gursimran Singh's Image" 
                    width={82} 
                    height={82} 
                    className="rounded-[30px] mx-2 aspect-square object-cover"
                    />
                <span className="bg-gradient-to-r py-4 from-[#0767FB] to-[#000000] text-transparent bg-clip-text">Singh.</span>
            </h1>

            <p className="text-center mt-6 max-w-2xl text-gray-600 font-productsans">
                I am a developer who loves to create modern web experiences. I enjoy working with Next.js, Tailwind CSS, and other modern technologies to build beautiful and functional applications.
            </p>
                </div>
        </main>
    );
};

export default Hero;