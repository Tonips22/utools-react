import AnimatedBg from '@components/AnimatedBg.jsx';

export default function Hero() {
    

  return (
    <section className="min-h-[75vh] flex-col items-center justify-center relative z-10" id="hero">
      <AnimatedBg />

      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl text-white font-bold cursor-default">Utools</h1>

        <label className='hoverable flex flex-row items-center gap-4 bg-dark rounded-full px-8 py-4 w-[350px] cursor-text md:w-[500px] lg:w-[600px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>

          <input
            type="text"
            value=""
            autoFocus
            className="hoverable searchBar text-white bg-transparent rounded-full border-none outline-none w-full px-1"
          />
        </label>

        <ul className="hoverable flex flex-row items-center justify-center flex-wrap gap-2 w-[350px] md:w-[500px] lg:w-[600px]">
        </ul>
      </div>
    </section>
  );
}
