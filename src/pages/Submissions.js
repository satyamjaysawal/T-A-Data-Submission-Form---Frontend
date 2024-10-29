import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseurl = 'https://t-a-data-submission-form-backend.vercel.app';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseurl}/submissions`); 
                setSubmissions(response.data);
            } catch (err) {
                console.error("Error fetching submissions", err);
                setError("Failed to load submissions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p className="p-4 text-center">Loading submissions...</p>;
    if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Submitted Data</h1>
            {submissions.length > 0 ? (
                submissions.map((submission, index) => (
                    <div key={index} className="border p-6 rounded-lg mb-6 shadow-lg bg-white">
                        <h2 className="text-xl font-bold text-blue-700 mb-4">Submission #{index + 1}</h2>

                        <p><strong>Start Date:</strong> {submission.startDate}</p>
                        <p><strong>End Date:</strong> {submission.endDate}</p>
                        <p><strong>Production Per Day Per Machine:</strong> {submission.production}</p>
                        <p><strong>Total Order Quantity:</strong> {submission.totalOrderQuantity}</p>

                        {/* Fabric Sections */}
                        <div>
                            <h3 className="font-semibold mt-4 text-lg text-blue-600">Fabric Sections</h3>
                            {submission.fabricSection.map((fabric, fIndex) => (
                                <div key={fIndex} className="ml-4 mt-2 p-3 border rounded-lg bg-gray-50">
                                    <p><strong>Fabric Name:</strong> {fabric.fabricName}</p>
                                    <p><strong>Per Piece Requirement:</strong> {fabric.perPieceRequirement} {fabric.unit}</p>
                                    
                                    {/* Color Quantities */}
                                    <div className="mt-2">
                                        <h4 className="font-semibold">Color Quantities</h4>
                                        {fabric.colorQuantities.map((cq, cqIndex) => (
                                            <p key={cqIndex} className="ml-4">
                                                <span className="text-blue-500">Color:</span> {cq.color}, 
                                                <span className="text-blue-500"> Quantity:</span> {cq.quantity}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Processes and Stages */}
                                    <p><strong>Processes:</strong> {fabric.processes.join(", ")}</p>
                                    <p><strong>Stages to Be Skipped:</strong> {fabric.stagesToBeSkipped.join(", ")}</p>
                                </div>
                            ))}
                        </div>

                        {/* China Fabric and Major Fabric */}
                        <p className="mt-4"><strong>Is China Fabric Present:</strong> {submission.isChinaFabric ? 'Yes' : 'No'}</p>
                        {submission.isChinaFabric && submission.chinaFabric && submission.chinaFabric.length > 0 ? (
                            <div>
                                <p><strong>China Fabrics:</strong> {submission.chinaFabric.join(", ")}</p>
                            </div>
                        ) : (
                            submission.majorFabric && (
                                <p><strong>Major Fabric:</strong> {submission.majorFabric}</p>
                            )
                        )}

                        {/* Trims and Accessories */}
                        {submission.trims.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Trims</h4>
                                <p>{submission.trims.join(", ")}</p>
                            </div>
                        )}
                        {submission.accessories.length > 0 && (
                            <div className="mt-2">
                                <h4 className="font-semibold">Accessories</h4>
                                <p>{submission.accessories.join(", ")}</p>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-600">No submissions available.</p>
            )}
        </div>
    );
};

export default Submissions;
