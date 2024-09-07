
// RecommendDialog.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog } from '@/components/ui/dialog';

interface User {
    id: string;
    name: string;
    age: number;
    weight: number;
    height: number;
    gender: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
}

const RecommendDialog: React.FC<Props> = ({ isOpen, onClose, userId }) => {
    // const [user, setUser] = useState<User | null>(null);
    // const [recommendation, setRecommendation] = useState<string>('');

    // useEffect(() => {
    //     if (userId) {
    //         axios.get(`/user?id=${userId}`)
    //             .then(response => {
    //                 const userData: User = response.data[0]; // assuming the API returns an array
    //                 setUser(userData);
    //                 generateRecommendation(userData);
    //             })
    //             .catch(error => console.error('Failed to fetch user data:', error));
    //     }
    // }, [userId]);

    // const generateRecommendation = (user: User) => {
    //     if (!user) return;

    //     // Example of generating a recommendation based on user data
    //     if (user.age < 30) {
    //         setRecommendation('High-intensity interval training (HIIT) would be ideal for maintaining fitness.');
    //     } else if (user.age >= 30 && user.age < 50) {
    //         setRecommendation('Consider regular jogging or cycling sessions for good heart health.');
    //     } else {
    //         setRecommendation('Low-impact exercises such as swimming or yoga are recommended for joint health.');
    //     }
    // };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black opacity-50" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
                    <Dialog.Title className="text-lg font-medium">Exercise Recommendation</Dialog.Title>
                    <Dialog.Description className="mt-2">
                        {/* {recommendation || 'Loading recommendation...'} */}
                    </Dialog.Description>
                    <div className="mt-4">
                        <button onClick={onClose} className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default RecommendDialog;
