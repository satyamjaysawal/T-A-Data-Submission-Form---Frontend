import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import { PlusIcon,  TrashIcon } from '@heroicons/react/outline';

const Form = () => {
    const navigate = useNavigate(); 
    // const baseurl = 'http://localhost:5000';
    const baseurl = 'https://t-a-data-submission-form-backend.vercel.app';
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        production: '',
        totalOrderQuantity: '',
        fabricSection: [],
        isChinaFabric: '',
        chinaFabric: [],
        majorFabric: '',
        trims: [],
        accessories: [],
    });

    const [fabricSections, setFabricSections] = useState([{
        fabricName: '',
        perPieceRequirement: '',
        unit: '',
        colorQuantities: [{ color: '', quantity: '' }],
        processes: [],
        stagesToBeSkipped: [],
    }]);

    // const [chinaFabricOptions, setChinaFabricOptions] = useState([]);
    const [trims, setTrims] = useState([]);
    const [accessories, setAccessories] = useState([]);

    const fabricOptions = ["Cotton", "Silk", "Linen", "Wool", "Polyester"];
    const chinaFabricList = ["China Lace", "China Cotton", "China Silk"];

    // Set today's date as the default for start and end date
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData(prevData => ({
            ...prevData,
            startDate: today,
            endDate: today,
        }));
    }, []);

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFabricChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFabrics = [...fabricSections];
        updatedFabrics[index][name] = value;
        setFabricSections(updatedFabrics);
    };

    const handleColorQuantityChange = (fabricIndex, colorIndex, e) => {
        const { name, value } = e.target;
        const updatedFabrics = [...fabricSections];
        updatedFabrics[fabricIndex].colorQuantities[colorIndex][name] = value;
        setFabricSections(updatedFabrics);
    };

    const addFabricSection = () => {
        setFabricSections([...fabricSections, {
            fabricName: '',
            perPieceRequirement: '',
            unit: '',
            colorQuantities: [{ color: '', quantity: '' }],
            processes: [],
            stagesToBeSkipped: [],
        }]);
    };

    const removeFabricSection = (index) => {
        const updatedFabrics = fabricSections.filter((_, i) => i !== index);
        setFabricSections(updatedFabrics);
    };

    const addColorQuantity = (fabricIndex) => {
        const updatedFabrics = [...fabricSections];
        updatedFabrics[fabricIndex].colorQuantities.push({ color: '', quantity: '' });
        setFabricSections(updatedFabrics);
    };

    const handleProcessChange = (fabricIndex, e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        const updatedFabrics = [...fabricSections];
        updatedFabrics[fabricIndex].processes = options;
        setFabricSections(updatedFabrics);
    };

    const handleStageSkipChange = (fabricIndex, e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        const updatedFabrics = [...fabricSections];
        updatedFabrics[fabricIndex].stagesToBeSkipped = options;
        setFabricSections(updatedFabrics);
    };

    const handleChinaFabricChange = (e) => {
        const value = e.target.value;
        setFormData(prevData => ({
            ...prevData,
            isChinaFabric: value,
            chinaFabric: value === 'Yes' ? [] : [],
        }));
        if (value === 'No') {
            setFormData(prevData => ({ ...prevData, majorFabric: '' }));
        }
    };

    const handleTrimsChange = (e) => {
        setTrims(Array.from(e.target.selectedOptions, option => option.value));
    };

    const handleAccessoriesChange = (e) => {
        setAccessories(Array.from(e.target.selectedOptions, option => option.value));
    };

    const handleUnitChange = (index, unit) => {
        const updatedFabrics = [...fabricSections];
        updatedFabrics[index].unit = unit;
        setFabricSections(updatedFabrics);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            fabricSection: fabricSections,
            trims,
            accessories,
        };
        try {
            await axios.post(`${baseurl}/submit`, submissionData);
            alert('Form submitted successfully');
            navigate('/submission'); 
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const getAvailableFabricOptions = (selectedFabric) => {
        return fabricOptions.filter(option => option === selectedFabric || !fabricSections.some(f => f.fabricName === option));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">T&A Data Submission Form</h2>

            {/* Form Fields */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleFieldChange} required
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleFieldChange} required
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">Production Per Day Per Machine</label>
                <input type="number" name="production" min="1" value={formData.production} onChange={handleFieldChange} required
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">Total Order Quantity</label>
                <input type="number" name="totalOrderQuantity" min="1" value={formData.totalOrderQuantity} onChange={handleFieldChange} required
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300" />
            </div>

            {/* Fabric Sections */}
            {fabricSections.map((fabric, index) => (
                <div key={index} className="border p-4 mb-4 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg text-blue-600">Fabric Section {index + 1}</h3>
                        <button type="button" onClick={() => removeFabricSection(index)} className="text-red-500 flex items-center">
                            <TrashIcon className="w-5 h-5 mr-1" />
                            Remove Fabric
                        </button>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-semibold">Fabric Name</label>
                        <select name="fabricName" value={fabric.fabricName} onChange={(e) => handleFabricChange(index, e)} required
                            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            <option value="">Select Fabric</option>
                            {getAvailableFabricOptions(fabric.fabricName).map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-semibold">Per Piece Requirement</label>
                        <input type="number" name="perPieceRequirement" min="0.1" step="0.1" value={fabric.perPieceRequirement} onChange={(e) => handleFabricChange(index, e)} required
                            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300" />
                    </div>

                    <label className="block mb-2 text-gray-700 font-semibold">Choose Unit</label>
                    <div className="flex items-center gap-4 mb-4">
                        <button type="button" onClick={() => handleUnitChange(index, 'M')}
                            className={`p-2 border rounded ${fabric.unit === 'M' ? 'bg-blue-200' : ''}`}>M</button>
                        <button type="button" onClick={() => handleUnitChange(index, 'Kg')}
                            className={`p-2 border rounded ${fabric.unit === 'Kg' ? 'bg-blue-200' : ''}`}>Kg</button>
                    </div>

                    {/* Color Quantities */}
                    {fabric.colorQuantities.map((colorQuantity, colorIndex) => (
                        <div key={colorIndex} className="flex items-center mb-4">
                            <input type="text" name="color" placeholder="Color" value={colorQuantity.color} onChange={(e) => handleColorQuantityChange(index, colorIndex, e)} required
                                className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300" />
                            <input type="number" name="quantity" placeholder="Quantity" min="1" value={colorQuantity.quantity} onChange={(e) => handleColorQuantityChange(index, colorIndex, e)} required
                                className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ml-4" />
                            <button type="button" onClick={() => addColorQuantity(index)} className="ml-2 text-green-500 flex items-center">
                                <PlusIcon className="w-5 h-5" />
                                Add Color
                            </button>
                        </div>
                    ))}

                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-semibold">Processes</label>
                        <select multiple value={fabric.processes} onChange={(e) => handleProcessChange(index, e)}
                            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            <option value="Dyeing">Dyeing</option>
                            <option value="Cutting">Cutting</option>
                            <option value="Sewing">Sewing</option>
                            <option value="Finishing">Finishing</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 font-semibold">Stages to be skipped</label>
                        <select multiple value={fabric.stagesToBeSkipped} onChange={(e) => handleStageSkipChange(index, e)}
                            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
                            <option value="Washing">Washing</option>
                            <option value="Bleaching">Bleaching</option>
                            <option value="Finishing">Finishing</option>
                            <option value="Packing">Packing</option>
                        </select>
                    </div>
                </div>
            ))}

            <button type="button" onClick={addFabricSection} className="mb-4 text-blue-500 flex items-center">
                <PlusIcon className="w-5 h-5 mr-1" />
                Add Fabric Section
            </button>

            {/* China Fabric Selection */}
    
            <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">Is China Fabric?</label>
                <select name="isChinaFabric" value={formData.isChinaFabric} onChange={handleChinaFabricChange} required
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            {formData.isChinaFabric === 'Yes' && (
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700 font-semibold">Select China Fabrics</label>
                    <select multiple value={formData.chinaFabric} onChange={(e) => {
                        const options = Array.from(e.target.selectedOptions, option => option.value);
                        setFormData(prevData => ({ ...prevData, chinaFabric: options }));
                    }} className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
                        {chinaFabricList.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Major Fabric Selection */}
            {formData.isChinaFabric === 'No' && (
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700 font-semibold">Choose Major Fabric</label>
                    <select name="majorFabric" value={formData.majorFabric} onChange={handleFieldChange} required
                        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
                        <option value="">Select Major Fabric</option>
                        {fabricOptions.map((fabric, index) => (
                            <option key={index} value={fabric}>{fabric}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Trims and Accessories */}
            <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">Select Trims</label>
                <select multiple value={trims} onChange={handleTrimsChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
                    <option value="Zipper">Zipper</option>
                    <option value="Button">Button</option>
                    <option value="Elastic">Elastic</option>
                    <option value="Lace">Lace</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-semibold">Select Accessories</label>
                <select multiple value={accessories} onChange={handleAccessoriesChange}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:border-blue-300">
                    <option value="Label">Label</option>
                    <option value="Tag">Tag</option>
                    <option value="Hang Tag">Hang Tag</option>
                    <option value="Care Label">Care Label</option>
                </select>
            </div>

            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Submit</button>
        </form>
    );
};

export default Form;
