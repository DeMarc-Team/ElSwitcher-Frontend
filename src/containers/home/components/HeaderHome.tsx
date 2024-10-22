import Casilla from "./Casilla";

type VariantType = "blue" | "red" | "yellow" | "green";

const casillasData: { variant: VariantType; classname: string }[] = [
    // Primera fila
    { variant: "blue", classname: "left-[4vw] top-[11vh] -rotate-6" },
    { variant: "yellow", classname: "left-[21vw] top-[8vh] rotate-12" },
    {
        variant: "blue",
        classname:
            "left-[35.5vw] top-[13.5vh] -rotate-[2deg] max-[1150px]:hidden",
    },
    {
        variant: "green",
        classname: "left-[48vw] top-[5.5vh] -rotate-[8deg] max-[1350px]:hidden",
    },
    {
        variant: "red",
        classname: "left-[58.5vw] top-[16vh] rotate-[8deg] max-[1460px]:hidden",
    },
    {
        variant: "blue",
        classname: "right-[21vw] top-[8vh] -rotate-12 max-[900px]:hidden",
    },
    { variant: "red", classname: "right-[4vw] top-[11vh] rotate-6" },

    // Segunda fila
    {
        variant: "green",
        classname: "left-[14.5vw] top-[27vh] -rotate-12 max-[1250px]:hidden",
    },
    {
        variant: "yellow",
        classname: "right-[14.5vw] top-[27vh] rotate-12 max-[1250px]:hidden",
    },

    // Tercera fila
    {
        variant: "yellow",
        classname: "left-[4vw] top-[45vh] rotate-[16deg] max-[1100px]:mt-20",
    },
    {
        variant: "red",
        classname:
            "left-[21vw] top-[55vh] rotate-[8deg] max-[1100px]:mt-20 max-[900px]:hidden",
    },
    {
        variant: "yellow",
        classname:
            "left-[37.5vw] top-[59vh] -rotate-[8deg] max-[1150px]:hidden",
    },
    {
        variant: "green",
        classname:
            "right-[37.5vw] top-[59vh] rotate-[8deg] max-[1350px]:hidden",
    },
    {
        variant: "blue",
        classname: "right-[21vw] top-[55vh] rotate-[8deg] max-[1100px]:mt-20",
    },
    {
        variant: "green",
        classname: "right-[4vw] top-[45vh] rotate-[16deg] max-[1100px]:mt-20",
    },
];

export default function HeaderHome() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center">
            <h1 className="title-text text-nowrap text-8xl">EL SWITCHER</h1>
            <div>
                {casillasData.map((casilla, index) => (
                    <Casilla
                        key={index + "-casilla"}
                        variant={casilla.variant}
                        classname={casilla.classname}
                    />
                ))}
            </div>
        </div>
    );
}
