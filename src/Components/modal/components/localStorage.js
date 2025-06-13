import React, { useEffect, useState } from 'react';

const LocalStorage = ({currentDropItem,onClose}) => {

    // Single state object for form data
    const [formData, setFormData] = useState({
        dataStoredOnDevice: '',
        additionalInfo1: '',
        localDataRetentionTime: '',
        additionalInfo2: '',
    });

    // Single change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem(currentDropItem, JSON.stringify(formData));

        const getLocalStorage = localStorage.getItem("pdfData");

        const parsedData = typeof window !== undefined &&  getLocalStorage ? JSON.parse(getLocalStorage) : {};

        const pdfPayload = {
            localStorage: formData
        }
 
        const updatedData = {
               ...parsedData,
               ...pdfPayload
        }
 
         localStorage.setItem("pdfData", JSON.stringify(updatedData));



        onClose();
    };

    useEffect(() => {
        const data = localStorage.getItem(currentDropItem);
        if (data) {
            setFormData(JSON.parse(data));
        }
    }, [currentDropItem]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <p>LocalStorage</p>
                    <div className='border-line'></div>
                    <h5>Additional notes:</h5>
                    <ul className="list-disc">
                        <li>By default, all the fields in this section are shown as “Not disclosed.”</li>
                    </ul>

                    {/* Data stored on device */}
                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='dataStoredOnDevice'>Data stored on the device</label>
                            <select
                                name="dataStoredOnDevice"
                                className='width-339'
                                value={formData.dataStoredOnDevice}
                                onChange={handleChange}
                            >
                                <option value="">Select an option</option>
                                <option value="Identifiable">Identifiable</option>
                                <option value="De-identified">De-identified</option>
                                <option value="Pseudonymized">Pseudonymized</option>
                                <option value="No device storage">No device storage</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Additional Information 1 */}
                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='additionalInfo1'>Additional Information (optional)</label>
                            <textarea
                                name="additionalInfo1"
                                rows={3}
                                cols={39}
                                placeholder='Additional Information'
                                value={formData.additionalInfo1}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Local data retention time */}
                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='localDataRetentionTime'>Local data retention time</label>
                            <select
                                name="localDataRetentionTime"
                                className='width-339'
                                value={formData.localDataRetentionTime}
                                onChange={handleChange}
                            >
                                <option value="">Select an option</option>
                                <option value="Less than five minutes">Less than five minutes</option>
                                <option value="Up to a day">Up to a day</option>
                                <option value="Up to a week">Up to a week</option>
                                <option value="Up to a month">Up to a month</option>
                                <option value="Up to a year">Up to a year</option>
                                <option value="Up to 10 years">Up to 10 years</option>
                                <option value="Forever">Forever</option>
                                <option value="No retention">No retention</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Additional Information 2 */}
                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='additionalInfo2'>Additional Information (optional)</label>
                            <textarea
                                name="additionalInfo2"
                                rows={3}
                                cols={39}
                                placeholder='Additional Information'
                                value={formData.additionalInfo2}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='border-line'></div>
                <div className='submit'>
                    <button type="submit" style={{background:"#f39c12"}} className='submit-btn'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default LocalStorage;
