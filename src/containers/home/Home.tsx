import CrearPartida from "./components/CrearPartida";
import { Link } from "react-router-dom";
import gameLogo from "../../components/assets/logo-juego.jpg";
import Partidas from "./components/Partidas";

function Home() {
    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="m-4 flex justify-center text-3xl font-extrabold">
                    Bienvenido a "El Switcher"
                </h1>
            </div>
            <hr className="border-black" />
            <Partidas />
            <CrearPartida />
            <hr className="border-black" />
            <div className="flex flex-col items-center justify-center">
                <p className="text-center font-bold">REGLAS:</p>
                <Link to="https://drive.google.com/file/d/1NUPVsKq70hufAcZ-rBdqREBWOaAFtopx/view">
                    <img
                        src={gameLogo}
                        className="transition-filter m-5 h-60 p-6 duration-300 hover:drop-shadow-[0_0_3em_rgb(128,77,0,0.8)] hover:filter"
                        alt="Game logo"
                    />
                </Link>
            </div>
            <hr className="border-black" />
        </div>
    );
}

export default Home;

// Ocurre este error : Uncaught (in promise) Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
// 1. You might have mismatching versions of React and the renderer (such as React DOM)
// 2. You might be breaking the Rules of Hooks
// 3. You might have more than one copy of React in the same app
// See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
//     at Object.throwInvalidHookError (chunk-6BKLQ22S.js?v=94edab1c:11501:17)
//     at Object.useContext (chunk-DRWLMN53.js?v=94edab1c:1062:29)
//     at useNavigate (react-router-dom.js?v=94edab1c:3858:13)
//     at handleSubmit (CrearPartida.tsx?t=1727047289566:63:22)
//     at HTMLUnknownElement.callCallback2 (chunk-6BKLQ22S.js?v=94edab1c:3674:22)
//     at Object.invokeGuardedCallbackDev (chunk-6BKLQ22S.js?v=94edab1c:3699:24)
//     at invokeGuardedCallback (chunk-6BKLQ22S.js?v=94edab1c:3733:39)
//     at invokeGuardedCallbackAndCatchFirstError (chunk-6BKLQ22S.js?v=94edab1c:3736:33)
//     at executeDispatch (chunk-6BKLQ22S.js?v=94edab1c:7014:11)
//     at processDispatchQueueItemsInOrder (chunk-6BKLQ22S.js?v=94edab1c:7034:15). Con la siguiente funcion:
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!checkFields()) return;
    
//         let partidaId: number | undefined;
//         let unirsepartida = false;
//         const navigate = useNavigate()
    
//         try {
//             const res = await crearPartida({
//                 nombre_partida: partidaname,
//                 nombre_creador: username,
//             });
    
//             showToastSuccess(Partida '${res.nombre_partida}' creada con éxito.);
//             partidaId = res.id;
//             unirsepartida = true;
    
//             setTimeout(() => {
//                 handleDialogClose();
//                 resetFields();
//             }, 1000);
//         } catch (error) {
//             console.error("Error creando partida:", error);
//             showToastError("Error: no se pudo crear la partida.");
//             return; // Sale de la función si hay error
//         }
    
//         if (unirsepartida && partidaId !== undefined) {
//             try {
//                 const res = await UnirsePartida(partidaId, username);
//                 showToastSuccess(Bienvenido "${res.nombre}" a la partida "${partidaname}.");
//                 setTimeout(() => {
//                     navigate(/partidas/${partidaId}/sala-espera);
//                     // console.log("Unirsepartida")
//                     // console.log(unirsepartida)
//                     // console.log("PartidaID")
//                     // console.log(partidaId)
//                 }, 2000);
//             } catch (error) {
//                 console.error("Error al unirse a la partida:", error);
//                 showToastError("Error al unirse a la partida.");
//             }
//         }
//     };