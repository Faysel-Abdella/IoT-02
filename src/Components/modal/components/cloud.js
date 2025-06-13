import React, { useEffect, useState } from 'react';

const Cloud = ({currentDropItem,onClose}) => {
    const [formValues, setFormValues] = useState({
        dataStoredInCloud: 'Identifiable',
        additionalInfo1: '',
        cloudDataRetentionTime: 'Less than five minutes',
        additionalInfo2: '',
        dataSharedWith: 'Manufacturer',
        additionalInfo3: '',
        dataSharingFrequency: 'When an event happens',
        dataSoldTo: 'Not sold',
        additionalInfo4: ''
    });

    const formChangeHandler = (e) => {
        const { name, type, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem(currentDropItem, JSON.stringify(formValues));
        const getLocalStorage = localStorage.getItem("pdfData");

        const parsedData = typeof window !== undefined &&  getLocalStorage ? JSON.parse(getLocalStorage) : {};

        const pdfPayload = {
            cloudData: formValues
        }
 
        const updatedData = {
               ...parsedData,
               ...pdfPayload
        }
 
         localStorage.setItem("pdfData", JSON.stringify(updatedData));
        onClose();
    }

    useEffect(() => {
        const data = localStorage.getItem(currentDropItem);
        if (data) {
            setFormValues(JSON.parse(data));
        }
    }, [currentDropItem]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-container'>
                    <p>Cloud</p>
                    <div className='border-line'></div>
                    <h5>Additional notes:</h5>
                    <ul className="list-disc">
                        <li>By default, all the fields in this section are shown as “Not disclosed.”</li>
                    </ul>

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='dataStoredInCloud'>Data stored in the cloud</label>
                            <select
                                name="dataStoredInCloud"
                                value={formValues.dataStoredInCloud}
                                onChange={formChangeHandler}
                                className='width-339'
                            >
                                <option value="Identifiable">Identifiable</option>
                                <option value="De-identified">De-identified</option>
                                <option value="Pseudonymized">Pseudonymized</option>
                                <option value="No cloud storage">No cloud storage</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='additionalInfo1'>Additional Information (optional)</label>
                            <textarea
                                rows={3}
                                cols={39}
                                placeholder='Additional Information'
                                name='additionalInfo1'
                                value={formValues.additionalInfo1}
                                onChange={formChangeHandler}
                            />
                        </div>
                    </div>

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='cloudDataRetentionTime'>Cloud data retention time</label>
                            <select
                                name="cloudDataRetentionTime"
                                value={formValues.cloudDataRetentionTime}
                                onChange={formChangeHandler}
                                className='width-339'
                            >
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

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='additionalInfo2'>Additional Information (optional)</label>
                            <textarea
                                rows={3}
                                cols={39}
                                placeholder='Additional Information'
                                name='additionalInfo2'
                                value={formValues.additionalInfo2}
                                onChange={formChangeHandler}
                            />
                        </div>
                    </div>

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='dataSharedWith'>Data shared with</label>
                            <select
                                name="dataSharedWith"
                                value={formValues.dataSharedWith}
                                onChange={formChangeHandler}
                                className='width-339'
                            >
                                <option value="Manufacturer">Manufacturer</option>
                                <option value="Third parties">Third parties</option>
                                <option value="Government and legal authorities">Government and legal authorities</option>
                                <option value="Service providers">Service providers</option>
                                <option value="Emergency services">Emergency services</option>
                                <option value="Public">Public</option>
                                <option value="Not shared">Not shared</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='additionalInfo3'>Additional Information (optional)</label>
                            <textarea
                                rows={3}
                                cols={39}
                                placeholder='Additional Information'
                                name='additionalInfo3'
                                value={formValues.additionalInfo3}
                                onChange={formChangeHandler}
                            />
                        </div>
                    </div>

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='dataSharingFrequency'>Data sharing frequency</label>
                            <select
                                name="dataSharingFrequency"
                                value={formValues.dataSharingFrequency}
                                onChange={formChangeHandler}
                                className='width-339'
                            >
                                <option value="When an event happens">When an event happens</option>
                                <option value="When third parties request it">When third parties request it</option>
                                <option value="When user requests it">When user requests it</option>
                                <option value="Periodic">Periodic</option>
                                <option value="Continuous">Continuous</option>
                                <option value="When required by law">When required by law</option>
                                <option value="Not shared">Not shared</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='dataSoldTo'>Data sold to</label>
                            <select
                                name="dataSoldTo"
                                value={formValues.dataSoldTo}
                                onChange={formChangeHandler}
                                className='width-339'
                            >
                                <option value="Not sold">Not sold</option>
                                <option value="Third parties">Third parties</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className='field-wrapper'>
                        <div className='form-group sensor-wrapper'>
                            <label htmlFor='additionalInfo4'>Additional Information (optional)</label>
                            <textarea
                                rows={3}
                                cols={39}
                                placeholder='Additional Information'
                                name='additionalInfo4'
                                value={formValues.additionalInfo4}
                                onChange={formChangeHandler}
                            />
                        </div>
                    </div>

                </div>
                <div className='border-line'></div>
                <div className='submit'>
                  <button type='submit' style={{background:"#f39c12"}} className='submit-btn'>Submit</button>
                </div>
               
            </form>
        </div>
    );
};

export default Cloud;
