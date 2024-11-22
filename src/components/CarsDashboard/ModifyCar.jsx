import { useEffect, useState } from "react"
import React from 'react'

const ModifyCar = ({ closeMenu, editableData, message }) => {
    const [carmake, setcarmake] = useState('')
    const [carmodel, setcarmodel] = useState('')
    const [caryear, setcaryear] = useState('');
    const [images, setImages] = useState(Array(1).fill(null));
    const [carlocation, setcarlocation] = useState('');
    const [cartype, setcartype] = useState('');
    const [carprice, setcarprice] = useState('');


    useEffect(() => {
        setcarmake(editableData.CARMAKE);
        setcarmodel(editableData.CARMODEL);
        setcaryear(editableData.CARYEAR);
        setcarlocation(editableData.CARLOCATION);
        setcartype(editableData.CARTYPE);
        setcarprice(editableData.CARPRICE)

        return () => {
            setcarmake('');
            setcarmodel('');
            setcaryear('');
            setcarlocation('');
            setcartype('');
            setcarprice('');
        }
    }, [editableData])


    const handleImageChange = (index, event) => {
        const files = Array.from(event.target.files);
        const updatedImages = [...images];
        updatedImages[index] = files[0];
        setImages(updatedImages);
    };

    function handleMenu() {
        closeMenu(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append('carID', editableData.CARID);
        formData.append('carmake', carmake);
        formData.append('carmodel', carmodel);
        formData.append('caryear', caryear);
        formData.append('carlocation', carlocation);
        formData.append('cartype', cartype);
        formData.append('carprice', carprice);

        const oldImages = editableData.CARIMAGE.split(",");

        formData.append('oldImages', JSON.stringify({ oldImages }));

        images.forEach((image, index) => {
            formData.append('images', image);
        });


        try {
            const response = await fetch('http://localhost:3000/api/update-car', {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                message('Car updated successfully!');
                closeMenu(false);
            } else {
                message('Failed to update Car');
                closeMenu(false);

            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <div className="addDestinationMenuContainer">
                <div className="close">
                    <input type="button" value="X" onClick={handleMenu} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="addDestinationInput">
                        <label htmlFor="carmake">Car Make:</label>
                        <input
                            type="text"
                            name="carmake"
                            id="carmake"
                            value={carmake}
                            onChange={(e) => setcarmake(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="carmodel">Car Model:</label>
                        <input
                            type="text"
                            name="carmodel"
                            id="carmodel"
                            value={carmodel}
                            onChange={(e) => setcarmodel(e.target.value)}
                            required
                        />
                    </div>
                    <div className="addDestinationInput">
                        <label htmlFor="caryear">Car Year:</label>
                        <input
                            type='number'
                            name="caryear"
                            id="caryear"
                            value={caryear}
                            onChange={(e) => setcaryear(e.target.value)}
                            required
                        />
                    </div>
                    <div className="divider" />

                    {images.map((image, index) => (
                        <div className="addDestinationInput" key={index}>
                            <label htmlFor={`image${index}`}>Image {index + 1}:</label>
                            <input
                                type="file"
                                name={`image${index}`}
                                onChange={(e) => handleImageChange(index, e)}
                                required
                            />
                        </div>
                    ))}

                    <div className="divider" />

                    <div className="addDestinationInput">
                        <label htmlFor="carlocation">Car City:</label>
                        <input
                            name="carlocation"
                            id="carlocation"
                            value={carlocation}
                            onChange={(e) => setcarlocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addDestinationInput">
                        <label htmlFor="cartype">Car Type:</label>
                        <input
                            name="cartype"
                            id="cartype"
                            value={cartype}
                            onChange={(e) => setcartype(e.target.value)}
                            required
                        />
                    </div>

                    <div className="addDestinationInput">
                        <label htmlFor="carprice">Price Per Day:</label>
                        <input
                            type='number'
                            name="carprice"
                            id="carprice"
                            value={carprice}
                            onChange={(e) => setcarprice(e.target.value)}
                            required
                        />
                    </div>
                    {successMessage && (
                        <div className="success-message">
                            {successMessage}
                        </div>
                    )}
                    <div className="addDestinationInput">
                        <button type="submit">Add Car</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default ModifyCar
