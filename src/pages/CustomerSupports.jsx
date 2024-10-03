import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomerSupports = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [hasWatchedEnough, setHasWatchedEnough] = useState(false);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    const navigate = useNavigate();

    // Helper function to parse the query string
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    const category = query.get('category'); // Get the category from the URL
    const jobId = query.get('jobId'); // Optionally, you can pass jobId as well to redirect
    console.log(jobId)
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/video/${category}`);
                const data = await response.json();
                if (data?.videoUrl) {
                    setVideoUrl(data.videoUrl);
                }
            } catch (error) {
                console.error('Error fetching video:', error);
            } finally {
                setLoading(false);
            }
        };

        if (category) {
            fetchVideo();
        }
    }, [category]);

    const handleProgress = ({ playedSeconds }) => {
        setPlayedSeconds(playedSeconds);

        // If the user has watched 50% of the video, allow them to proceed
        const requiredWatchTime = videoDuration * 0.5; // Change the percentage here as needed
        if (playedSeconds >= requiredWatchTime) {
            setHasWatchedEnough(true);
        }
    };

    const handleDuration = (duration) => {
        setVideoDuration(duration);
    };

    const handleGoBack = () => {
        if (jobId) {
            navigate(`/details/${jobId}`);
        } else {
            navigate('/jobs');
        }
    };

    if (loading) {
        return <p>Loading video...</p>;
    }

    return (
        <div className='container mx-auto lg:px-12 px-5 py-5 '>
            <div className=" mx-auto">
                {videoUrl ? (
                    <div>
                        <ReactPlayer
                            url={videoUrl}
                            controls
                            onProgress={handleProgress} // Track progress
                            onDuration={handleDuration} // Track video duration
                        />
                        <p>Watched: {Math.floor((playedSeconds / videoDuration) * 100)}% of the video</p>

                        {/* Show the button only after the user has watched enough of the video */}
                        {hasWatchedEnough ? (
                            <button
                                className="bg-green-500 text-white font-semibold py-2 px-4 rounded mt-4"
                                onClick={handleGoBack}
                            >
                                Reapply Now
                            </button>
                        ) : (
                            <p>You need to watch at least 50% of the video to proceed.</p>
                        )}
                    </div>
                ) : (
                    <p>No video available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default CustomerSupports;
