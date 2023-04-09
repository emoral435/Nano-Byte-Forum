import SearchChat from "../SearchChat/SearchChat"
import ShowChat from "../ShowChat/ShowChat"

const HomeContent = () => {
  return (
    <main className='basis-full w-full md:flex md:flex-row md:justify-center md:items-center p-12 md:p-0'>
          <div className='bg-[#607d8a] text-white basis-1/3 shadow-xl rounded-l-md md:h-[80vh]'>
              <SearchChat />
          </div>
          <div className='bg-white basis-[50%] shadow-xl rounded-r-md md:h-[80vh] h-[80%]'>
              <ShowChat />
          </div>
    </main>
  )
}

export default HomeContent