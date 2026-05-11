import Header from "../components/Header"
import SearchForm from "../components/SearchForm"



const HomeViewe = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 px-5 py-10 min-h-screen  bg-home home-xl  bg-no-repeat bg-top-right  ">
        <div className="max-w-5xl mx-auto my-4 md:my-10 "> 
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
          <h1 className="text-6xl font-black">
            Todas tus <span className="text-cyan-500">Redes Sociales </span>
            en un enlace 
            </h1>
            <p className="text-slate-800 text-xl">Únete a mas de 200 mil developers compartiendo sus redes sociales, comparte tu perfil de tikTok,  Facebook, Instagram, Github, y más. </p>
            <SearchForm />
            </div>
        </div>

      </main>
    </>
  )
}

export default HomeViewe