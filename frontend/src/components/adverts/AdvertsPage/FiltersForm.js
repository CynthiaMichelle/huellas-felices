import T from 'prop-types';
import { Link } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import SelectTags from '../SelectTags';
import { RadioGroup} from '../../common';
import { advert } from '../propTypes';
import { perroFilter, sexoFilter } from './filters';
import './FiltersForm.css'

function FiltersForm({ initialFilters, defaultFilters, onFilter, prices }) {
  const {
    formValue: filters,
    setFormValue,
    handleChange,
    handleSubmit,
  } = useForm(initialFilters);

  const handleResetClick = () => {
    setFormValue(defaultFilters);
    onFilter(defaultFilters);
  };
  const {raza, sexo, perro, size} = filters;
  return (
    <>
    <form className='busqueda' onSubmit={handleSubmit(onFilter)}>
      <div className='buscador'>
        <h2>Búsqueda:</h2>
        {<input className='BuscadorRaza' name="raza" value={raza} placeholder="Nombre de la raza" onChange={handleChange} />}
        <div className='opciones'>
          <legend>¿Qué tipo de animal buscas?</legend>
          <div className='BuscadorOpciones'>
            {<RadioGroup
              options={Object.values(perroFilter)}
              name="perro"
              value={perro}
              onChange={handleChange} />}
          </div>

          <legend>¿Qué género buscas?</legend>
          <div className='BuscadorOpciones'>
            {<RadioGroup
              options={Object.values(sexoFilter)}
              name="sexo"
              value={sexo}
              onChange={handleChange} />}
          </div>
          <legend>¿Qué tamaño buscas?</legend>
          <div className='BuscadorOpciones'>
            {<SelectTags multiple name="size" value={size} onChange={handleChange} />}
          </div>
        </div>
        <button type="submit">Buscar</button>
        <button onClick={handleResetClick}>Mostrar Todos</button>
      </div>
    </form>
    <Link to="/adverts/new">
        New advert
    </Link>
    </>
  );
}

const filtersProp = T.shape({
  ...advert,
});

FiltersForm.propTypes = {
  initialFilters: filtersProp.isRequired,
  defaultFilters: filtersProp.isRequired,
  onFilter: T.func.isRequired,
};

export default FiltersForm;
