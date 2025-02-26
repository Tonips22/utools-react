import AnimatedBg from '@components/AnimatedBg.jsx';
import Label from '@components/Label.jsx';

export default function Hero({ searchTerm, setSearchTerm }) {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="min-h-[75vh] flex-col items-center justify-center relative z-10" id='hero'>
      <AnimatedBg />

      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center">
        <h1 className='hoverable text-6xl text-white font-bold cursor-default'>Utools</h1>

        <p className='hoverable cursor-default italic'>The best websites-tools reference in all web</p>

        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          autoFocus
          className='hoverable searchBar text-white bg-dark py-4 px-8 rounded-full border-none outline-none w-[350px] md:w-[500px] lg:w-[600px]'
        />

        <ul className="flex flex-row items-center justify-center flex-wrap gap-2 mt-4 w-[350px] md:w-[500px] lg:w-[600px]">
          <Label hasCheckBox={true} text='Colors'/>
          <Label hasCheckBox={true} text='Components'/>
          <Label hasCheckBox={true} text='Icons'/>
          <Label hasCheckBox={true} text='Typography'/>
          <Label hasCheckBox={true} text='Design'/>
          <Label hasCheckBox={true} text='Mockups'/>
          <Label hasCheckBox={true} text='Deployment'/>
          <Label hasCheckBox={true} text='Images'/>
          <Label hasCheckBox={true} text='Videos'/>
          <Label hasCheckBox={true} text='Hosting'/>
          <Label hasCheckBox={true} text='API'/>
          <Label hasCheckBox={true} text='Optimization'/>
        </ul>
      </div>
    </section>
  );
}
