import { useState } from 'react'

import Input from './Input'
import Select from './Select'
import formStyle from '../form/Form.module.css'

function FormPet({ handleOnSubmit, petData, btnText }) {
    const [pet, setPet] = useState(petData || {});
    const [preview, setPreview] = useState('');
    const colors = ['Branco', 'Preto', 'Marrom', 'Cinza', 'Caramelo']

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function handleImageChange(e) {
        setPreview([...e.target.files])
        setPet({ ...pet, images: [...e.target.files] })
    }

    function handleColorChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.options[e.target.selectedIndex].text })
    }

    function submit(e) {
        e.preventDefault();
        handleOnSubmit(pet);
    }

    return (

        <form onSubmit={submit}>
            <div className={formStyle.preview_pet_images}>
                {
                    preview.length > 0 ?
                        preview.map((image, index) => (
                            <img src={URL.createObjectURL(image)} alt={ pet.name } key={`${ pet.name }+${index}`}/>
                        )) :
                        pet.images &&
                        pet.images.map((image, index) => (
                            <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={ pet.name } key={`${ pet.name }+${index}`}/>
                        ))
                }
            </div>
            <Input name='name' type='text' text='Nome' placeholder='Digite o nome do pet' handleOnChange={handleChange} value={pet.name || ''} />
            <Input name='age' type='number' text='Idade' placeholder='Digite a idade do pet' handleOnChange={handleChange} value={pet.age || ''} />
            <Input name='weight' type='number' text='Peso' placeholder='Digite o peso do pet' handleOnChange={handleChange} value={pet.weight  || ''} />
            <Select name='color' type='text' options={colors} text='Cor' handleOnChange={handleColorChange} value={pet.color || ''} />
            <Input name='images' type='file' text='Imagens' handleOnChange={handleImageChange} multiple={true} />
            <input type='submit' value={btnText} />
        </form>
    )
}

export default FormPet;