import CardHome from "./components/CardHome";
function Home() {
    return (
        <div className="flex h-[100vh] w-full items-center justify-center">
            <CardHome
                title="El Switcher"
                description="Esta es la pagina home"
            />
        </div> 
    );
}

export default Home;
