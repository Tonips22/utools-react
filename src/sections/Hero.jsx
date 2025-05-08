import AnimatedBg from '@components/AnimatedBg.jsx';
import Label from '@components/Label.jsx';

export default function Hero({ searchTerm, setSearchTerm, categories, setCategories }) {
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para actualizar el array categories al cambiar un checkbox
  const handleCheckboxChange = (labelText, checked) => {
    if (checked) {
      // Si el usuario marca el checkbox, añadimos ese texto
      setCategories((prev) => {
        if (prev.includes(labelText)) return prev; // ya estaba
        return [...prev, labelText];
      });
    } else {
      // Si el usuario desmarcó, eliminamos ese texto de categories
      setCategories((prev) => prev.filter((cat) => cat !== labelText));
    }
  };

  return (
    <section className="min-h-[75vh] flex-col items-center justify-center relative z-10" id="hero">
      <AnimatedBg />

      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl text-white font-bold cursor-default">Utools</h1>

        <label className='hoverable flex flex-row items-center gap-4 bg-dark rounded-full px-8 py-4 w-[350px] cursor-text md:w-[500px] lg:w-[600px]'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>

          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            autoFocus
            className="hoverable searchBar text-white bg-transparent rounded-full border-none outline-none w-full px-1"
          />
        </label>

        <ul className="hoverable flex flex-row items-center justify-center flex-wrap gap-2 w-[350px] md:w-[500px] lg:w-[600px]">
          {/* Por cada Label, indicamos si está checkeado 
              comprobando si su texto está en categories */}
          <Label
            hasCheckBox
            text="Colors"
            isChecked={categories.includes('Colors')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Components"
            isChecked={categories.includes('Components')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Icons"
            isChecked={categories.includes('Icons')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Typography"
            isChecked={categories.includes('Typography')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Design"
            isChecked={categories.includes('Design')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Mockups"
            isChecked={categories.includes('Mockups')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Deployment"
            isChecked={categories.includes('Deployment')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Images"
            isChecked={categories.includes('Images')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Videos"
            isChecked={categories.includes('Videos')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Hosting"
            isChecked={categories.includes('Hosting')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="API"
            isChecked={categories.includes('API')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Optimization"
            isChecked={categories.includes('Optimization')}
            onChange={handleCheckboxChange}
          />
          <Label
            hasCheckBox
            text="Animations"
            isChecked={categories.includes('Animations')}
            onChange={handleCheckboxChange}
          />
        </ul>
      </div>
    </section>
  );
}
