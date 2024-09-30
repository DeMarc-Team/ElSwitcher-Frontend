import Casilla from "./Casilla";
export default function HeaderHome() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center">
            <h1 className="title-text text-nowrap text-8xl">EL SWITCHER</h1>
            <div>
                <Casilla variant="blue" classname="left-16 top-20 -rotate-6 " />
                <Casilla variant="red" classname=" right-16 top-20 rotate-6 " />
                <Casilla
                    variant="yellow"
                    classname=" left-80 top-14 rotate-12 "
                />
                <Casilla
                    variant="blue"
                    classname=" right-80 top-14 -rotate-12 max-[900px]:hidden"
                />
                <Casilla
                    variant="green"
                    classname=" left-56 top-48 -rotate-12 max-[1250px]:hidden"
                />
                <Casilla
                    variant="yellow"
                    classname=" right-56 top-48 rotate-12 max-[1250px]:hidden "
                />
                <Casilla
                    variant="yellow"
                    classname=" left-16 top-80 rotate-[16deg] max-[1100px]:mt-20"
                />
                <Casilla
                    variant="green"
                    classname=" right-16 top-80 rotate-[16deg ] max-[1100px]:mt-20"
                />
                <Casilla
                    variant="red"
                    classname=" left-80 top-96 rotate-[8deg] max-[1100px]:mt-20 max-[900px]:hidden"
                />
                <Casilla
                    variant="blue"
                    classname=" right-80 top-96 rotate-[8deg] max-[1100px]:mt-20"
                />
                <Casilla
                    variant="yellow"
                    classname="left-[36rem] top-[26rem] -rotate-[8deg] max-[1150px]:hidden "
                />
                <Casilla
                    variant="blue"
                    classname="left-[34rem] top-24 -rotate-[2deg] max-[1150px]:hidden "
                />
                <Casilla
                    variant="green"
                    classname="left-[50rem] top-[26rem] rotate-[8deg] max-[1350px]:hidden"
                />
                <Casilla
                    variant="green"
                    classname="left-[46rem] top-10 -rotate-[8deg] max-[1350px]:hidden"
                />
                <Casilla
                    variant="red"
                    classname="left-[56rem] top-28 rotate-[8deg] max-[1460px]:hidden"
                />
            </div>
        </div>
    );
}
